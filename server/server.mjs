import express from "express";
import cookieParser from "cookie-parser";
import  usersRouter  from "./routes/users-routes.mjs";
import authRouter from './routes/auth-routes.mjs';
import lobbyRouter from './routes/lobby-routes.mjs';
import adminRouter from './routes/admin-routes.mjs'
import cors from "cors";
import { Server, Socket } from "socket.io";
import {createServer} from "http";
import { log } from "console";


const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}
const server = createServer(app)
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());             

app.get('/',(req,res)=>res.send({info:`hello`}));

const io = new Server(server,{cors:corsOptions});

io.on('connection',socket =>{
    console.log(socket.id);
    
     socket.on('join-room',lobbyId=>{
           socket.join(lobbyId);
           
       })
     socket.on("send-message",msg=>{
        io
        .to(msg.lobby_id).emit("receive-message",msg)
     })
     socket.on("delete-message",deletedMsg=>{
        io
        .to(deletedMsg.lobby_id).emit("deleted-message",deletedMsg)
     })
     socket.on("update-message",updatedMsg=>{
        io
        .to(updatedMsg.lobby_id).emit("updated-message",updatedMsg)
     })
    
})

app.use('/api',usersRouter)
app.use('/api',authRouter)
app.use('/api/lobby',lobbyRouter)
app.use('/api/admin',adminRouter)

server.listen(PORT,()=>console.log(`server started:http://localhost:${PORT}/`))