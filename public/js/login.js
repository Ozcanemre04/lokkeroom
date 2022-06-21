

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
         window.location ="/lobby.html"
        
        document.cookie = "AccessToken=" + Object.values(data)[0] + "; max-age=86400; path=/;";
        document.cookie = "RefreshToken=" + Object.values(data)[1] + "; max-age=86400; path=/;";
    }
        
     

})}




