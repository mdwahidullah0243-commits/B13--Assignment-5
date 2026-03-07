const loginBtn = document.getElementById('login-btn');

loginBtn.addEventListener('click', function () {
    const username = getValueFromInput('username-input');
    const password = getValueFromInput('password-input');

    if (username === 'admin' && password === 'admin123') {
        window.location.assign('./main.html');
        return;

    } else {
        if (username !== 'admin') {
            alert(`Login failed! Invalid, your given username: ${username}, <Enter this username: "admin">`);
            return;
        }

        if (password !== 'admin123') {
            alert(`Login failed! Invalid, your given password: ${password}, <Enter this password: "admin123">`);
            return;
        }
    }
})