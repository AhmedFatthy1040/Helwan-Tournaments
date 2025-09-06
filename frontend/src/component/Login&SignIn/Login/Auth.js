const adminUsername = 'admin';
const adminPassword = '123';
const userUsername = 'user';
const userPassword = '321';

function valid() {
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    if (usernameInput === adminUsername && passwordInput === adminPassword) {
        window.location.href = "/AdminDashboard";
    } else if (usernameInput === userUsername && passwordInput === userPassword) {
        window.location.href = "/UserHome";
    } else {
        alert('Invalid username or password');
    }
}
