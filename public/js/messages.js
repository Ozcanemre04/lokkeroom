
const rightSide = document.querySelector('.right-side')






export default function displayMessages(data){
    let allmessages=document.createElement('div')
    let allmessages2=document.createElement('div')
    let div2=document.createElement('div')
    div2.className='input'
    allmessages.appendChild(div2)
    allmessages.setAttribute('id',"all-messages")
    let inputMessage=document.createElement('input')
    inputMessage.className='input-message';
    
    div2.appendChild(inputMessage)
    let send =document.createElement('div')
    send.className='send'
    div2.appendChild(send)

    let div3=document.createElement('div')
    div3.classList.add('users-div')
    rightSide.appendChild(div3)
    let displayUsersButton=document.createElement('button')
    displayUsersButton.innerHTML="display-users"
    displayUsersButton.classList.add('display-users-button')
    div3.appendChild(displayUsersButton)
    
    let div4=document.createElement('div')
    div4.classList.add('users-displayed')
    div3.appendChild(div4)
    

    
    for(let i = 0;i<data.result.length;i++){
     
     let div=document.createElement('div')
     div.className="message"
     div.setAttribute('id',data.result[i].id)
     
     rightSide.appendChild(div)
     rightSide.appendChild(allmessages)
     allmessages.appendChild(allmessages2)
     allmessages2.appendChild(div)
     let message = document.createElement('p')
     message.innerText=data.result[i].message
     message.className='msg'
     div.appendChild(message)
     let authorName= document.createElement('i')
     authorName.innerText=data.result[i].name
     authorName.setAttribute('id',data.result[i].author_id)
     div.appendChild(authorName)
     let doneButton=document.createElement("button")
     doneButton.innerText="edit"
     doneButton.className='edit'
     div.appendChild(doneButton)

    }
    
}