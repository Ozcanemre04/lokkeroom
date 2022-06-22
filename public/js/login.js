import Cookies from 'js-cookie'


const loginEmail = document.querySelector('#login_email')
const loginPassword = document.querySelector('#login_password')

  
const date = Date.now()

//login
export default function login(){
 fetch('https://lokkeroom.herokuapp.com/api/login',{
    method:"POST",
    body:JSON.stringify({
        "email":loginEmail.value,
        "password":loginPassword.value
    }),
    headers:{
        "Content-type":"application/json; charset=UTF-8"
        
    }
 })
 .then(res=>res.json())
 .then(data=>{
     console.log(data);
     
     if(data.error){
        alert(data.error)
     }
     else {
        if(Cookies.get('AccessToken')){
            window.location ="/lobby.html"

        }
        
        Cookies.set('AccessToken', Object.values(data)[0],{expires:1})
        Cookies.set('refreshToken', Object.values(data)[0],{expires:1})
        
    }
        
     

})}




