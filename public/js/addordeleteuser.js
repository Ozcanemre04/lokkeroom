
import Cookies from "js-cookie";
export default function addNewUser(){
    
    let newuser= document.querySelector('#new-user')
    const rightSide = document.querySelector('.right-side')
    let lobby_id=rightSide.id;

        
         
         fetch('https://lokkeroom.herokuapp.com/api/admin/lobby/'+lobby_id+'/add_user',{
             method:"POST",
             body:JSON.stringify({
                 "user_id":newuser.value
                 
                }),
                headers:{
                    "Content-type":"application/json; charset=UTF-8",
                    Authorization:'Bearer ' +  Cookies.get('AccessToken')
     
                    
                }
            
                
                
            })
            .then(res=>res.json())
            .then(data=>{
                
                console.log(data);
            })
        
    }


    export function deleteUser(e){
      if(e.target&&e.target.className=="dd"){
        
             let user_id=e.target.children[0].id
          
          
             const rightSide = document.querySelector('.right-side')
             let lobby_id=rightSide.id;
             
             fetch('https://lokkeroom.herokuapp.com/api/admin/lobby/'+lobby_id+'/remove_user/'+user_id,{
                 method:"DELETE",
                
                    headers:{
                        "Content-type":"application/json; charset=UTF-8",
                        Authorization:'Bearer ' +  Cookies.get('AccessToken')
         
                        
                    }
                
                    
                    
                })
                .then(res=>res.json())
                .then(data=>{
                    
                    console.log(data);
                })
      }  
    }