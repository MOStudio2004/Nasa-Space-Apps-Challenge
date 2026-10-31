import { Component, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import "./chat.css";

const STATES = {
  idle: { label: "Standing by", speed: 0.12, energy: 0.16, hint: "Ready when you are." },
  listening: { label: "Listening", speed: 0.27, energy: 0.48, hint: "Listening channel active." },
  processing: { label: "Processing", speed: 0.65, energy: 0.85, hint: "Connecting the dots." },
  speaking: { label: "Speaking", speed: 0.23, energy: 0.5, hint: "Response in progress." },
};
const WELCOME = [{ id: "welcome", role: "assistant", content: "Welcome aboard. I’m A.R.V.I.N., your mission companion. What would you like to explore?" }];
const VERTEX = `
attribute float aSeed;
uniform float uTime;
uniform float uEnergy;
uniform float uAudio;
uniform float uPixelRatio;
varying float vLight;
void main() {
  vec3 p = position;
  float wave = sin(p.y * 4.0 + uTime * 1.8 + aSeed * 6.28);
  p += normalize(p) * wave * (0.025 + uEnergy * 0.08 + uAudio * 0.12);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = clamp((2.0 + aSeed * 3.0 + uAudio * 2.0) * uPixelRatio * 3.8 / -mv.z, 1.0, 12.0);
  vLight = 0.35 + aSeed * 0.65;
}`;
const FRAGMENT = `
varying float vLight;
void main() {
  float d = length(gl_PointCoord - vec2(0.5));
  float alpha = smoothstep(0.5, 0.0, d);
  gl_FragColor = vec4(mix(vec3(0.08, 0.42, 0.85), vec3(0.55, 1.0, 1.0), vLight), alpha * vLight);
}`;

// Deterministic twisted filaments, rather than a spherical particle shell.
function buildCore() {
  const count = 3600;
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  const links = [];
  for (let i = 0; i < count; i++) {
    const strand = i % 9;
    const t = Math.floor(i / 9) / 399;
    const angle = t * Math.PI * 6 + strand * Math.PI * 2 / 9;
    const radius = 0.45 + Math.sin(t * Math.PI) * 0.65 + 0.13 * Math.sin(t * 37 + strand);
    const x = Math.cos(angle) * radius;
    const y = (t - 0.5) * 2.8;
    const z = Math.sin(angle) * radius;
    positions.set([x, y, z], i * 3);
    seeds[i] = ((i * 127) % 997) / 997;
    if (i >= 9 && i % 3 === 0) links.push(...positions.slice((i - 9) * 3, (i - 9) * 3 + 3), x, y, z);
    if (i >= 1 && i % 12 === 0) links.push(...positions.slice((i - 1) * 3, (i - 1) * 3 + 3), x, y, z);
  }
  return { positions, seeds, links: new Float32Array(links) };
}

function CoreScene({ status, audioLevel, reducedMotion, onContextLost }) {
  const group = useRef();
  const shader = useRef();
  const time = useRef(0);
  const data = useMemo(() => buildCore(), []);
  const gl = useThree((state) => state.gl);
  useEffect(() => {
    const canvas = gl.domElement;
    const lost = () => onContextLost(true);
    canvas.addEventListener("webglcontextlost", lost);
    return () => canvas.removeEventListener("webglcontextlost", lost);
  }, [gl, onContextLost]);
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uEnergy: { value: 0.16 }, uAudio: { value: 0 }, uPixelRatio: { value: 1 } }), []);
  useFrame((state, delta) => {
    const settings = STATES[status];
    const dt = Math.min(delta, 0.05);
    if (!reducedMotion) time.current += dt;
    const amplitude = reducedMotion ? 0 : audioLevel;
    const material = shader.current;
    material.uniforms.uTime.value = time.current;
    material.uniforms.uEnergy.value = THREE.MathUtils.damp(material.uniforms.uEnergy.value, reducedMotion ? 0 : settings.energy, 4, dt);
    material.uniforms.uAudio.value = THREE.MathUtils.damp(material.uniforms.uAudio.value, amplitude, 8, dt);
    material.uniforms.uPixelRatio.value = state.gl.getPixelRatio();
    if (!reducedMotion) group.current.rotation.y += dt * settings.speed;
    group.current.rotation.z = reducedMotion ? -0.18 : -0.18 + Math.sin(time.current * 0.3) * 0.08;
    const pulse = reducedMotion ? 1 : 1 + Math.sin(time.current * (status === "speaking" ? 4 : 1.2)) * settings.energy * 0.035 + amplitude * 0.08;
    group.current.scale.setScalar(pulse);
  });
  return <group ref={group} rotation={[0.12, 0, -0.18]}>
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[data.seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial ref={shader} uniforms={uniforms} vertexShader={VERTEX} fragmentShader={FRAGMENT} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
    <lineSegments>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[data.links, 3]} /></bufferGeometry>
      <lineBasicMaterial color="#38cfff" transparent opacity={0.12} depthWrite={false} blending={THREE.AdditiveBlending} />
    </lineSegments>
    {[0, 1, 2].map((i) => <mesh key={i} rotation={[Math.PI / 2 + i * 0.37, i * 0.6, i * 0.4]}>
      <torusGeometry args={[1.6 + i * 0.14, 0.004, 4, 160, Math.PI * 1.65]} />
      <meshBasicMaterial color={i === 1 ? "#287fc9" : "#66e9ff"} transparent opacity={0.4} />
    </mesh>)}
    <mesh rotation={[0.5, 0.3, 0.2]}><octahedronGeometry args={[0.38, 0]} /><meshBasicMaterial color="#93f6ff" wireframe transparent opacity={0.7} /></mesh>
  </group>;
}

