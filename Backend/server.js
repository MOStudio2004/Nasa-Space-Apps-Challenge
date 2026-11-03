const express = require("express");

const cors = require("cors");

const app = express();

const pool = require("./config/db");

const port = 3000;

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");


const cookieParser = require("cookie-parser");


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.use(cookieParser());


function authMiddleware(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
}


app.get("/api/health" , (req , res) => {
    res.json({status:"server is running"})
})


app.get("/api/db_test" , async (req,res)=> {
    try{
        const result = await pool.query("SELECT NOW()");
        res.json({status:"database connected" , time : result.rows[0].now});
    }catch(error){
        console.error(error);
        res.status(500).json({status:"database failed to connect"});
    }
})


app.post("/api/auth/register", async (req, res) => {
  const { username, password } = req.body ?? {};

  if (
    typeof username !== "string" ||
    typeof password !== "string"
  ) {
    return res.status(400).json({
      message: "Invalid input"
    });
  }

  const cleanUsername = username.trim().toLowerCase();

  if (
    !/^[a-z0-9_]{3,30}$/.test(cleanUsername) ||
    password.length < 8 ||
    Buffer.byteLength(password, "utf8") > 72
  ) {
    return res.status(400).json({
      message: "Invalid username or password format"
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await pool.query(
      `INSERT INTO users (username, password_hash)
       VALUES ($1, $2)
       RETURNING id, username, is_admin, created_at`,
      [cleanUsername, hashedPassword]
    );

    return res.status(201).json({
      message: "Account created successfully",
      user: result.rows[0]
    });

  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Username already exists"
      });
    }

    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
});


app.post("/api/auth/login" , async (req,res) => {
    const {username , password} = req.body ?? {};
  if (
    typeof username !== "string" ||
    typeof password !== "string"
  ) {
    return res.status(400).json({
      message: "Invalid input"
    });
  }
    const cleanUsername = username.trim().toLowerCase();

    try{
        const result = await pool.query(
      "SELECT id, username, password_hash FROM users WHERE username = $1",
      [cleanUsername]
    );

    const user = result.rows[0];

    if(!user){
        return res.status(401).json({message:"Account not found."})
    }

    const isMatch = await bcrypt.compare(password,user.password_hash)

if (!isMatch) {
  return res.status(401).json({
    message: "Invalid credentials"
  });
}

const token = jwt.sign({ userId: user.id } , process.env.JWT_SECRET , { algorithm: 'HS256', expiresIn: '1h' })

res.cookie("token" , token , {httpOnly:true , sameSite:"lax" , maxAge:3600000})

return res.status(200).json({message:"Login Successfuly" , username : user.username})

    }catch(error){

    }
})

app.get("/api/auth/me", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "You are authenticated",
    userId: req.user.userId
  });
});

app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  });

  return res.status(200).json({
    message: "Logged out successfully"
  });
});
app.use((req , res) => {
    res.status(404).json({message:"Route not found"})
})

app.use((err,req,res,next) => {
    console.error(err.message);
    res.status(500).json({message:"Internal Server Error"});
})

app.listen(port , ()=> {
    console.log(`app listening on port ${port}`)
})