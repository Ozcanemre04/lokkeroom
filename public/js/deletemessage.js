import Cookies from "js-cookie";
export default function deletemessage(e){
    if(e.target&&e.target.className=="message"){
        let id =e.target.id;
        fetch('https://lokkeroom.herokuapp.com/api/lobby/message/'+id,{
            method:"DELETE",
            
            headers:{
                "Content-type":"application/json; charset=UTF-8",
                Authorization:'Bearer ' +  Cookies.get('AccessToken')
                
            }
            
        })
        .then(res=>res.json())
        .then(data=>{
            
            console.log(data);
        })
    }
}