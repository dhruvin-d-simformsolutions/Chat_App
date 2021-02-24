const scoket = io()

const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $locationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

//Template
 const messageTemplate = document.querySelector('#message-template').innerHTML

 scoket.on('message', (message) => {
     console.log(message);
    const html = Mustache.render(messageTemplate,{
        message
    })
    $messages.insertAdjacentHTML('beforeend',html)
     
 })
 
document.querySelector("#message-form").addEventListener('submit', (e) => {
    e.preventDefault()
    
    
    //disable on submitting form
    $messageFormButton.setAttribute('disabled','disabled')
    
    
    const message = e.target.elements.message.value
    scoket.emit("sendMessage", message,(error)=>{
        // console.log("Meassage ",message);
        // enable
        $messageFormButton.removeAttribute('disabled')
        
        $messageFormInput.value = ''
        $messageFormInput.focus()
        if(error){
            return console.log(error);
        }
        console.log("Messge Delivered! ");
    })
})


$locationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser')
    }
    
    //disable
    $locationButton.setAttribute('disabled','disabled')
    
    navigator.geolocation.getCurrentPosition((position) => {
        //enable
        $locationButton.removeAttribute('disabled')
        
        //   console.log(position);
        scoket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        },()=>{
            console.log('Location Shared');
        })
    })
})