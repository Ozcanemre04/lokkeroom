const lobbySection=document.querySelector('.lobby-section')


export default function lobby(){
    fetch('http://localhost:5000/api/user',{
       method:"GET"
       
      
    })
    .then(res=>res.json())
    .then(data=>{
       console.log(data);
       
    })
   }