import express  from "express";
import  pool  from "../db/database.mjs";
import {authenticateToken} from "../Middleware/authenticateToken.mjs";
const router=express.Router();

//get all users in same lobby
router.get('/users/:lobby_id',authenticateToken,async(req,res)=>{
    try{
        const {lobby_id}=req.params;
        const admin = req.user.id
        const lobby= await pool.query('SELECT admin_id FROM lobby WHERE admin_id=$1 AND id=$2',[admin,lobby_id])
        if(lobby.rowCount===0){
           res.json([{err:"you are not admin"}])   
}
        else{
            
              const users = await pool.query(`SELECT DISTINCT users.id,users.name,participants.lobby_id FROM users,participants WHERE  users.id=participants.user_id AND lobby_id = $1  ORDER BY name ASC`,[lobby_id])
             return res.json(users.rows)
        }
    }catch(err){
        console.error(err.message)

    }
    
   });



   //create lobby
   router.post('/newadmin/lobby',authenticateToken,async(req,res)=>{
    try{ 
        
        const {name} = req.body
        if(!name)
        return res.status(400).send({ error: 'Invalid request' })
        const admin_id = req.user.id
        console.log(admin_id);
        const lobbyname= await pool.query('SELECT name FROM lobby WHERE name=$1',[name])
        if(lobbyname.rowCount===1){
            res.json('group name taken')
        }
        else{
            const createLobby=await pool.query('INSERT INTO lobby(name,admin_id) VALUES ($1,$2) RETURNING *',[name,admin_id])
            res.json(createLobby.rows[0])

        }
    }
    catch(err){
        res.json(err.message)
    }
   })

//add user
   router.post('/lobby/:lobby_id/add_user',authenticateToken,async(req,res)=>{
    try{ 
        const admin = req.user.id
        const{user_name}=req.body
        const{lobby_id}=req.params
        if(!user_name){
            return res.status(400).send({ error: 'Invalid request' });
        }
        const lobby= await pool.query('SELECT admin_id FROM lobby WHERE admin_id=$1 AND id=$2',[admin,lobby_id])
        if(lobby.rowCount===0){
            res.json("you are not admin")
        }
        const finduser = await pool.query('SELECT id,name FROM users WHERE name=$1',[user_name])
        if(finduser.rowCount===0){
            res.status(404).send("user is not found");
        }
     
        else{
            var userid = finduser.rows[0].id;
            const userexist= await pool.query('SELECT user_id FROM participants WHERE user_id=$1 AND lobby_id=$2',[userid,lobby_id])
            if(userexist.rowCount===0 && admin!==userid){
                const add_user= await pool.query('INSERT INTO participants(lobby_id,user_id) VALUES ($1,$2) RETURNING *',[lobby_id,userid])
                
                const user= await pool.query('SELECT participants.id,users.name,participants.lobby_id,participants.user_id FROM users,participants WHERE users.id= participants.user_id AND participants.user_id=$1 AND participants.lobby_id=$2',[add_user.rows[0].user_id,lobby_id])
                console.log(user.rows[0]);
                res.json(user.rows[0])

            }
            else{
                res.json('already added')
            }
            
        }
    }
    catch(err){
      res.json(err.message)
    }
});


// delete user 
router.delete('/lobby/:lobby_id/remove_user/:user_id',authenticateToken,async(req,res)=>{
    try{
       const{lobby_id,user_id}=req.params
        const admin = req.user.id
        const lobby= await pool.query('SELECT admin_id FROM lobby WHERE admin_id=$1 AND id=$2',[admin,lobby_id])
        const userexist= await pool.query('SELECT user_id FROM participants WHERE user_id=$1 AND lobby_id=$2',[user_id,lobby_id])
        
        if(lobby.rowCount===0){
            res.json('you are not admin')
        }
        else{
            if(userexist.rowCount===0){
                res.json(`user doens't exist in this lobby`)
            }
            else{
                const delete_user=await pool.query('DELETE FROM participants WHERE user_id=$1 AND lobby_id=$2 RETURNING *',[user_id,lobby_id])
                res.json(delete_user.rows[0])
                 }
            
        }
    }catch(err){
        res.json(err.message)
    }
    })
//delete lobby
router.delete('/removelobby/:lobby_id',authenticateToken,async(req,res)=>{
    try{
       const{lobby_id}=req.params
        const admin = req.user.id
        const lobby= await pool.query('SELECT admin_id FROM lobby WHERE admin_id=$1 AND id=$2',[admin,lobby_id])
     
        if(lobby.rowCount===0){
            res.json('you are not admin')
        }
        else{
                const delete_user=await pool.query('DELETE FROM lobby WHERE admin_id=$1 AND id=$2 RETURNING *',[admin,lobby_id])
                res.json(delete_user.rows[0]) 
        }
    }catch(err){
        res.json(err.message)
    }
    })

// patch messages
    router.patch('/message/:message_id/:lobby_id',authenticateToken,async(req,res)=>{
        try{
           const author_id =req.user.id;
           const {message} =req.body;
           const {message_id,lobby_id}=req.params;
           if(!message)return res.status(400).send({ error: 'Invalid request' })
           const admin= await pool.query('SELECT admin_id FROM lobby WHERE admin_id=$1 AND id=$2',[author_id,lobby_id])
           if(admin.rowCount===0){
            res.json('you are not admin or maybe an admin in another group')
           }
           else{
               const message_exist = await pool.query('SELECT id FROM messages WHERE id=$1 AND lobby_id=$2',[message_id,lobby_id])
               if(message_exist.rowCount===0){
                 res.json("this message doesn't exist")
               }
               else{
                   const patchmessage = await pool.query('UPDATE messages SET message=$1 WHERE id=$2 AND lobby_id=$3 RETURNING *',[message,message_id,lobby_id])
                   res.json(patchmessage.rows[0])
         
               }

           }
        }
        catch(err){
            console.error(err.message)
        }
    })
//delete messages
    router.delete('/message/:message_id/:lobby_id',authenticateToken,async(req,res)=>{
        try{
            const author_id =req.user.id;
            
            const {message_id,lobby_id}=req.params;
            const admin= await pool.query('SELECT admin_id FROM lobby WHERE admin_id=$1 AND id=$2',[author_id,lobby_id])
            if(admin.rowCount===0){
             res.json('you are not admin or maybe an admin in another group')
            }
            else{
                const message_exist = await pool.query('SELECT id FROM messages WHERE id=$1 AND lobby_id=$2',[message_id,lobby_id])
                if(message_exist.rowCount===0){
                  res.json("this message doesn't exist")
                }
                else{
                    const delete_message = await pool.query('DELETE FROM  messages  WHERE id=$1 AND lobby_id=$2',[message_id,lobby_id])
                    res.json("message deleted")
          
                }
 
            }
         }
         catch(err){
             console.error(err.message)
         }

    })




    router.get('/',authenticateToken,async(req,res)=>{
        try{
            const author_id =req.user.id
            const lobby = await pool.query('SELECT * FROM lobby WHERE admin_id=$1',[author_id])
           res.json(lobby.rows)
        }
       catch(err){
        res.json(err.message)
       }
    })








   export default router