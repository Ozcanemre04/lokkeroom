import Cookies from "js-cookie";
const bodyy = document.querySelector('.body')
const leftSide = document.querySelector('.left-side')


export default function user(){
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
       p.innerText=data.name+"(id="+ data.id+")";
       leftSide.appendChild(p)
       let h4 = document.createElement('button')
       h4.innerText="logout";
       h4.setAttribute('id','logout')
       leftSide.appendChild(h4)
       
       p.setAttribute('id',data.id)
       
     
      if(p.innerText==="undefined"){
       bodyy.innerHTML=""
       let error= document.createElement('h1')
       error.className="error"
       error.innerText='error 403 forbidden'
       bodyy.appendChild(error)

      }
      
   })
}

 

  
   
   