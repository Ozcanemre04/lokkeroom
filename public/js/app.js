const loginButton=document.querySelector('.login_button')
const registerOverlay=document.querySelector('.register-overlay')
const loginOverlay=document.querySelector('.login-overlay')
const registerOverlayButton=document.querySelector('.overlay-register-button')
const loginOverlayButton=document.querySelector('.overlay-login-button')
const messageButton = document.querySelector('.message')


import login from './login'
import lobby from './lobby'
if(messageButton){
    messageButton.addEventListener('click',()=>{
        lobby()

    })
}
if(loginButton){
    loginButton.addEventListener('click',(e)=>{
        e.preventDefault();
        login();
         
         })

}
   

   registerOverlayButton.addEventListener('click',()=>{
    registerOverlay.style.display="flex"
    loginOverlay.style.display='none'
   })
   loginOverlayButton.addEventListener('click',()=>{
    registerOverlay.style.display="none"
    loginOverlay.style.display='flex'
   })


  
