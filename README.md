# Astro Health Monitor

**A space-inspired health monitoring dashboard built for the NASA Space Apps Challenge 2026.**

Astro Health Monitor is a full-stack web application that explores how astronauts could monitor their health during space missions.

The idea was to build more than a dashboard displaying numbers. I wanted to create an environment where crew members could log in, track their vital signs, and interact with an AI assistant, all from one interface.

The application combines a React frontend, an Express backend, PostgreSQL for crew accounts, and Google's Gemini API for AI-powered conversations.

## 🛰️ What It Does

**Crew Authentication**

Crew members can create an account using a unique Crew ID and password. Authentication is handled through the backend using bcrypt for password hashing and JWT tokens stored in HTTP-only cookies.

**Health Monitoring Dashboard**

The dashboard displays three essential health indicators:

- Heart Rate (BPM)
- Body Temperature (°C)
- Blood Oxygen Saturation (SpO₂)

These values are simulated and update automatically to demonstrate how a live monitoring interface could work.

**AI Health Assistant**

The application includes a chatbot powered by Google's Gemini API Named (A.R.V.I.N), allowing crew members to interact with an AI assistant directly from the dashboard.

**Responsive Interface**

The interface is designed to work on desktop and mobile screens, making the dashboard accessible across different devices.

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, React Router, CSS |
| Backend | Node.js, Express.js |
| Database | PostgreSQL, Neon |
| Authentication | JWT, bcrypt, HTTP-only cookies |
| AI Integration | Google Gemini API |
| Deployment | Vercel |

## ⚙️ How It Works

The React frontend communicates with the Express backend through REST API endpoints.

The backend handles account registration, login, authentication, database operations, and requests to the Gemini API.

PostgreSQL stores crew account information, while JWT authentication protects routes that require an authenticated user.

Health readings are currently generated on the frontend using simulated data rather than physical medical sensors.

## 🌍 Why I Built This

I built Astro Health Monitor as part of the NASA Space Apps Challenge 2026.

The project gave me an opportunity to bring together the technologies I've been learning and apply them to a space-related challenge.

My focus was on building a functional full-stack application, connecting multiple services, handling authentication, and designing an interface around a specific use case.

## NASA Research Reference

This project references NASA's Human Research Program (HRP), which studies astronaut health and performance during space missions.

I used this research as a reference for the health monitoring concept behind Astro Health Monitor.

The application currently uses simulated vital signs and does not use real NASA medical datasets.

Source: https://www.nasa.gov/hrp/

## 🔭 Future Improvements

There are several features I'd like to explore further:

- Integrating real sensor data instead of simulated readings.
- Adding historical health data and visualizations.
- Introducing alerts for abnormal vital signs.
- Expanding the AI assistant with more mission-specific capabilities.

## ⚠️ Disclaimer

Astro Health Monitor is an educational prototype. All vital signs are simulated, and the AI assistant is not intended to provide medical diagnoses or replace professional medical advice.

---

Built for the **NASA Space Apps Challenge 2026**.