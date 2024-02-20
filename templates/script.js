let form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    userName = document.getElementById("name"),
    age = document.getElementById("age"),
    city = document.getElementById("city"),
    email = document.getElementById("email"),
    phone = document.getElementById("phone"),
    post = document.getElementById("post"),
    sDate = document.getElementById("sDate"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser")


let getData = [];
const BASE_URL = 'http://127.0.0.1:8000';
fetchUsers();

let isEdit = false, editId

newUserBtn.addEventListener('click', () => {
    submitBtn.innerText = 'Submit',
        modalTitle.innerText = "Fill the Form"
    isEdit = false
    imgInput.src = "./photo/Profile-icon.png"
    form.reset()
})


file.onchange = function () {
    if (file.files[0].size < 1000000) {  // 1MB = 1000000
        let fileReader = new FileReader();

        fileReader.onload = function (e) {
            imgUrl = e.target.result
            imgInput.src = imgUrl
        }

        fileReader.readAsDataURL(file.files[0])
    }
    else {
        alert("This file is too large!")
    }
}


function showInfo(getData) {
    document.querySelectorAll('.employeeDetails').forEach(info => info.remove())
    getData.forEach((element, index) => {
        let createElement = `<tr class="employeeDetails">
            <td>${index + 1}</td>
            <td><img src="${element.picture}" alt="" width="50" height="50"></td>
            <td>${element.Name}</td>
            <td>${element.Age}</td>
            <td>${element.City}</td>
            <td>${element.Email}</td>
            <td>${element.Phone}</td>
            <td>${element.Post}</td>
            <td>${element.startDate}</td>


            <td>
                <button class="btn btn-success" onclick="readInfo('${element.picture}', '${element.Name}', '${element.Age}', '${element.City}', '${element.Email}', '${element.Phone}', '${element.employeePost}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>

                <button class="btn btn-primary" onclick="editInfo(${index}, '${element.picture}', '${element.Name}', '${element.Age}', '${element.City}', '${element.Email}', '${element.Phone}', '${element.Post}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>

                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
                            
            </td>
        </tr>`

        userInfo.innerHTML += createElement
    })
}

function readInfo(pic, name, age, city, email, phone, post, sDate) {
    document.querySelector('.showImg').src = pic,
        document.querySelector('#showName').value = name,
        document.querySelector("#showAge").value = age,
        document.querySelector("#showCity").value = city,
        document.querySelector("#showEmail").value = email,
        document.querySelector("#showPhone").value = phone,
        document.querySelector("#showPost").value = post,
        document.querySelector("#showsDate").value = sDate
}


function editInfo(index, pic, name, Age, City, Email, Phone, Post, Sdate) {
    isEdit = true
    editId = index
    imgInput.src = pic
    userName.value = name
    age.value = Age
    city.value = City
    email.value = Email,
    phone.value = Phone,
    post.value = Post,
    sDate.value = Sdate

    submitBtn.innerText = "Update"
    modalTitle.innerText = "Update The Form"
}


function deleteInfo(index) {
    if (confirm("Are you sure want to delete?")) {
        getData.splice(index, 1)
        // localStorage.setItem("userProfile", JSON.stringify(getData))
        showInfo()
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault()
    var fileInput = document.getElementById("imgInput").files[0];
    console.log(fileInput,e);
    // console.log(imgInput.files[0])

    const information = {
        // Picture: imgInput.src == undefined ? "./photo/Profile-icon.png" : imgInput.src,
        // Picture: "1.png",
        Name: userName.value,
        Age: age.value,
        City: city.value,
        Email: email.value,
        Phone: phone.value,
        Post: post.value,
        StartDate: sDate.value
    }

 


    if (!isEdit) {
        // Creating a new user
        fetch('http://127.0.0.1:8000/User/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(information)
        })
        .then(response => {
            // fetchUsers(); // Refresh the table after creation
            console.log(response);
        })
        .catch(error => console.error('Error creating user:', error));
    } else {
        updateUser(editId, information);
        isEdit = false;
    }

    // Reset form and modal
    submitBtn.innerText = "Submit";
    modalTitle.innerText = "Fill The Form";
    form.reset();
    imgInput.src = "./photo/Profile-icon.png";
})




// search section js

const allTr = document.querySelectorAll("#data tr");

