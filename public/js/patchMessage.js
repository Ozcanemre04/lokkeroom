import Cookies from "js-cookie";
export default function patchMessage(e){
    if(e.target&&e.target.className=="edit"){
        let element = e.target.parentElement.children[0].innerText
        element.contentEditable = false;
        
        let id =e.target.parentElement.id;
        fetch('https://lokkeroom.herokuapp.com/api/lobby/message/'+id,{
            method:"PATCH",
            body:JSON.stringify({
                "message":element,
                
            }),
            
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



export function patchMessageAdmin(e){
    if(e.target&&e.target.className=="edit"){
        let element = e.target.parentElement.children[0].innerText
        element.contentEditable = false;
        const rightSide = document.querySelector('.right-side')
        let lobby_id=rightSide.id
        console.log(lobby_id);
        let id =e.target.parentElement.id;
        fetch('https://lokkeroom.herokuapp.com/api/admin/message/'+id+'/'+lobby_id,{
            method:"PATCH",
            body:JSON.stringify({
                "message":element,
                
            }),
            
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