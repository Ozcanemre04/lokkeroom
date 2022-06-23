
import Cookies from "js-cookie";
export default function lobbyList(url, fun){
    fetch(url,{
       method:"GET",
       
       headers:{
           Authorization:'Bearer ' + Cookies.get('AccessToken')
        }
        
        
        
    })
    .then(res=>res.json())
    .then(data=>{
        fun(data)
        
    })
}


export  function displaylobby(data){
    
    for(let i = 0; i < data.length; i++){
        const leftSide = document.querySelector('.left-side')
        let p2 = document.createElement('p')
        let lobbyDiv=document.createElement('div')
        lobbyDiv.classList.add("not-admin")
        leftSide.appendChild(lobbyDiv)
        p2.innerText=data[i].name;
        
        lobbyDiv.setAttribute('id',data[i].id)
        lobbyDiv.appendChild(p2)
        
    
    }
    
}

export function displayAdminlobby(data){
    
    for(let i = 0; i < data.length; i++){
        const leftSide = document.querySelector('.left-side')
        let lobbyDiv=document.createElement('div')
        lobbyDiv.classList.add("admin")
        leftSide.appendChild(lobbyDiv)
        let p3 = document.createElement('p')
        p3.innerText=data[i].name;
        
        
        lobbyDiv.setAttribute('id',data[i].id)
        lobbyDiv.appendChild(p3)
        
    
    }
    
}


