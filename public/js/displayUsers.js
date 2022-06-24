

import Cookies from "js-cookie";

export default function displayUsers(e){
    if(e.target&&e.target.className=="display-users-button"){
        let userDisplayed=e.target.parentElement.children[1]
        userDisplayed.innerHTML="";
        
        userDisplayed.classList.toggle("active")
        //if active display 
        if(userDisplayed.classList.contains("active")&&e.target.parentElement.parentElement.classList.contains('admin')){
            userDisplayed.style.display="inline-block"
        }
        else{
            userDisplayed.style.display="none"
        }
        
        let id = e.target.parentElement.parentElement.id
       
    fetch('https://lokkeroom.herokuapp.com/api/admin/users/'+id,{
        method:"GET",
        credentials: 'same-origin',
        headers:{
          Authorization:'Bearer ' +  Cookies.get('AccessToken')
        }
        
        
       
     })
     .then(res=>res.json())
     .then(data=>{
        
     for(let i=0;i<data.length;i++){
        let user=document.createElement('div')
        userDisplayed.appendChild(user)
        let p =document.createElement('p')
        user.appendChild(p)
        p.innerText=data[i].name
        p.className=data[i].id
        let userDeleteButton=document.createElement('button')
        userDeleteButton.innerText="-"
        user.appendChild(userDeleteButton)
     }
     
       
    })}
}