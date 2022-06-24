let email= document.querySelector('#email')
let name= document.querySelector('#name')
let password= document.querySelector('#password')

export default function register(){
    
     fetch('https://lokkeroom.herokuapp.com/api/register',{
             method:"POST",
             body:JSON.stringify({
                 "name":name.value,
                 "email":email.value,
                 "password":password.value
                 
                }),
                headers:{
                    "Content-type":"application/json; charset=UTF-8",
                    
     
                    
                }
            
                
                
            })
            .then(res=>res.json())
            .then(data=>{
                
                console.log(data);
               window.location.reload()
            })
        
    }