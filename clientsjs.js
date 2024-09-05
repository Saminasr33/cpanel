// add account 
const newuser = document.getElementById('new-user');
const newpass = document.getElementById('add-pass');
const newpass2 = document.getElementById('add-pass2');
const email = document.getElementById('add-email');
const rouls = document.getElementById('rouls');
const submit = document.getElementById('submit-btn');
const singin = document.getElementById('singin-btn');
const btnpass = document.getElementById('btn-pass');
const male = document.getElementById('male');
const female = document.getElementById('female');

// search for email 

// show password
btnpass.addEventListener('click', () => {
    const visible = newpass.type === 'text';
    const visible2 = newpass2.type === 'text';
    newpass.type = visible ? 'password' : 'text';
    newpass2.type = visible2 ? 'password' : 'text';
    if (newpass.type === 'text' && newpass2.type === 'text') {
        btnpass.innerHTML = 'hiden password'
    } else {
        btnpass.innerHTML = 'show password'

    }
});

// REGISTER 
let userdate;
if (localStorage.userinfo != null) {
    userdate = JSON.parse(localStorage.userinfo)
} else {
    userdate = [];
}


submit.addEventListener('click', () => {

    if (newuser.value != '' && newpass.value != '' && newpass2.value != '' && email.value != '' && rouls.checked) {
        if (newpass.value === newpass2.value) {

            let newaccount = {
                username: newuser.value.toLowerCase(),
                password: newpass.value,
                email: email.value.toLowerCase(),
                male: male.checked,
                tel: tel.value,
            }
            userdate.push(newaccount);
            localStorage.setItem('userinfo', JSON.stringify(userdate))





        } else {
            alert('pass wrong')
        }
    } else {
        alert('no')
    }
})
console.log(userdate);
