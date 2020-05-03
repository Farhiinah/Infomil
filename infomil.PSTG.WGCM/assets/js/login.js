$(document).ready(function () {
  $(".loginBtn").click(function () {
    let userData = {
      username: $("#uname").val(),
      password: $("#pswd").val(),
    };
    $("#errLbl").html("");
    $(".loginBtn").prop("disabled", true);
    let validateData = validateLoginData(userData);
    if (validateData.success) {
      makeAjaxReq("Login.aspx/GetUserList", null)
        .then((response) => {
          let users = response.d;
          let currentUser = null;
          if (
            (Array.isArray(users) || typeof users == "object") &&
            typeof users != "undefined"
          ) {
            if (users.length > 1) {
              currentUser = users.find(
                (user) =>
                  user.USERNAME == userData.username &&
                  user.PASSWORD == userData.password
              );
            } else {
              currentUser =
                users.USERNAME == userData.username &&
                users.PASSWORD == userData.password
                  ? users
                  : null;
            }
            if (currentUser != null && localStorage) {
              localStorage.setItem("CurrentUser", JSON.stringify(currentUser));
              window.location.href = "/Dashboard.aspx";
            } else {
              $(".loginBtn").prop("disabled", false);
              $("#errLbl").html("Incorrect username or password.");
            }
          } else {
            $(".loginBtn").prop("disabled", false);
            $("#errLbl").html("No user found.");
          }
        })
        .catch((err) => {
          $(".loginBtn").prop("disabled", false);
          console.log(err);
          $("#errLbl").html("An error occured, please contact IT support.");
        });
    } else {
      $(".loginBtn").prop("disabled", false);
      $("#errLbl").html(validateData.errLbl);
    }
  });
});

let validateLoginData = (userData) => {
  let validation = { success: false, errLbl: "" };
  if (userData.username.trim() != "") {
    if (userData.password.trim() != "") {
      validation.success = true;
    } else {
      validation.errLbl = "Password is required.";
    }
  } else {
    validation.errLbl = "Username is required.";
  }
  return validation;
};