function CoreFallback() {
  return <div className="arvin-fallback" role="img" aria-label="Static A.R.V.I.N. core; 3D unavailable"><svg viewBox="0 0 240 280" aria-hidden="true"><g fill="none" stroke="currentColor"><path d="M120 22 194 91 181 203 120 258 59 203 46 91Z M120 22 181 203 46 91 194 91 59 203Z M46 91 120 258 194 91 M59 203H181 M120 22V258" /><ellipse cx="120" cy="140" rx="108" ry="47" transform="rotate(-24 120 140)" /></g></svg><small>Static visualization · 3D unavailable</small></div>;
}
class CoreBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <CoreFallback /> : this.props.children; }
}
function Core({ status, audioLevel }) {
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [visible, setVisible] = useState(() => !document.hidden);
  const [lost, setLost] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReducedMotion(media.matches);
    const visibility = () => setVisible(!document.hidden);
    media.addEventListener("change", change);
    document.addEventListener("visibilitychange", visibility);
    return () => { media.removeEventListener("change", change); document.removeEventListener("visibilitychange", visibility); };
  }, []);
  return <CoreBoundary>{lost ? <CoreFallback /> : <Canvas camera={{ position: [0, 0, 5.8], fov: 44 }} dpr={[1, 1.5]} frameloop={!visible || reducedMotion ? "demand" : "always"} gl={{ antialias: false, alpha: true, powerPreference: "low-power" }} fallback={<CoreFallback />}>
    <CoreScene status={status} audioLevel={audioLevel} reducedMotion={reducedMotion} onContextLost={setLost} />
  </Canvas>}</CoreBoundary>;
}

function MicIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="9" y="3" width="6" height="12" rx="3" /><path d="M6 11v1a6 6 0 0 0 12 0v-1M12 18v3M9 21h6" /></svg>;
}

/** Controlled integration: messages [{id, role, content}], status, audioLevel (0..1).
 * onSendMessage(text) delegates responses/audio entirely to the parent.
 * Omitting all integration props enables the explicitly labelled local UI preview.
 */
