const loginButton=document.querySelector('.login_button')
const registerOverlay=document.querySelector('.register-overlay')

const loginOverlay=document.querySelector('.login-overlay')
const registerOverlayButton=document.querySelector('.overlay-register-button')
const loginOverlayButton=document.querySelector('.overlay-login-button')
const rightSide = document.querySelector('.right-side')

import Cookies from "js-cookie";
import login from './login'
import user from './user'
import lobbyList,{displaylobby,displayAdminlobby} from './lobbyList'
import displayMessages from "./messages"
import deletemessage from "./deletemessage"
import addMessage from "./addMessage"
import displayUsers from "./displayUsers"
import deleteMessageAdmin from "./deleteMessageAdmin"
import patchMessage,{patchMessageAdmin} from "./patchMessage"
import addNewUser, { deleteUser } from "./addordeleteuser"
import addNewLobby from "./createlobby"
import register from "./register"





user()
lobbyList('https://lokkeroom.herokuapp.com/api/lobby',displaylobby)
lobbyList('https://lokkeroom.herokuapp.com/api/admin',displayAdminlobby)

//register
const registerButton=document.querySelector('.register-button')
if(registerButton){
    registerButton.addEventListener('click',(e)=>{
        e.preventDefault
        registerOverlay.style.display="none"
        loginOverlay.style.display="flex"
        register()

    })
}
//display all users in same lobby
document.addEventListener('click',displayUsers)
//edit for user
document.addEventListener('click',(e)=>{
    if(e.target&&e.target.className=="msg"){
        
      if((e.target.parentElement.children[1].id===e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[6].id)){
            e.target.contentEditable = true;
        
        }
       else if(rightSide.classList.contains("admin")){
          e.target.contentEditable=true;
        }
        else{
            e.target.contentEditable=false;
        }

    }

        
    
})

//patch message
document.addEventListener('click',patchMessage)
document.addEventListener('click',patchMessageAdmin)
//delete message
document.addEventListener('dblclick',deletemessage);
    
//delete message admin
document.addEventListener('dblclick',deleteMessageAdmin)


//send message
document.addEventListener('click',addMessage)
    

//open message lobby
document.addEventListener('click',(e)=>{

    if(e.target&&e.target.className=="admin"||e.target&&e.target.className=="not-admin"){
        
      const rightSide = document.querySelector('.right-side')
            rightSide.innerHTML=""
            rightSide.setAttribute("id",e.target.id)
            rightSide.classList.add(e.target.className)
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

//add new user

const newUserButton=document.querySelector('.new-user-button')
if(newUserButton){
    newUserButton.addEventListener('click',addNewUser)

}

//delete user

document.addEventListener('dblclick',deleteUser)
//add new lobby
const newlobbyButton=document.querySelector('.new-lobby-button')
if(newlobbyButton){
    newlobbyButton.addEventListener('click',addNewLobby)

}
