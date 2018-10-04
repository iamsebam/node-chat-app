const messageForm = document.getElementById("message-form");
const input = document.querySelector('input');
const button = document.getElementById('send-message');
const messages = document.getElementById('messages');
const locationButton = document.getElementById('send-location');
const messageTemplate = document.getElementById('message-template').textContent;
const userTemplate = document.getElementById('user-template').textContent;
const userList = document.getElementById('users');

const socket = io();

socket.on('connect', function () {
    const params = getSearchParams(window.location.search);

    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
});

socket.on('disconnect', function () {
    console.log('%cDisconnected from server', 'color:red')
});

socket.on('updateUserList', function(users) {
    if(userList.firstChild) {
        userList.firstChild.remove();
    }
    createUserHtml(users, userTemplate);
});

socket.on('newMessage', function(message) {
    createMessageHtml(message, messageTemplate);
    scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
    const link = `<a target="_blank" href="${message.url}">My current location</a>`;
    createMessageHtml(message, messageTemplate, link);
    scrollToBottom();
});

submitMessage = () => {
    socket.emit('createMessage', {
        from: 'User',
        text: input.value
    }, function() {
        input.value = '';
    });
};

createMessageHtml = (message, template, link) => {
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

createUserHtml = (user, template) => {
    let html;
    userList.innerHTML = '<ol></ol>';
    const list = userList.firstChild;
    user.forEach((user) => {
        html = Mustache.render(template, {
            user: user
        });
        list.insertAdjacentHTML('beforeend', html);
    });
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

function scrollToBottom () {
    const { clientHeight,
        scrollTop,
        scrollHeight } = messages;
    const newMessageHeight = messages.lastElementChild.clientHeight;
    let lastMessageHeight;
    if (messages.lastElementChild.previousElementSibling) {
        lastMessageHeight = messages.lastElementChild.previousElementSibling.clientHeight;
    }
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop = scrollHeight;
    }
}

function getSearchParams (search) {
    const params = new URLSearchParams(search);
    return {
        name: params.get('name'),
        room: params.get('room')
    }
}