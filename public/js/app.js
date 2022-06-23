const loginButton=document.querySelector('.login_button')
const registerOverlay=document.querySelector('.register-overlay')

const loginOverlay=document.querySelector('.login-overlay')
const registerOverlayButton=document.querySelector('.overlay-register-button')
const loginOverlayButton=document.querySelector('.overlay-login-button')


import Cookies from "js-cookie";
import login from './login'
import lobby from './lobby'

import lobbyList from './lobbyList'
import displayMessages from "./messages"
import deletemessage from "./deletemessage"
import addMessage from "./addMessage"


lobby()
lobbyList()

//delete message
document.addEventListener('dblclick',deletemessage);
    



//send message
document.addEventListener('click',addMessage)
    

//open message lobby
document.addEventListener('click',(e)=>{

    if(e.target&&e.target.className=="p2"){
        
      const rightSide = document.querySelector('.right-side')
            rightSide.innerHTML=""
            rightSide.setAttribute("id",e.target.id)
            let id = e.target.id
            
            fetch('https://lokkeroom.herokuapp.com/api/lobby/'+id+'?page=1&limit=1000',{
               method:"GET",
               
               headers:{
                 Authorization:'Bearer ' + Cookies.get('AccessToken')
               }
               
               
              
            })
            .then(res=>res.json())
            .then(data=>{
               displayMessages(data)
                
                
           })
        
        
        
}
})
//login
if(loginButton){
    loginButton.addEventListener('click',(e)=>{
        e.preventDefault();
        login();
         
         })

}

//logout
document.addEventListener('click',(e)=>{
    if(e.target&&e.target.id=='logout'){
       console.log("hello");
       Cookies.remove('AccessToken')
       Cookies.remove('refreshToken')
       window.location ="/index.html"
       
    }
  })
   //register overlay
if(registerOverlay){
    registerOverlayButton.addEventListener('click',()=>{
     registerOverlay.style.display="flex"
     loginOverlay.style.display='none'
    })

}
//login overlay
if(loginOverlay){
    loginOverlayButton.addEventListener('click',()=>{
     registerOverlay.style.display="none"
     loginOverlay.style.display='flex'
    })

}



  
