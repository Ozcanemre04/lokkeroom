
import Cookies from "js-cookie";
export default function messages(){
    fetch('https://lokkeroom.herokuapp.com/api/admin/users/3',{
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


function displayMessages(data){
    
    for(let i = 0; i < data.length; i++){
        const rightSide = document.querySelector('.right-side')
        let p2 = document.createElement('p')
        p2.innerText=data[i].name;
        rightSide.appendChild(p2)
    
    }
}