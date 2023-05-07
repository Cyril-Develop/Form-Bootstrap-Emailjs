const containerPage = document.querySelector('.customForm');
const form = document.querySelector('form');
const userLastname = document.getElementById('lastname');
const userFirstname = document.getElementById('firstname');
const userEmail = document.getElementById('email');
const userMessage = document.getElementById('message');
const allFormField = document.querySelectorAll('.form-control');

// REGEX
const nameRegex = /^([a-z|\s]{3,15})?([-]{0,1})?([a-z|\s]{3,15})$/;
const emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

// INPUTS
userLastname.addEventListener('input', () => checkInput(userLastname, nameRegex));
userFirstname.addEventListener('input', () => checkInput(userFirstname, nameRegex));
userEmail.addEventListener('input', () => checkInput(userEmail, emailRegex));
userMessage.addEventListener('input', checkMessage);

function checkInput(input, regex) {
    const inputValue = input.value;
    if (!regex.test(inputValue)) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
    } else {
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
    };
    if (inputValue === '') input.classList.remove('is-invalid');
};

function checkMessage() {
    const messageValue = userMessage.value;
    if (messageValue.length < 10) {
        userMessage.classList.add('is-invalid');
        userMessage.classList.remove('is-valid');
    } else {
        userMessage.classList.add('is-valid');
        userMessage.classList.remove('is-invalid');
    };
    if (messageValue === '') userMessage.classList.remove('is-invalid');
};

// ALERT
function showAlert(type, message) {
    const alert = document.createElement('div');
    alert.classList.add('alert', type, 'fade', 'show', 'text-center');
    alert.setAttribute('role', 'alert');
    alert.innerHTML = message;
    containerPage.insertBefore(alert, form);
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 1000);
}

// SUBMIT
form.addEventListener('submit', e => {
    e.preventDefault();

    if (userLastname.classList.contains('is-valid') && userFirstname.classList.contains('is-valid') && userEmail.classList.contains('is-valid') && userMessage.classList.contains('is-valid')) {
        sendEmail();
        showAlert('alert-success', 'Message sent !');
        form.reset();
        allFormField.forEach(input => input.classList.remove('is-valid'));
    } else showAlert('alert-danger', 'Please fill in all the fields correctly !');
});

// Emailjs
function sendEmail() {
    let templateParams = {
        lastname: userLastname.value,
        firstname: userFirstname.value,
        email: userEmail.value,
        message: userMessage.value,
    };

    const serviceID = 'service_mk6xxet';
    const templateID = 'template_l08ew81';

    emailjs
        .send(serviceID, templateID, templateParams)
        .then(res => console.log('SUCCESS!', res.status, res.text))
        .catch(err => console.log('FAILED...', err));
};