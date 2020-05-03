$(document).ready(function () {
  setAdminPagedata();
});

// Set admin data on page
let setAdminPagedata = () => {
  makeAjaxReq("Employees.aspx/GetUserList", null).then(
    (response) => {
      $("#totalEmployees").html(response.d.length); // Set total number of employees
    });
};
