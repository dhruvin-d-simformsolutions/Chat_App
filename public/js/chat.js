const scoket = io()

document.querySelector("#message-form").addEventListener('submit',(e)=>{
    e.preventDefault()
    
    const message = e.target.elements.message.value
    scoket.emit("sendMessage",message)
})
scoket.on('message',(welcommessage) =>{
    console.log(welcommessage);
})