var loginForm = document.getElementById('login-form');
loginForm.onsubmit = function (e){
    e.preventDefault();

    var userName = document.getElementById('User-name')
    var userPwd = document.getElementById("User-pwd")

    var loginData = {
        username: userName.value,
        password:userPwd.value
    } 

    var http = new XMLHttpRequest();
    http.open('POST', 'https://607c412c67e6530017573d5a.mockapi.io/users', true);
    http.onreadystatechange = function (){
        if(this.readyState === 4){
            localStorage.setItem('userLoginStatus', true)
            localStorage.setItem('Username', userName.value)
            location.assign('./index.html')
        }
    }
    http.send(JSON.stringify(loginData));
}