const messageForm = document.getElementById("message-form");
const input = document.querySelector('input');
const button = document.getElementById('send-message');
const messages = document.getElementById('messages');
const locationButton = document.getElementById('send-location');
const template = document.getElementById('message-template').textContent;

const socket = io();

socket.on('connect', function () {
    console.log('%cConnected to server', 'color:green');

});

socket.on('disconnect', function () {
    console.log('%cDisconnected from server', 'color:red')
});

socket.on('newMessage', function(message) {
    createHtml(message, template);
});

socket.on('newLocationMessage', function(message) {
    const link = `<a target="_blank" href="${message.url}">My current location</a>`;
    createHtml(message, template, link);
});

submitMessage = () => {
    socket.emit('createMessage', {
        from: 'User',
        text: input.value
    }, function() {
        input.value = '';
    });
};

createHtml = (message, template, link) => {
    const formattedTime = moment(message.createdAt).format('H:mm:ss')
    const html = Mustache.render(template, {
        user: message.from,
        link: link,
        text: message.text,
        time: formattedTime
    });
    html.trim();
    messages.insertAdjacentHTML('beforeend', html);
};

messageForm.addEventListener('submit', function(event) {
    event.preventDefault();
    submitMessage();
});

locationButton.addEventListener('click', function(event) {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    locationButton.toggleAttribute('disabled');
    locationButton.textContent = 'Sending location...'
    
    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage', {
            from: 'User',
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        locationButton.toggleAttribute('disabled');
        locationButton.textContent = 'Send location';
    }, function() {
        alert('Unable to fetch location');
        locationButton.toggleAttribute('disabled');
        locationButton.textContent = 'Send location';
    });
});