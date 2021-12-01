// Employee
$(document).ready(function() {
    // loadData()

    getGender();

    $('.btn-add-user').click(function() {
        $('.form__option').removeClass('close');
        document.querySelector('.m-popup-header-title--add-uer').innerHTML = 'Thêm mới nhân viên';
        document.querySelector('.btn-add-user-form').innerText = 'Thêm';
    })

    $('.m-popup-header-close--add-user').click(function() {
        var input = $('.form__general-container--contact-text-add-user');
        $('.form__option').addClass('close');
        for (const inp of input) {
            inp.value = null;
        }
        $('.search-select-label-column-list').hide();
    })

    $('.btn-cancel-add-user').click(function() {
        var input = $('.form__general-container--contact-text-add-user');
        $('.form__option').addClass('close');
        for (const inp of input) {
            inp.value = null;
        }
        $('.search-select-label-column-list').hide();
    })
})


// gender
function getGender() {
    var genders = $('.search-select-label-column-list-item-link');

    
    $('.search-select-label-icon').click(function() {
        $('.search-select-label-column-list').toggle();
    })

    for (const gend of genders) {
        gend.addEventListener('click', function() {
            var data = document.querySelector('.search-select-label-text--gender');
            data.innerText = gend.innerText;
            $('.search-select-label-column-list').hide();
        })
    }

    $('.btn-cancel-add-user').click(function() {
        $('.search-select-label-column-list').hide();
    })

    $('.m-popup-header-close--add-user').click(function() {
        $('.search-select-label-column-list').hide();
    })
}



// load data in API
var postAPI = "http://cukcuk.manhnv.net/api/v1/Employees";

var formMode = null;

function start() {
    getEmployees(renderEmployees);

    handleCreateEmployee();

}
start();

function getEmployees(callback) {
    fetch(postAPI)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
};

function createEmployee(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    }
    fetch(postAPI, options)
        .then(function(response){
            response.json();
        })
        .then(callback);
}

function updateEmployee(employeeId, formData, callback){
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(formData)
    }
    fetch(postAPI  + '/' + employeeId, options)
        .then(function(response){
            response.json();
        })
        .then(callback);
}



function renderEmployees(employees) {
    var bodyTable = $(".content-container-body");

    bodyTable.empty();
    var htmls = employees.map(function (emp) {
        var dateOfBirth = new Date(emp.DateOfBirth);
        var day = dateOfBirth.getDate();
        var month = dateOfBirth.getMonth() + 1;
        var year = dateOfBirth.getFullYear();
        day = (day < 10 ?`0${day}` : day);
        month = (month < 10 ?`0${month}` : month);
        dateOfBirth = `${day}/${month}/${year}`;

        var salary = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(emp.Salary)

        return `<tr class="table-body-row" id="${emp.EmployeeId}">
        <td class="table-col">${emp.EmployeeCode}</td>
        <td class="table-col">${emp.FullName}</td>
        <td class="table-col">${emp.GenderName}</td>
        <td class="table-col">${dateOfBirth}</td>
        <td class="table-col">${emp.PhoneNumber}</td>
        <td class="table-col">${emp.Email}</td>
        <td class="table-col">${emp.PositionName}</td>
        <td class="table-col">${emp.DepartmentName}</td>
        <td class="table-col">${salary}</td>
        <td class="table-col">${emp.MartialStatusName}</td>
        </ tr>`;

    });
    // console.log(htmls.employeeId);
    var html = htmls.join('');
    bodyTable.append(html);
};

function handleCreateEmployee() {
    var empGender = document.querySelector('.search-select-label-text--gender');
    var input = $('.form__general-container--contact-text-add-user');

    $('.btn-add-user-form').click(function() {
        var formData = {
            EmployeeCode: input[0].value,
            FullName: input[1].value,
            GenderName: empGender.innerText,
            DateOfBirth: input[2].value,
            PhoneNumber: input[3].value,
            Email: input[4].value,
            PositionName: input[5].value,
            DepartmentName: input[6].value,
            Salary: input[7].value,
            MartialStatusName: input[8].value,
        }

        createEmployee(formData, function() {
            getEmployees(renderEmployees);
        });

        for (const inp of input) {
           inp.value = null;
        }
    })
}



$('.content-container-body').on('dblclick','.table-body-row', function() {
    var employeeId = $(this).attr('id');
    handleUpdateEmployee(employeeId);
})



function handleUpdateEmployee(employeeId) {
    var empGender = document.querySelector('.search-select-label-text--gender');
    var input = $('.form__general-container--contact-text-add-user');
    var tableCols = $('#' + employeeId + ' td');

    $('.form__option').removeClass('close');

    input[0].value = tableCols[0].innerText;
    input[1].value = tableCols[1].innerText;
    empGender.innerText = tableCols[2].innerText;
    input[2].value = tableCols[3].innerText;
    input[3].value = tableCols[4].innerText;
    input[4].value = tableCols[5].innerText;
    input[5].value = tableCols[6].innerText;
    input[6].value = tableCols[7].innerText;
    input[7].value = tableCols[8].innerText;
    input[8].value = tableCols[9].innerText;

    document.querySelector('.m-popup-header-title--add-uer').innerHTML = 'Sửa thông tin nhân viên';
    document.querySelector('.btn-add-user-form').innerText = 'Update';

    $('.btn-add-user-form').click(function() {
        var formData = {
            EmployeeCode: input[0].value,
            FullName: input[1].value,
            GenderName: empGender.innerText,
            DateOfBirth: input[2].value,
            PhoneNumber: input[3].value,
            Email: input[4].value,
            PositionName: input[5].value,
            DepartmentName: input[6].value,
            Salary: input[7].value,
            MartialStatusName: input[8].value,
        }


        updateEmployee(employeeId, formData, function(){
            getEmployees(renderEmployees);
        })

        for (const inp of input) {
            inp.value = null;
         }

        document.querySelector('.m-popup-header-title--add-uer').innerHTML = 'Thêm mới nhân viên';
        document.querySelector('.btn-add-user-form').innerText = 'Thêm';
    })

    
}















