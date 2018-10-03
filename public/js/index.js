const messageForm = document.getElementById("message-form");
const input = document.querySelector('input');
const button = document.getElementById('send-message');
const messages = document.getElementById('messages');
const locationButton = document.getElementById('send-location');

const socket = io();

socket.on('connect', function () {
    console.log('%cConnected to server', 'color:green');

});

socket.on('disconnect', function () {
    console.log('%cDisconnected from server', 'color:red')
});

socket.on('newMessage', function(message) {
    createHtml(message);
});

socket.on('newLocationMessage', function(message) {
    const link = `<a target="_blank" href="${message.url}">My current location</a>`;
    createHtml(message, link);
});

submitMessage = () => {
    socket.emit('createMessage', {
        from: 'User',
        text: input.value
    }, function() {

    });

    input.value = '';
};

createHtml = (message, link) => {
    const html = `<li>${message.from}: ${!link ? message.text : link}</li>`;
    html.trim();
    return messages.insertAdjacentHTML('beforeend', html);
};

messageForm.addEventListener('submit', function(event) {
    event.preventDefault();
    submitMessage();
});

locationButton.addEventListener('click', function(event) {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        alert('Unable to fetch location');
    });
});