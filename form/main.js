const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const rePassword = document.getElementById('repassword');

function error(input, message){
    input.className = 'form-control error'
    const div = input.nextElementSibling; // ulaşmış olduğumuz inputun hemen sonrasındaki etikete ulaşırız 
    div.innerText = message;
    div.className = "message"
}

function success(input){
    input.className ='form-control success'
}

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

form.addEventListener('submit', (e) => {
    e.preventDefault(); // bunun sayesinde yenilenmeyi engellemiş olduk.

    if(username.value === ''){  
        error(username, 'username is needed')
    }else{
        success(username)
    }
    if(email.value === ''){
        error(email, 'email is needed')
    }else if(!validateEmail(email.value)){//eğer burdan true bir mail gelirse bu kısmı direkt atlar
        error(email, 'please, you write a correct email adress')
    }
    else{
        success(email)
    }
    if(phone.value === ''){
        error(phone, 'phone is needed')
    }else{
        success(phone)
    }
    if(password.value === ''){
        error(password, 'password is needed')
    }else{
        success(password)
    }
    if(rePassword.value === ''){
        error(rePassword, 're-password is needed')
    }else{
        success(rePassword)
    }
})