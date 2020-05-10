$(document).ready(function () {
  Object.create(new App()).build()
  .then((obj) => {
    setAdminPagedata(obj.USERLIST, obj.TEAMLIST);
  })
  .catch((err) => {
    console.log(err);
  });
});

// Set admin data on page
let setAdminPagedata = (usersList, teamsList) => {
  $("#totalEmployees").html(usersList.length - 1); // Set total number of employees
  $("#totalTeams").html(teamsList.length); // Set total number of teams
  usersList.forEach((user) => { // Set team leads list
    if (user.LVLOFACCESS == "94d7b41571da4cccb3d0cb11cc620d69") {
      $("#teamLeadListDashboard").append(`
          <div class="media mb-3">
          <div class="e-avatar avatar-online mr-3">
          <img src="${user.PROFILEPIC}" class="img-fluid">
          </div>
          <div class="media-body">
          <h4 class="m-0">${user.FIRSTNAME + " " + user.LASTNAME}</h4>
          </div>
          </div>
          <hr>
        `);
    }
  });
};
