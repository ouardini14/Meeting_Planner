const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const RoomRouter = require("./routes/Roomrouter")
const Meetingrouter = require("./routes/Meetingrouter")
const Reservationrouter = require("./routes/Reservationrouter")

const app = express();

require("dotenv").config();
app.use(express.json())
app.use(cors());

mongoose.connect(process.env.MONGO_URL)
    .then(result => {
        app.listen(process.env.PORT, () => {
            console.log("Server is running ! ");
        })
        
    })
    .catch(err => console.log(err))



app.use("/Rooms", RoomRouter)
app.use("/Meetings", Meetingrouter)
app.use("/Reservations", Reservationrouter)


module.exports=app