export default function BOT({ bPm, tempe, spo2, status, messages, onSendMessage, onStartListening, onStopListening, audioLevel = 0 }) {
  const demo = status === undefined && messages === undefined && !onSendMessage && !onStartListening && !onStopListening;
  const [localStatus, setLocalStatus] = useState("idle");
  const [localMessages, setLocalMessages] = useState(WELCOME);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const timers = useRef([]);
  const mounted = useRef(true);
  const log = useRef();
  const effectiveStatus = STATES[status] ? status : demo ? localStatus : "idle";
  const conversation = messages ?? localMessages;
  const busy = sending || effectiveStatus === "processing";
  const level = Number.isFinite(audioLevel) ? Math.max(0, Math.min(1, audioLevel)) : 0;
  useEffect(() => { mounted.current = true; const pending = timers.current; return () => { mounted.current = false; pending.forEach(clearTimeout); }; }, []);
  useEffect(() => { if (log.current) log.current.scrollTop = log.current.scrollHeight; }, [conversation, effectiveStatus]);
  function schedule(callback, delay) {
    const timer = setTimeout(() => {
      const index = timers.current.indexOf(timer);
      if (index !== -1) timers.current.splice(index, 1);
      if (mounted.current) callback();
    }, delay);
    timers.current.push(timer);
  }
  async function send(text) {
    const value = text.trim();
    if (!value || busy || (!demo && !onSendMessage)) return;
    setError(""); setInput("");
    if (demo) {
      setLocalMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "user", content: value }]);
      setLocalStatus("processing");
      schedule(() => {
        setLocalMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "assistant", content: "This is a local interface preview. Your message reached the demo, but no AI service is connected. Mission readings are displayed below; analysis and voice will be available after integration." }]);
        setLocalStatus("speaking");
        schedule(() => setLocalStatus("idle"), 2400);
      }, 1100);
      return;
    }
    setSending(true);
    try { await onSendMessage(value); }
    catch { if (mounted.current) { setError("Message could not be sent. Please try again."); setInput(value); } }
    finally { if (mounted.current) setSending(false); }
  }
  async function toggleListening() {
    setError("");
    if (demo) { setLocalStatus((prev) => prev === "listening" ? "idle" : "listening"); return; }
    try { await (effectiveStatus === "listening" ? onStopListening?.() : onStartListening?.()); }
    catch { if (mounted.current) setError("Voice control is unavailable. Please try again."); }
  }
  const voiceReady = demo || (onStartListening && onStopListening);
  return <main className="arvin" data-status={effectiveStatus}>
    <header className="arvin-nav"><Link to="/" className="arvin-brand"><span className="arvin-brand-mark">✧</span> Astro<span>Health</span></Link><span className="arvin-nav-context">MISSION INTELLIGENCE</span><Link to="/" className="arvin-back">← Dashboard</Link></header>
    <div className="arvin-workspace">
      <section className="arvin-stage" aria-label="A.R.V.I.N. visualization">
        <div className="arvin-stage-top"><span className="arvin-eyebrow">HUMAN EXPLORATION / AI COMPANION</span><span className="arvin-version">CORE / 01</span></div>
        <div className="arvin-heading"><span className="arvin-eyebrow">A PRESENCE BEYOND THE SIGNAL</span><h1>A.R.V.I.N<span>.</span></h1><p>Your mission. A shared intelligence.</p></div>
        <div className="arvin-visual"><div className="arvin-halo" /><Core status={effectiveStatus} audioLevel={level} /><span className="arvin-axis arvin-axis-left">01 — COGNITIVE FIELD</span><span className="arvin-axis arvin-axis-right">NEURAL CORE — 03</span></div>
        <div className="arvin-core-caption"><span className="arvin-status-dot" /><span role="status">{STATES[effectiveStatus].label}</span><span className="arvin-caption-rule" /><span>{STATES[effectiveStatus].hint}</span></div>
        {demo && <div className="arvin-state-preview" aria-label="Preview assistant animation states">{Object.keys(STATES).map((state) => <button type="button" key={state} aria-pressed={effectiveStatus === state} disabled={busy} onClick={() => setLocalStatus(state)}>{state}</button>)}</div>}
        <div className="arvin-telemetry"><div><span>HEART RATE</span><strong>{bPm ?? "—"}<small> BPM</small></strong></div><div><span>BLOOD OXYGEN</span><strong>{spo2 ?? "—"}<small> %</small></strong></div><div><span>TEMPERATURE</span><strong>{tempe ?? "—"}<small> °C</small></strong></div><p>SIMULATED TELEMETRY<br /><span>Dashboard feed</span></p></div>
      </section>
      <section className="arvin-conversation" aria-label="Conversation with A.R.V.I.N.">
        <header className="arvin-conversation-heading"><div><span className="arvin-eyebrow">YOUR PRIVATE MISSION CHANNEL</span><h2>Let’s talk.</h2></div><span className="arvin-mode">{demo ? "UI PREVIEW" : "INTEGRATION MODE"}</span></header>
        <div className="arvin-log" ref={log} role="log" aria-live="polite" aria-relevant="additions text" aria-label="Messages">{conversation.length === 0 && <p className="arvin-empty">Your conversation starts here.</p>}{conversation.map((message, index) => { const user = message.role === "user" || message.sender === "user"; return <article key={message.id ?? index} className={`arvin-message ${user ? "arvin-message-user" : ""}`}><span className="arvin-message-label">{user ? "YOU" : "A.R.V.I.N."}</span><p dir="auto">{message.content ?? message.text}</p></article>; })}{busy && <div className="arvin-thinking" role="status"><i /><i /><i /><span>Processing your message</span></div>}</div>
        <div className="arvin-composer-area">{conversation.length <= 1 && <div className="arvin-prompts">{["Review my readings", "Prepare a mission briefing"].map((prompt) => <button type="button" key={prompt} disabled={busy || (!demo && !onSendMessage)} onClick={() => send(prompt)}>{prompt} ↗</button>)}</div>}
          {error && <p className="arvin-error" role="alert">{error}</p>}
          <form className="arvin-composer" onSubmit={(event) => { event.preventDefault(); send(input); }}><label className="arvin-sr-only" htmlFor="arvin-message">Message A.R.V.I.N.</label><textarea id="arvin-message" rows="2" maxLength={4000} value={input} onChange={(event) => setInput(event.target.value)} placeholder="What’s on your mind, astronaut?" onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); send(input); } }} /><div className="arvin-composer-controls"><button className="arvin-mic" type="button" aria-label={demo ? "Preview listening animation (no microphone recording)" : effectiveStatus === "listening" ? "Stop listening" : "Start listening"} aria-pressed={effectiveStatus === "listening"} disabled={!voiceReady || busy} onClick={toggleListening}><MicIcon /></button><span>{demo ? "Voice preview · no recording" : voiceReady ? "Voice controls connected" : "Voice not connected"}</span><button className="arvin-send" type="submit" disabled={!input.trim() || busy || (!demo && !onSendMessage)} aria-label="Send message">↑</button></div></form>
          <p className="arvin-disclosure">{demo ? "Local UI demo · No AI response or audio is generated." : "AI and audio are managed by your connected application."}</p>
        </div>
      </section>
    </div><footer className="arvin-footer"><span>A.R.V.I.N. / ASTRONAUT SUPPORT INTERFACE</span><span>DESIGNED FOR THE JOURNEY AHEAD <b>✧</b></span></footer>
  </main>;
}
