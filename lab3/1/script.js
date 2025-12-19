const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm');

const validateUsername = () => {
    const username = usernameInput.value;
    return username.length >= 5;
}

const validateEmail = () => {
    const email = emailInput.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

const validatePhone = () => {
    const phone = phoneInput.value;
    return phone.length == 10 && !isNaN(phone);
}

const validatePassword = () => {
    const password = passwordInput.value;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
}

const validateConfirmPassword = () => {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    return password === confirmPassword;
}

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateUsername() && validateEmail() && validatePhone() && validatePassword() && validateConfirmPassword()) {
        alert('Form submitted successfully!');
    } else {
        alert('Please correct the errors in the form before submitting.');
    }
    console.log('Form submitted');
});

