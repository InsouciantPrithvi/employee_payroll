// $(document).ready(function () {
//     const data = localStorage.getItem("EmployeeData");
//     const empData = JSON.parse(data);
//     displayTable(empData);

//     function displayTable(empData) {
//         const addbtn = $('#addbtn');
//         const empTable = $('#table-ctn');
//         const searchbtn = $('#searchbtn');
//         const searchTxt = $('#searchtxt');
//         let template = `<table>
//             <tr>
//                 <th>Name</th>
//                 <th>Gender</th>
//                 <th>Department</th>
//                 <th>Salary</th>
//                 <th>Start Date</th>
//                 <th>Actions</th>
//             </tr>`;

//         if (empData && empData.length > 0) {
//             searchbtn.on("click", function () {
//                 searchAction(empData, empTable);
//             });
//             empData.forEach(ele => {
//                 let depTemp = "";
//                 ele.Dept.forEach(dept => {
//                     depTemp += `<div class="dept-ctn">${dept}</div>`;
//                 });
//                 template += `<tr>
//                     <td><div class="profileImg"><img src="/assets/${ele.empImg}.png" alt="profileimg"><label>${ele.Name}</label></div></td>
//                     <td>${ele.Gender}</td>
//                     <td><div class="dept-outter">${depTemp}</div></td>
//                     <td>₹ ${ele.Salary} LPA</td>
//                     <td>${ele.StartDate}</td>
//                     <td><div class="action-btn"><img src="/assets/bin.png" alt="delete" width="20px" height="24px" onclick="deleteEmp('${ele.Name}')"> <img src="/assets/edit.png" alt="edit" width="20px" height="20px" onclick="editEmp('${ele.Name}')"></div></td>
//                 </tr>`;
//             });
//             template += `</table>`;
//             empTable.html(template);
//         } else {
//             empTable.html("<center><h1>No Data Found!</h1></center>");
//         }

//         addbtn.on("click", function () {
//             window.location.href = "/index.html";
//         });

//         searchTxt.on("search", function () {
//             location.reload();
//         });
//     }

//     window.deleteEmp = function (empName) {
//         const data = localStorage.getItem("EmployeeData");
//         const empData = JSON.parse(data);
//         const updatedData = empData.filter(ele => ele.Name !== empName);
//         if (updatedData.length) {
//             localStorage.setItem("EmployeeData", JSON.stringify(updatedData));
//         } else {
//             localStorage.removeItem("EmployeeData");
//         }
//         location.reload();
//     };

//     window.editEmp = function (empName) {
//         const data = localStorage.getItem("EmployeeData");
//         const empData = JSON.parse(data);
//         const editEmp = empData.filter(ele => ele.Name === empName);
//         localStorage.setItem("EditEmpData", JSON.stringify(editEmp));
//         window.location.href = "/index.html";
//     };

//     function searchAction(empData, empTable) {
//         const searchTxt = $('#searchtxt');
//         let template = `<table>
//             <tr>
//                 <th>Name</th>
//                 <th>Gender</th>
//                 <th>Department</th>
//                 <th>Salary</th>
//                 <th>Start Date</th>
//                 <th>Actions</th>
//             </tr>`;
//         const ele = empData.filter(e => e.Name === searchTxt.val());
//         if (ele.length > 0) {
//             ele.forEach(e => {
//                 let depTemp = "";
//                 e.Dept.forEach(dept => {
//                     depTemp += `<div class="dept-ctn">${dept}</div>`;
//                 });
//                 template += `<tr>
//                     <td><div class="profileImg"><img src="/assets/${e.empImg}.png" alt="profileimg"><label>${e.Name}</label></div></td>
//                     <td>${e.Gender}</td>
//                     <td><div class="dept-outter">${depTemp}</div></td>
//                     <td>₹ ${e.Salary} LPA</td>
//                     <td>${e.StartDate}</td>
//                     <td><div class="action-btn"><img src="/assets/bin.png" alt="delete" width="20px" height="24px" onclick="deleteEmp('${e.Name}')"> <img src="/assets/edit.png" alt="edit" width="20px" height="20px" onclick="editEmp('${e.Name}')"></div></td>
//                 </tr>`;
//             });
//             template += `</table>`;
//             empTable.html(template);
//         } else if (!searchTxt.val()) {
//             location.reload();
//         } else {
//             empTable.html("<center><h1>No Data Found!</h1></center>");
//         }
//     }
// });


