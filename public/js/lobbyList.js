
import Cookies from "js-cookie";
export default function lobbyList(url){
    fetch(url,{
       method:"GET",
       
       headers:{
           Authorization:'Bearer ' + Cookies.get('AccessToken')
        }
        
        
        
    })
    .then(res=>res.json())
    .then(data=>{
        displaylobby(data)
        
    })
}


function displaylobby(data){
    
    for(let i = 0; i < data.length; i++){
        const leftSide = document.querySelector('.left-side')
        let p2 = document.createElement('p')
        p2.innerText=data[i].name;
        p2.className="p2"
        p2.setAttribute('id',data[i].id)
        leftSide.appendChild(p2)
        // p2.className=data[i].admin_id
    
    }
    
}