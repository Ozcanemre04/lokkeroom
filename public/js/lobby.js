import Cookies from "js-cookie";

const leftSide = document.querySelector('.left-side')


export default function lobby(){
    fetch('https://lokkeroom.herokuapp.com/api/user',{
       method:"GET",
       credentials: 'same-origin',
       headers:{
         Authorization:'Bearer ' +  Cookies.get('AccessToken')
       }
       
       
      
    })
    .then(res=>res.json())
    .then(data=>{
       
       let p = document.createElement('p')
       p.innerText=data.name;
       leftSide.appendChild(p)
       
       
    })
   }

  
   
   