$(document).ready(function () {
    $.ajax({
        url: "http://localhost:3000/emp_data",
        method: "GET",
        success: function (data) {
            displayTable(data);
        }
    });

    function displayTable(empData) {
        const addbtn = $('#addbtn');
        const empTable = $('#table-ctn');
        const searchbtn = $('#searchbtn');
        const searchTxt = $('#searchtxt');
        let template = `<table>
            <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Start Date</th>
                <th>Actions</th>
            </tr>`;

        if (empData && empData.length > 0) {
            searchbtn.on("click", function () {
                searchAction(empData, empTable);
            });
            empData.forEach(ele => {
                let depTemp = "";
                ele.Dept.forEach(dept => {
                    depTemp += `<div class="dept-ctn">${dept}</div>`;
                });
                template += `<tr>
                    <td><div class="profileImg"><img src="/assets/${ele.empImg}.png" alt="profileimg"><label>${ele.Name}</label></div></td>
                    <td>${ele.Gender}</td>
                    <td><div class="dept-outter">${depTemp}</div></td>
                    <td>₹ ${ele.Salary} LPA</td>
                    <td>${ele.StartDate}</td>
                    <td><div class="action-btn"><img src="/assets/bin.png" alt="delete" width="20px" height="24px" onclick="deleteEmp('${ele.id}')"> <img src="/assets/edit.png" alt="edit" width="20px" height="20px" onclick="editEmp('${ele.id}')"></div></td>
                </tr>`;
            });
            template += `</table>`;
            empTable.html(template);
        } else {
            empTable.html("<center><h1>No Data Found!</h1></center>");
        }

        addbtn.on("click", function () {
            window.location.href = "/index.html";
        });

        searchTxt.on("search", function () {
            location.reload();
        });
    }

    window.deleteEmp = function (id) {
        $.ajax({
            url: `http://localhost:3000/emp_data/${id}`,
            method: "DELETE",
            success: function () {
                location.reload();
            }
        });
    };

    window.editEmp = function (id) {
        $.ajax({
            url: `http://localhost:3000/emp_data/${id}`,
            method: "GET",
            success: function (data) {
                localStorage.setItem("EditEmpData", JSON.stringify([data]));
                window.location.href = "/index.html";
            }
        });
    };

    function searchAction(empData, empTable) {
        const searchTxt = $('#searchtxt');
        let template = `<table>
            <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Start Date</th>
                <th>Actions</th>
            </tr>`;
        const ele = empData.filter(e => e.Name === searchTxt.val());
        if (ele.length > 0) {
            ele.forEach(e => {
                let depTemp = "";
                e.Dept.forEach(dept => {
                    depTemp += `<div class="dept-ctn">${dept}</div>`;
                });
                template += `<tr>
                    <td><div class="profileImg"><img src="/assets/${e.empImg}.png" alt="profileimg"><label>${e.Name}</label></div></td>
                    <td>${e.Gender}</td>
                    <td><div class="dept-outter">${depTemp}</div></td>
                    <td>₹ ${e.Salary} LPA</td>
                    <td>${e.StartDate}</td>
                    <td><div class="action-btn"><img src="/assets/bin.png" alt="delete" width="20px" height="24px" onclick="deleteEmp('${e.id}')"> <img src="/assets/edit.png" alt="edit" width="20px" height="20px" onclick="editEmp('${e.id}')"></div></td>
                </tr>`;
            });
            template += `</table>`;
            empTable.html(template);
        } else if (!searchTxt.val()) {
            location.reload();
        } else {
            empTable.html("<center><h1>No Data Found!</h1></center>");
        }
    }
});
