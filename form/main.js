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

const checkEmail = (input) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      
    if(re.test(input.value)){
        success(input);
    }else{
        error(input, 'email is required')
    }
  };

function checkRequired(inputs) {
    inputs.forEach((input) => {
        if(input.value===''){
            error(input, `${input.id} is required` );
        }else{
            success(input);
        }
    })
    
}

function checkLenght(input, min, max){
    if(input.value.lenght < min){
        error(input, `${input.id} en az ${min} karakterli olmali.`)
    }else if(input.value.lenght > max){
        error(input, `${input.id} en fazla ${max} karakterli olmali.`)
    }else{
        success(input)
    }
}

function checkPasswords(input1,input2){
    if(input1.value !== input2.value){
        error(input2,'parolalar eşleşmiyor')
    }
}

const checkPhone =(input)=>{
    var exp = /^\d{10}$/;
    if(!exp.test(input.value)){
        error(input, 'phone must be 10 character')
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault(); // bunun sayesinde yenilenmeyi engellemiş olduk.

    checkRequired([username, email, phone, password, rePassword]);
    checkEmail(email)
    checkLenght(username,7,14);
    checkLenght(password,7,12);
    checkPasswords(password,rePassword);
    checkPhone(phone)
    

   
})