const form = document.getElementById('anon');
const ul = document.getElementById('anon-messages');

fetch('/api/contact')
    .then((res) => res.json())
    .then((totalMessage) => {
        totalMessage.forEach((message) => {
            const li = document.createElement('li');
            li.textContent = `${message.messageSubject}: ${message.messageBody}`
            ul.appendChild(li);
        });
    });


form.addEventListener('submit', (event) => {
    event.preventDefault();

    const fd = new FormData(form);

    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            messageSubject: fd.get('subject'),
            messageBody: fd.get('message'),
        }),
    })
        .then((res) => res.json())
        .then((json) => console.log(json));
});

