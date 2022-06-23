import Cookies from "js-cookie";
export default function deleteMessageAdmin(e){
    if(e.target&&e.target.className=="message"){
        let messageId =e.target.id;
        let lobbyId= e.target.parentElement.parentElement.id;
        fetch('https://lokkeroom.herokuapp.com/api/admin/message/'+messageId+'/'+lobbyId,{
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