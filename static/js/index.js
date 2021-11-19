let socket = io( 'http://localhost:8888' );
let username;
socket.on('prompt',function(){
    username = prompt('Please enter your name');
    socket.emit('username',{username:username});
})

$( '.messageForm' ).on( 'submit', function(event){
    event.preventDefault();

    let userMessage = $( '#userMessage' ).val();

    let send = {
        name: username,
        message: userMessage
    };

    socket.emit( 'sendMessage', send );
});

socket.on( 'sendAll', function( data ){
    let newMessage = `<p> ${data.name}: ${data.message} </p>`;
    $( '.messageBox' ).append( newMessage );
});

socket.on('allMessages', function(data){
    for(let i=0; i<data.messages.length; i++){
        msg = data.messages[i]
        let newMessage = `<p> ${msg.name}: ${msg.message} </p>`;
        $( '.messageBox' ).append( newMessage );

    }


}
)