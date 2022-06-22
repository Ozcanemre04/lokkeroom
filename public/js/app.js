const loginButton=document.querySelector('.login_button')
const registerOverlay=document.querySelector('.register-overlay')
const loginOverlay=document.querySelector('.login-overlay')
const registerOverlayButton=document.querySelector('.overlay-register-button')
const loginOverlayButton=document.querySelector('.overlay-login-button')
const messageButton = document.querySelector('.message')


import login from './login'
import lobby from './lobby'
import messages from './message'
lobby()
messages()

if(loginButton){
    loginButton.addEventListener('click',(e)=>{
        e.preventDefault();
        login();
         
         })

}
   
if(registerOverlay){
    registerOverlayButton.addEventListener('click',()=>{
     registerOverlay.style.display="flex"
     loginOverlay.style.display='none'
    })

}
if(loginOverlay){
    loginOverlayButton.addEventListener('click',()=>{
     registerOverlay.style.display="none"
     loginOverlay.style.display='flex'
    })

}



  
