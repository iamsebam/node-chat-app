const messageForm = document.getElementById("message-form");
const input = document.querySelector('input');
const button = document.querySelector('button');
const messages = document.getElementById('messages');

const socket = io();

socket.on('connect', function () {
    console.log('%cConnected to server', 'color:green');

});

socket.on('disconnect', function () {
    console.log('%cDisconnected from server', 'color:red')
});

socket.on('newMessage', function(message) {
    //console.log(`New message from ${message.from}:`, message.text);
    const html = `<li>${message.from}: ${message.text}</li>`;
    html.trim();
    messages.insertAdjacentHTML('beforeend', html);
});

submitMessage = () => {
    socket.emit('createMessage', {
        from: 'User',
        text: input.value
    }, function() {

    });

    input.value = '';
};

messageForm.addEventListener('submit', function(event) {
    event.preventDefault();
    submitMessage();
});
