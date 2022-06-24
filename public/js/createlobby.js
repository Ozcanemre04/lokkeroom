
import Cookies from "js-cookie";
export default function addNewLobby(){
    
    let newLobby= document.querySelector('#new-lobby')
     fetch('https://lokkeroom.herokuapp.com/api/admin/newadmin/lobby',{
             method:"POST",
             body:JSON.stringify({
                 "name":newLobby.value
                 
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