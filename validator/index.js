const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const validPassword = document.getElementById('valid-password');

//Show input error
function showError(input, message) {
    const formControl = input.parentElement
    formControl.className = 'form-control error'
    const small = formControl.querySelector('small')
    small.innerText = message
    
}
//show success
function showSuccess(input, message) {
    const formControl = input.parentElement
    formControl.className = 'form-control success'
}

//check required fields
function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        if(input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`)
        }else {
            showSuccess(input)
        }
    })
}

//Check input length
function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`)
    }else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`)

    }else {
        showSuccess(input)
    }
}

//Get fieldname to uppercase
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}
//Check email is valid
function isValidEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())) {
        showSuccess(input)
    }else {
        showError(input, 'Email is not valid')
    }
}

//check password match

function checkPassword(input, input2) {
    if(input.value !== input2.value) {
        showError(input2, 'Passwords do not match')
    }
}

//event listener
form.addEventListener('submit', function(e) {
    e.preventDefault()
    checkRequired([username, email, password, validPassword])
    checkLength(username, 3, 15)
    checkLength(password, 6, 20)
    isValidEmail(email)
    checkPassword(password, validPassword)
})