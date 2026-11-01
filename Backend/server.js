const express = require("express");

const cors = require("cors");

const app = express();

const pool = require("./config/db");

const port = 3000;

app.use(cors({origin:"http://localhost:5173"}));

app.use(express.json());

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
app.use((req , res , next) => {
    res.status(404).json({message:"Route not found"})
})

app.use((err,req,res,next) => {
    console.error(err.message);
    res.status(500).json({message:"Internal Server Error"});
})

app.listen(port , ()=> {
    console.log(`app listening on port ${port}`)
})