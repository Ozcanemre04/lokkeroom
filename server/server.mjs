import express from "express";
import cookieParser from "cookie-parser";
import  usersRouter  from "./routes/users-routes.mjs";
import authRouter from './routes/auth-routes.mjs';
import lobbyRouter from './routes/lobby-routes.mjs';
import adminRouter from './routes/admin-routes.mjs'
import cors from "cors";
import { Server, Socket } from "socket.io";
import {createServer} from "http";




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
let users= [];
io.on('connection',socket =>{
     console.log(socket.id);
     
     socket.on('join-room',lobbyId=>{
           socket.rooms.forEach(room => {
             if(room!== socket.id){
               socket.leave(room)
             }
           });
           socket.join(lobbyId);
       })
     socket.on("send-message",msg=>{
        io
        .in(msg.lobby_id).emit("receive-message",msg)
     })
     socket.on("delete-message",deletedMsg=>{
        io
        .in(deletedMsg.lobby_id).emit("deleted-message",deletedMsg)
     })
     socket.on("update-message",updatedMsg=>{
        io
        .in(updatedMsg.lobby_id).emit("updated-message",updatedMsg)
     })

     socket.on("create-lobby",lobby=>{  
      io
      .to(socket.id).emit("receive-lobby",lobby)
     })
     socket.on("delete-lobby",lobby=>{
      io
      .emit("lobby-deleted",lobby)
     })
     socket.on("connected-user",user=>{
      let findUser=users.find(u=>u.userId===user);
      if(!findUser){
         users.push({userId:user,socket:socket.id});
      }
      else{
         findUser.socket=socket.id
      }
      console.log(users);
      
       io.emit("all-connected-user",users)
     })
     socket.on("add-user",user=>{
      io.to(socket.id).emit("user-added",{id:user.user_id,name:user.name,lobby_id:user.lobby_id});
      let findUser=users.find(u=>u.userId===user.user_id);
      if(findUser){
         io.to(findUser.socket).emit("not-admin-lobby",{name:user.lobbyName,lobby_id:user.lobby_id,user_id:user.user_id})
      }
     })
     socket.on("delete-user",user=>{
      io.to(socket.id).emit("user-deleted",user.user_id);
      let findUser=users.find(u=>u.userId===user.user_id);
      if(findUser){
         io.to(findUser.socket).emit("not-admin-lobby-deleted",user.lobby_id)
      }
     })
     socket.on("disc",user=>{
      console.log(user);
       users=users.filter(u=>u.userId!==user);
       console.log(users);
       io.emit("disconneted-user",users)
       

     })

    
    
})

app.use('/api',usersRouter)
app.use('/api',authRouter)
app.use('/api/lobby',lobbyRouter)
app.use('/api/admin',adminRouter)

server.listen(PORT,()=>console.log(`server started:http://localhost:${PORT}/`))