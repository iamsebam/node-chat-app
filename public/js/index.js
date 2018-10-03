const socket = io();

socket.on('connect', function () {
    console.log('%cConnected to server', 'color:green');

    socket.emit('createMessage', {
        to: 'Barbra',
        text: 'Yeaah bro lets spark it up!'
    });
});

socket.on('disconnect', function () {
    console.log('%cDisconnected from server', 'color:red')
});

socket.on('newMessage', function(message) {
    console.log('New message: ', message);
});

