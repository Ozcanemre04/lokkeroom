import Cookies from "js-cookie";

const section = document.querySelector('.lobby-section')


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
       console.log(data);
       let p = document.createElement('p')
       p.innerText=data.name;
       section.appendChild(p)
       
       
    })
   }

  
   
   