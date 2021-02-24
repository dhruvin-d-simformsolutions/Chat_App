const scoket = io()

document.querySelector("#message-form").addEventListener('submit',(e)=>{
    e.preventDefault()
    
    const message = e.target.elements.message.value
    scoket.emit("sendMessage",message)
})

scoket.on('message',(welcommessage) =>{
    console.log(welcommessage);
})

document.querySelector('#send-location').addEventListener('click',()=>{
    if (!navigator.geolocation){
        return alert('Geolocation is not supported by your browser')
    }
    navigator.geolocation.getCurrentPosition((position)=>{
    //   console.log(position);
      scoket.emit('sendLocation',{
        latitude : position.coords.latitude,
        longitude : position.coords.longitude
      })
    })
})