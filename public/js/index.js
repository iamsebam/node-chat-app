const socket = io();

socket.on('connect', function () {
    console.log('%cConnected to server', 'color:green');

});

socket.on('disconnect', function () {
    console.log('%cDisconnected from server', 'color:red')
});

socket.on('newMessage', function(message) {
    console.log(`New message from ${message.from}:`, message.text);
});

