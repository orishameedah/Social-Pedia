import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path"
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js"

// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

// FILE STORAGE
// const storage = multer.diskStorage({
//     destination: function (req, file, cb){
//         cb(null, "public/assets");
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     }
// })

const storage = multer.diskStorage({
})
//middleware
const imageUpload = multer({
    storage: storage
})

// const videoUpload = multer({
//     storage: storage,
//     limits: {
//     fileSize: 10000000 // 10000000 Bytes = 10 MB
//     },
//     fileFilter(req, file, cb) {
//       // upload only mp4 and mkv format
//       if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) { 
//          return cb(new Error('Please upload a video'))
//       }
//       cb(undefined, true)
//    }
// })

// ROUTES WITH FILES
app.post("/auth/register", imageUpload.single("picture"), register);

// MONGODB SETUP
const PORT = process.env.PORT || 3500;

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
})

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", ()=> console.log("Connected to mongodb"));

app.listen(PORT, ()=>{
    console.log(`server running at http://localhost:${PORT}`)
})