const searchInputField = document.querySelector("#search");
searchInputField.addEventListener("input", function (e) {
    const searchStr = e.target.value.toLowerCase();
    allTr.forEach(tr => {
        const td_in_tr = tr.querySelectorAll('td');
        let found = false;
        td_in_tr.forEach(td => {
            if (td.innerText.toLowerCase().includes(searchStr)) {
                found = true;
            }
        });
        tr.style.display = found ? "" : "none";
    });
});


// pagination section

const total_records_tr = document.querySelectorAll("#data tr");
const records_per_page = 5;
let page_number = 1;
const total_records = total_records_tr.length;
const total_page = Math.ceil(total_records / records_per_page);



generatePage()

function DisplayRecords() {
    let start_index = (page_number - 1) * records_per_page;
    let end_index = Math.min(start_index + records_per_page, total_records); // Ensure end_index doesn't exceed total_records
    if (end_index >= total_records) {
        end_index = total_records - 1;
    }
    let statement = '';

    for (let i = start_index; i < end_index; i++) {
        if (total_records_tr[i]) { // Check if total_records_tr[i] is defined
            statement += `<tr> ${total_records_tr[i].innerHTML} </tr> `;
        }
    }
    userInfo.innerHTML = statement;
    document.querySelectorAll('.dynamic-item').forEach(item => {
        item.classList.remove('active');
    });
    document.getElementById(`page${page_number}`).classList.add('active');

    if (page_number == 1) {
        document.getElementById('prevBtn').parentElement.classList.add('disabled');
    } else {
        document.getElementById('prevBtn').parentElement.classList.remove('disabled');
    }


    if (page_number == total_page) {
        document.getElementById('nextBtn').parentElement.classList.add('disabled');
    } else {
        document.getElementById('nextBtn').parentElement.classList.remove('disabled');
    }
}


function generatePage() {
    let prevBtn = `<li class="page-item"><a class="page-link" id="prevBtn" onclick="prevBtn()" href="javascript:void(0)">Previous</a></li>`;
    let nextBtn = `<li class="page-item"><a class="page-link" id="nextBtn" onclick="nextBtn()" href="javascript:void(0)">Next</a><li>`;

    let buttons = '';
    let activeClass = '';
    for (let i = 1; i <= total_page; i++) {
        if (i == 1) {
            activeClass = 'active';
        } else {
            activeClass = '';
        }

        buttons += `<li class="page-item dynamic-item ${activeClass}" id="page${i}"><a class="page-link" onclick="page(${i})" href="javascript:void(0)">${i}</a></li>`;
    }
    document.getElementById('pagination').innerHTML = `${prevBtn} ${buttons} ${nextBtn} `;
}



function prevBtn() {
    page_number--;
    // DisplayRecords();
}

function nextBtn() {
    page_number++;
    // DisplayRecords();
}


function page(index) {
    page_number = parseInt(index);
    // DisplayRecords();

}




function fetchUsers() {
    fetch(`${BASE_URL}/getalldatatodo/`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (Array.isArray(data)) {
            getData = data;
            showInfo(getData);
        } else {
            console.log(data);
        }
    })
    .catch(error => console.error('Error fetching users:', error));
}




// Call fetchUsers to initiate the fetching process
fetchUsers();


 
// Function to delete user by ID using Django API
function deleteUser(userId) {
    fetch(`/deletealldatabyidtodo/${userId}/`, {
        method: 'DELETE'
    })
    .then(response => {
        // Handle response, maybe refresh the table after deletion
        fetchUsers(); // Refresh the table after deletion
    })
    .catch(error => console.error('Error deleting user:', error));
}


// Function to edit user by ID using Django API
function editUser(userId) {
    fetch(`/getalldatabyidtodo/${userId}/`) // Fetch user data by ID from Django API
    .then(response => response.json())
    .then(user => {
        // Populate the modal form with user data for editing
        editInfo(user);
    })
    .catch(error => console.error('Error fetching user:', error));
}


// Function to update user data using Django API
function updateUser(userId, userData) {
    fetch(`/updatealldatabyidtodo/${userId}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        // Handle response, maybe refresh the table after update
        fetchUsers(); // Refresh the table after update
    })
    .catch(error => console.error('Error updating user:', error));
}





