import Cookies from "js-cookie";

export default function addMessage(e){
    if(e.target&&e.target.className=="send"){
        
         let inputMessage=e.target.parentElement.children[0]
         console.log(inputMessage);
         let id=inputMessage.parentElement.parentElement.id;
         console.log(id);
         
         fetch('https://lokkeroom.herokuapp.com/api/lobby/'+id,{
             method:"POST",
             body:JSON.stringify({
                 "message":inputMessage.value
                 
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
    }