// add data
// function addDataUser() {
//     var empGender = document.querySelector('.search-select-label-text--gender');
//     var input = $('.form__general-container--contact-text-add-user');


//     // add user profile
//     $('.btn-add-user-form').click(function() {
//         var bodyTable = $(".content-container-body");
//         input[0].value == '' ? input[0].value = 'null' : input[0].value;

//         var rowHTML = ` <tr class="table-body-row">
//         input[0].value}
//         input[1].value}
//         empGender.innerText}
//         input[2].value}
//         input[3].value}
//         input[4].value}
//         input[5].value}
//         input[6].value}
//         input[7].value}
//         input[8].value}
//         </tr>`;

//         bodyTable.append(rowHTML);

//         for (const inp of input) {
//            inp.value = null;
//         } 
//     });
// }
// addDataUser();






// fetch(postAPI)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (employees) {
//         var bodyTable = $(".content-container-body");

//         bodyTable.empty();
//         var htmls = employees.map(function (emp) {
//             var dateOfBirth = new Date(emp.DateOfBirth);
//             var day = dateOfBirth.getDate();
//             var month = dateOfBirth.getMonth() + 1;
//             var year = dateOfBirth.getFullYear();
//             day = (day < 10 ?`0${day}` : day);
//             month = (month < 10 ?`0${month}` : month);
//             dateOfBirth = `${day}/${month}/${year}`;

//             var salary = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(emp.Salary)


//             return ` <tr class="table-body-row">
//             emp.EmployeeCode}
//             emp.FullName}
//             emp.GenderName}
//             dateOfBirth}
//             emp.PhoneNumber}
//             emp.Email}
//             emp.PositionName}
//             emp.DepartmentName}
//             salary}
//             emp.MartialStatusName}
//             </ tr>`;
//         });

//         var html = htmls.join('');
//         bodyTable.append(html);
//     })
//     .catch(function (error) {
//         alert('Co loi!');
//     })






// Load data
// function loadData() {
    
//     // lấy dữ liệu về
//     var data = employees;
//     var bodyTable = $(".content-container-body");
    
//     // làm trống dữ liệu
//     bodyTable.empty();

//     // xử lý dữ liệu

//     // buil dữ liệu lên table

//     // mapping thông tin của từng đối tượng trong mảng vào chuỗi tr
//     for (const emp of data) {
//         var dateOfBirth = new Date(emp.DateOfBirth);
//         var day = dateOfBirth.getDate();
//         var month = dateOfBirth.getMonth() + 1;
//         var year = dateOfBirth.getFullYear();
//         day = (day < 10 ?`0${day}` : day);
//         month = (month < 10 ?`0${month}` : month);
//         dateOfBirth = `${day}/${month}/${year}`;
        
//         var salary = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(emp.Salary)

//         var rowHTML = ` <tr class="table-body-row">
//         emp.EmployeeCode}
//         emp.FullName}
//         emp.GenderName}
//         dateOfBirth}
//         emp.PhoneNumber}
//         emp.Email}
//         emp.PositionName}
//         emp.DepartmentName}
//         salary}
//         emp.WorkStatus}
//         </tr>`;
                   
//         bodyTable.append(rowHTML);
//     }

// }






// var employees = [
//     {
//         "EmployeeCode": "NV879489",
//         "FullName": "Trương Việt Hoàng 1",
//         "GenderName": "Nam",
//         "DateOfBirth": "2021-11-02T11:31:53",
//         "PhoneNumber": "0979493297",
//         "Email": "tvhoang25022000@gmail.com",
//         "PositionName": "Leader",
//         "DepartmentName": "Phòng Nhân sự",
//         "Salary": 2000000,
//         "WorkStatus": "Nhân viên mới",
//     },
//     {
//         "EmployeeCode": "NV879489",
//         "FullName": "Trương Việt Hoàng 2",
//         "GenderName": "Nam",
//         "DateOfBirth": "2021-11-02T11:31:53",
//         "PhoneNumber": "0979493297",
//         "Email": "tvhoang25022000@gmail.com",
//         "PositionName": "Leader",
//         "DepartmentName": "Phòng Nhân sự",
//         "Salary": 3000000,
//         "WorkStatus": "Nhân viên mới",
//     },
//     {
//         "EmployeeCode": "NV879489",
//         "FullName": "Trương Việt Hoàng 3",
//         "GenderName": "Nam",
//         "DateOfBirth": "2021-11-02T11:31:53",
//         "PhoneNumber": "0979493297",
//         "Email": "tvhoang25022000@gmail.com",
//         "PositionName": "Leader",
//         "DepartmentName": "Phòng Nhân sự",
//         "Salary": 4000000,
//         "WorkStatus": "Nhân viên mới",
//     }
// ];













