const closeedite = document.getElementById('close-edite');
const img1 = document.querySelector('.img-pro')
const img = document.getElementById('img-pro');
const uploadbtn = document.getElementById('file');
const username = document.querySelector('.name-pro');
const user = document.getElementById('new-name');
const oldname = document.getElementById('oldname');
const savename = document.getElementById('savename');
// clear name 
function clearname() {
    user.value = '';
}
// close the site 
window.onload = function () {
    let result = localStorage.getItem('userpass');
    if (result == undefined) {
        document.body.style.display = 'none'
        location.href = 'login.html';
    }
}
// logout site 

function logout() {
    if (confirm('هل تريد تسجيل الخروج') == true) {
        localStorage.removeItem('userpass');
        location.href = 'login.html';
    }

}



// save edite profile 
savename.onclick = function () {
    if (user.value.length > 6) {
        username.innerHTML = user.value;
        oldname.innerHTML = username.innerHTML;
        img1.src = img.src;
    }
    else {
        alert('name short')
        user.value = username.innerHTML;
    }
}

// upload photo 

uploadbtn.addEventListener('change', (e) => {
    img.src = URL.createObjectURL(e.target.files[0])

}
);

// change photo 

function changephoto(src) {
    document.getElementById('img-pro').src = src;
}


// menu 

const menu = document.querySelectorAll('#list li');
const content = document.querySelectorAll('.content');
user.value = username.innerHTML;

menu.forEach((item, i) => {
    item.addEventListener('click', () => {
        content[i].classList.add('show');
        content.forEach((lop, j) => {
            if (i != j) {
                lop.classList.remove('show');
            }
        })
    })
});

// create table 
const submit = document.getElementById('submit');
const title = document.getElementById('product');
const price = document.getElementById('price');
const category = document.getElementById('category');
const count = document.getElementById('count');
const idproduct = document.getElementById('id-product');
let mood = 'create';
let tmp;



let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product)
} else {
    datapro = [];
}




submit.onclick = function () {

    let newpro = {
        title: title.value.toLowerCase(),
        price: price.value,
        category: category.value,
        count: count.value,
    }
    if (title.value != '' && price.value != '' && category.value != '' && newpro.count < 101) {
        if (mood === 'create') {
            if (newpro.count > 1) {
                for (let i = 0; i < newpro.count; i++) {
                    datapro.push(newpro);

                }
            } else {
                datapro.push(newpro);
            }

        } else {
            datapro[tmp] = newpro;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';

        }
        cleardata()
    }
    localStorage.setItem('product', JSON.stringify(datapro))
    showdata()
    if (count.value > 100) {
        alert('count max 100');
        count.style.color = 'red'

    }
};

function showdata() {
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        table += `<tr>
                    <td>${i + 1}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].category}</td>
                    <td><button class="update" onclick="updatedata(${i})" title="update">Update</button></td>
                    <td><button class="delete" onclick="deletedata(${i})" title="delete">Delete</button></td>
                </tr>`

    }
    idproduct.innerHTML = `${datapro.length}`;
    count.style.color = '#000'
    // اضافه جدول
    document.getElementById('tbody2').innerHTML = table;
    document.getElementById('tbody').innerHTML = table;
    // اضافه رز حذف
    let btndlelte = document.getElementById('btndlelte');
    // اضافه زر حذف الكل
    if (datapro.length > 0) {
        btndlelte.style.display = 'block';

    } else {
        btndlelte.style.display = 'none';
    }
};
showdata();

function cleardata() {
    title.value = '';
    price.value = '';
    count.value = '';
    category.value = '';
};

// delete data 
function deletedata(i) {
    if (window.confirm('هل تريد الحذف') == true) {

        datapro.splice(i, 1);
        localStorage.product = JSON.stringify(datapro);
    }
    showdata();

};

// delete all date 
function deleteall() {
    if (window.confirm('هل تريد حذف كل البيانات') == true) {
        localStorage.clear()
        datapro.splice(0)
    }
    showdata()
}


// update 
function updatedata(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    count.style.display = 'none';
    category.value = datapro[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth',
    })
}

// search 


function getsearchmood(id) {
    let search = document.getElementById('inp-search');
    if (id == 'searchTitle') {
        searchmood = 'Title';
    } else {
        searchmood = 'Category';
    }
    search.placeholder = 'Search By ' + searchmood;

    search.focus()
    search.value = '';
    showdata();
};



function datasearch(value) {
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        if (searchmood == 'Title') {
            if (datapro[i].title.includes(value.toLowerCase())) {

                table += `<tr> 
    <td>${i}</td> 
    <td>${datapro[i].title}</td> 
    <td>${datapro[i].price}</td>
                    <td>${datapro[i].category}</td>
 <td><button class="update" onclick="updatedata(${i})" title="update">Update</button></td>
                    <td><button class="delete" onclick="deletedata(${i})" title="delete">Delete</button></td>
</tr>`
            }

        } else {
            if (datapro[i].category.includes(value.toLowerCase())) {

                table += `<tr> 
    <td>${i}</td> 
     <td>${datapro[i].title}</td> 
    <td>${datapro[i].price}</td>
                    <td>${datapro[i].category}</td>

 <td><button class="update" onclick="updatedata(${i})" title="update">Update</button></td>
                    <td><button class="delete" onclick="deletedata(${i})" title="delete">Delete</button></td>
</tr>`
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
    document.getElementById('tbody2').innerHTML = table;
}

// table end 

// clients 
let userdate;
if (localStorage.userinfo != null) {
    userdate = JSON.parse(localStorage.userinfo)
} else {
    userdate = [];
}

const tel = document.getElementById('tel');
function showuserdate() {
    let usertable = '';
    for (let k = 0; k < userdate.length; k++) {
        usertable += `<tr>
                        <td>
                            <p>Name</p>
                            <p>Password</p>
                            <p>male</p>
                            <p>Email</p>
                            <p>Tel</p>
                        </td>
                        <td>
                            <p>${userdate[k].username}</p>
                            <p>${userdate[k].password}</p>
                            <p>${userdate[k].male}</p>
                            <p>${userdate[k].email}</p>
                            <p>${userdate[k].tel}</p>
                        </td>
                        <td><span class="green">active</span></td>
                        <td><button class="delete" onclick="deleteuser(${k})">Delete</button></td>
                    </tr>`

    }
    document.getElementById('uertable').innerHTML = usertable;

}
showuserdate();

function deleteuser(k) {
    if (window.confirm('هل تريد حذف العضو') == true) {

        userdate.splice(k, 1);
        localStorage.userinfo = JSON.stringify(userdate);
    }
    showuserdate();

};
