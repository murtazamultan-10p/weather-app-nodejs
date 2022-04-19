const weatherForm = document.querySelector('form');
const searchLocation = document.querySelector('input');
const msg_one = document.querySelector('#msg-1');
const msg_two = document.querySelector('#msg-2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchLocation.value;

    msg_one.textContent = 'loading ...';
    msg_two.textContent = '';


    fetch('/weather?location=' + location).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                msg_one.textContent = data.error;
            } else {
                msg_one.textContent = data.location;
                msg_two.textContent = data.current;

            }
        });
    });
})
