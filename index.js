// $(document).ready(function () {
//     function getIds() {
//         return {
//             empName: $('#formname'),
//             profileImg: $('.profile'),
//             empGender: $('.gender'),
//             salaryrange: $('#salary'),
//             salarytxt: $('#salarytxt'),
//             startday: $('#startday'),
//             startmonth: $('#startmonth'),
//             startyear: $('#startyear'),
//             notes: $('#notes'),
//             dept: $('.dept')
//         };
//     }

//     function resetForm() {
//         const ids = getIds();
//         ids.empName.val('');
//         ids.profileImg.prop('checked', false);
//         ids.empGender.prop('checked', false);
//         ids.salaryrange.val(4);
//         ids.salarytxt.val('');
//         ids.startday.val('');
//         ids.startmonth.val('');
//         ids.startyear.val('');
//         ids.notes.val('');
//         ids.dept.prop('checked', false);
//     }

//     $('#salary').on('input', function () {
//         $('#salarytxt').val($(this).val());
//     });

//     $('#submit-btn').on('click', function () {
//         const ids = getIds();
//         const employee = {
//             Name: ids.empName.val(),
//             empImg: ids.profileImg.filter(':checked').val(),
//             Gender: ids.empGender.filter(':checked').val(),
//             Dept: ids.dept.filter(':checked').map(function () { return this.value; }).get(),
//             Salary: ids.salaryrange.val(),
//             StartDate: `${ids.startday.val()} ${ids.startmonth.val()} ${ids.startyear.val()}`,
//             Notes: ids.notes.val()
//         };

//         let storedData = [];
//         if (localStorage.length) {
//             storedData = JSON.parse(localStorage.getItem("EmployeeData"));
//         }
//         storedData.push(employee);
//         localStorage.setItem("EmployeeData", JSON.stringify(storedData));

//         window.location.href = "/dashboard.html";
//     });

//     $('#reset-btn').on('click', function () {
//         resetForm();
//     });

//     $('#cancel-btn').on('click', function () {
//         window.location.href = "/dashboard.html";
//     });

//     // Populate form if editing
//     const editEmpData = localStorage.getItem("EditEmpData");
//     if (editEmpData) {
//         const employee = JSON.parse(editEmpData)[0];
//         const ids = getIds();
//         ids.empName.val(employee.Name);
//         ids.profileImg.filter(`[value="${employee.empImg}"]`).prop('checked', true);
//         ids.empGender.filter(`[value="${employee.Gender}"]`).prop('checked', true);
//         ids.salaryrange.val(employee.Salary);
//         ids.salarytxt.val(employee.Salary);
//         const [day, month, year] = employee.StartDate.split(' ');
//         ids.startday.val(day);
//         ids.startmonth.val(month);
//         ids.startyear.val(year);
//         ids.notes.val(employee.Notes);
//         ids.dept.each(function () {
//             $(this).prop('checked', employee.Dept.includes(this.value));
//         });
//         localStorage.removeItem("EditEmpData");
//     }
// });


$(document).ready(function () {
    function getIds() {
        return {
            empName: $('#formname'),
            profileImg: $('.profile'),
            empGender: $('.gender'),
            salaryrange: $('#salary'),
            salarytxt: $('#salarytxt'),
            startday: $('#startday'),
            startmonth: $('#startmonth'),
            startyear: $('#startyear'),
            notes: $('#notes'),
            dept: $('.dept')
        };
    }

    function resetForm() {
        const ids = getIds();
        ids.empName.val('');
        ids.profileImg.prop('checked', false);
        ids.empGender.prop('checked', false);
        ids.salaryrange.val(4);
        ids.salarytxt.val('');
        ids.startday.val('');
        ids.startmonth.val('');
        ids.startyear.val('');
        ids.notes.val('');
        ids.dept.prop('checked', false);
    }

    $('#salary').on('input', function () {
        $('#salarytxt').val($(this).val());
    });

    $('#submit-btn').on('click', function () {
        const ids = getIds();
        const employee = {
            Name: ids.empName.val(),
            empImg: ids.profileImg.filter(':checked').val(),
            Gender: ids.empGender.filter(':checked').val(),
            Dept: ids.dept.filter(':checked').map(function () { return this.value; }).get(),
            Salary: ids.salaryrange.val(),
            StartDate: `${ids.startday.val()} ${ids.startmonth.val()} ${ids.startyear.val()}`,
            Notes: ids.notes.val()
        };

        $.ajax({
            url: "http://localhost:3000/emp_data",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(employee),
            success: function () {
                window.location.href = "/dashboard.html";
            }
        });
    });

    $('#reset-btn').on('click', function () {
        resetForm();
    });

    $('#cancel-btn').on('click', function () {
        window.location.href = "/dashboard.html";
    });

    // Populate form if editing
    const editEmpData = localStorage.getItem("EditEmpData");
    if (editEmpData) {
        const employee = JSON.parse(editEmpData)[0];
        const ids = getIds();
        ids.empName.val(employee.Name);
        ids.profileImg.filter(`[value="${employee.empImg}"]`).prop('checked', true);
        ids.empGender.filter(`[value="${employee.Gender}"]`).prop('checked', true);
        ids.salaryrange.val(employee.Salary);
        ids.salarytxt.val(employee.Salary);
        const [day, month, year] = employee.StartDate.split(' ');
        ids.startday.val(day);
        ids.startmonth.val(month);
        ids.startyear.val(year);
        ids.notes.val(employee.Notes);
        ids.dept.each(function () {
            $(this).prop('checked', employee.Dept.includes(this.value));
        });
        localStorage.removeItem("EditEmpData");
    }
});
