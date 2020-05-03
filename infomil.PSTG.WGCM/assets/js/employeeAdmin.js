let userList = null;
let profilePic = null;
let fext = null;
$(document).ready(function () {
  loadAccessLevels();
  setEmployeePagedata();
  $("#fname").on("blur", function () {
    generateUsername();
  });
  $("#lname").on("blur", function () {
    generateUsername();
  });
  $("#newUser").submit(function (e) {
    let userData = {
      FIRSTNAME: capitalize($("#fname").val().trim()),
      LASTNAME: capitalize($("#lname").val().trim()),
      USERNAME: $("#uname").val(),
      EMAILADDRESS: $("#emailAdd").val().trim().toLowerCase(),
      INITIALS:
        $("#fname").val().trim().substring(0, 1).toLowerCase() +
        $("#lname").val().trim().substring(0, 1).toLowerCase(),
      PASSWORD: $("#password").val(),
      LVLOFACCESS: $("#lvlAccessList").children("option:selected").val(),
      PROFILEPIC: profilePic,
      fileExtension: fext,
    };
    console.log(userData.FIRSTNAME + " " + userData.LASTNAME);
    if (
      userData.FIRSTNAME != "" &&
      userData.LASTNAME != "" &&
      userData.USERNAME != "" &&
      userData.EMAILADDRESS != "" &&
      userData.PASSWORD != ""
    ) {
      e.preventDefault();
      makeAjaxReq("Employees.aspx/CreateUser", JSON.stringify(userData))
        .then((response) => {
          if (response.d == "OK") {
            $("#newEmpPopup").modal("hide");
            setEmployeePagedata();
            $.notify("User created", "success");
          } else {
            $.notify(response.d, "error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});

let saveProfPic = (input) => {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      fext = e.target.result.split(";")[0].split("/")[1];
      profilePic = e.target.result.split(",")[1];
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    fext = null;
    profilePic = null;
  }
};

let generateUsername = () => {
  let firstName = $("#fname").val().trim();
  let lastName = $("#lname").val().trim();
  if (firstName != "" && lastName != "" && $("#uname").val().trim() == "") {
    $("#uname").val(
      firstName.toLowerCase().substring(0, 1) +
        lastName.toLowerCase().substring(0, 1) +
        Math.floor(100000 + Math.random() * 900000)
    );
  }
};

// Set employee data on page
let setEmployeePagedata = () => {
  $("#employeeCardList").html("");
  makeAjaxReq("Employees.aspx/GetUserList", null).then((response) => {
    userList = response.d;
    let accessList = JSON.parse(localStorage.getItem("accessList"));
    if (userList.length > 0) {
      $("#totalEmployees").html(userList.length); // Set total number of employees
      userList.forEach((user) => {
        let currentUserAccess = accessList.find((accessLvl) => {
          return accessLvl.ID == user.LVLOFACCESS;
        }).NAME;
        if (
          user.EMAIL != JSON.parse(localStorage.getItem("CurrentUser")).EMAIL
        ) {
          user.ACTIVE = user.ACTIVE == "true";
          $("#employeeCardList").append(`
            <div class="col-md-6 col-lg-6 col-xl-4">
            <div class="card widget-profile">
              <div class="card-body">
                <div class="pro-widget-content text-center">
                  <div class="profile-info-widget">
                    <a href="#" class="booking-doc-img">
                      <img src="${user.PROFILEPIC}" alt="User Image"></a>
                      <div class="profile-det-info">
                        <h4>${user.FIRSTNAME + " " + user.LASTNAME}</h4>
                        <div>
                          <p class="mb-0">
                            <b>${currentUserAccess}</b>
                          </p>
                          <p class="mb-0 ctm-text-sm">${user.EMAIL}</p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              ${
                userList.length > 1
                  ? `<div class="btn-group col-xs-1 text-center" role="group" aria-label="Basic example" style="width: 100%; top: 10px; font-size: 1em; margin-bottom: 5px;">
              <button type="button" class="btn btn-danger" onclick="deleteUser('${
                user.ID
              }')">Delete</button>
              ${
                user.ACTIVE
                  ? `<button type="button" class="btn btn-warning" onclick="deactivateUser('${user.ID}')">Deactivate</button>`
                  : `<button type="button" class="btn btn-success" onclick="activateUser('${user.ID}')">Activate</button>`
              }
              </div>`
                  : ""
              }
              </div>
            </div>
          </div>
              `);
        }
      });
    } else {
      $("#employeeCardList").append(
        `<div style="width: 80%; margin: 0 auto;"><p style="text-align: center;">No employee to display.</p></div>`
      );
    }
  });
};

let loadAccessLevels = () => {
  makeAjaxReq("Access_Manager.aspx/GetAccesslist", null).then((response) => {
    let accessList = response.d;
    localStorage.setItem("accessList", JSON.stringify(accessList));
    if (accessList.length > 0) {
      $("#lvlAccessList").html("");
      accessList.forEach((access) => {
        $("#lvlAccessList").append(
          `<option value="${access.ID}">${access.NAME}</option>`
        );
      });
    } else {
      $("#lvlAccessList").attr("disabled");
      $("#lvlAccessList").append(
        `<option value="null">No access level available</option>`
      );
    }
  });
};

let deleteUser = (userId) => {
  bootpopup.confirm(
    "Are you sure you want to delete this user?",
    "Delete user",
    function (ans) {
      if (ans) {
        let data = `{ID: '${userId}'}`;
        makeAjaxReq("Employees.aspx/DelUser", data).then((response) => {
          if (response.d == "OK") {
            setEmployeePagedata();
            $.notify("User deleted.", "success");
          }
        });
      }
    }
  );
};

let deactivateUser = (userId) => {
  bootpopup.confirm(
    "Are you sure you want to deactivate this user?",
    "Deactivate user",
    function (ans) {
      if (ans) {
        let data = `{ID: '${userId}'}`;
        makeAjaxReq("Employees.aspx/DeactivateUser", data).then((response) => {
          if (response.d == "OK") {
            setEmployeePagedata();
            $.notify("User deactivated", "success");
          }
        });
      }
    }
  );
};

let activateUser = (userId) => {
  let data = `{ID: '${userId}'}`;
  makeAjaxReq("Employees.aspx/ActivateUser", data).then((response) => {
    if (response.d == "OK") {
      setEmployeePagedata();
      $.notify("User activated", "success");
    }
  });
};
