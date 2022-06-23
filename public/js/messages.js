
const rightSide = document.querySelector('.right-side')






export default function displayMessages(data){
    let allmessages=document.createElement('div')
    let div2=document.createElement('div')
    div2.className='input'
    rightSide.appendChild(div2)
    let inputMessage=document.createElement('input')
    inputMessage.className='input-message';
    
    div2.appendChild(inputMessage)
    let send =document.createElement('div')
    send.className='send'
    div2.appendChild(send)
    
    for(let i = 0;i<data.result.length;i++){
     
     let div=document.createElement('div')
     div.className="message"
     div.setAttribute('id',data.result[i].id)
     
     rightSide.appendChild(div)
     rightSide.appendChild(allmessages)
     allmessages.appendChild(div)
     let message = document.createElement('p')
     message.innerText=data.result[i].message
     message.className='msg'
     div.appendChild(message)
     let authorName= document.createElement('i')
     authorName.innerText=data.result[i].name
     div.appendChild(authorName)

    }
    
}