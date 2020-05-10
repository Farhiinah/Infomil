let userList = null;
let profilePic = null;
let fext = null;
let accessList = null;
let teamMemberData = null;
let teamList = null;

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
  $("#newTeam").submit(function (e) {
    e.preventDefault();
    let teamMembersFinal = "";
    if (teamMemberData.length > 0) {
      teamMemberData.forEach(function (member, index) {
        teamMembersFinal += member.id;
        if (index != teamMemberData.length - 1) {
          teamMembersFinal += ";";
        }
      });
    }
    let teamData = {
      TEAMNAME: capitalize($("#teamName").val().trim()),
      TEAMLEAD: $("#teamLeadList").children("option:selected").val(),
      TEAMMEMBERS: teamMembersFinal,
    };
    if (
      teamData.TEAMNAME != "" &&
      teamData.TEAMLEAD != "" &&
      teamData.TEAMMEMBERS != ""
    ) {
      e.preventDefault();
      makeAjaxReq("Employees.aspx/CreateTeam", JSON.stringify(teamData))
        .then((response) => {
          console.log(response);
          if (response.d == "OK") {
            $("#newTeamsPopup").modal("hide");
            setEmployeePagedata();
            $.notify("Team created", "success");
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
  if (firstName != "" && lastName != "") {
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
    $("#totalEmployees").html(userList.length - 1); // Set total number of employees
    if (userList.length > 1) {
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
      $("#employeeCardList").html(
        `<div style="width: 80%; margin: 0 auto;"><p style="text-align: center;">No employee to display.</p></div>`
      );
    }
  });

  $("#teamsCardList").html("");
  makeAjaxReq("Employees.aspx/GetTeamlist", null).then((response) => {
    teamList = response.d;
    $("#totalTeams").html(teamList.length); // Set total number of teams
    if (teamList.length > 0) {
      teamList.forEach((team) => {
        let currentTeamLead =
          userList.find((user) => {
            return user.ID == team.LEAD;
          }).FIRSTNAME +
          " " +
          userList.find((user) => {
            return user.ID == team.LEAD;
          }).LASTNAME;
        let currentTeamMembers = [];
        team.MEMBERS.split(";").forEach(function (member) {
          currentTeamMembers.push(
            userList.find((user) => {
              return user.ID == member;
            }).FIRSTNAME +
              " " +
              userList.find((user) => {
                return user.ID == member;
              }).LASTNAME
          );
        });
        $("#teamsCardList").append(`
            <div class="col-md-6 col-lg-6 col-xl-4">
            <div class="ctm-border-radius shadow-sm grow card">
            <div class="card-header">
            <h2 class="page-sub-title d-inline-block mb-0 mt-2">${
              team.NAME
            }</h2>
            <div class="team-action-icon float-right">
            <span data-toggle="modal" data-target="#edit">
            <a href="javascript:void(0)" class="btn btn-theme text-white" title="Edit" style="font-size: 1em; border-radius: 100%; width: 35px; height: 35px;"><i class="fa fa-pencil"></i></a>
            </span>
            <span data-toggle="modal" data-target="#delete">
            <a href="javascript:void(0)" class="btn btn-theme text-white" title="Delete" style="font-size: 1em; border-radius: 100%; width: 35px; height: 35px;"><i class="fa fa-trash"></i></a>
            </span>
            </div>
            </div>
            <div class="card-body">
            <div style="margin: 10px; color: rgba(0,0,0,0.5); border-bottom: 1px solid rgba(0,0,0,0.1)">
            ${currentTeamMembers.toString().replace(/[,]/g, "<br/>")}
            </div>
            <br/>
            <b>${currentTeamLead}</b>
            </div>
            </div>
            </div>
          `);
      });
    } else {
      $("#teamsCardList").html(
        `<div style="width: 80%; margin: 0 auto;"><p style="text-align: center;">No team to display.</p></div>`
      );
    }
  });
};

let loadAccessLevels = () => {
  makeAjaxReq("Access_Manager.aspx/GetAccesslist", null).then((response) => {
    accessList = response.d;
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

let initTeams = () => {
  // init new team form
  if (userList != null && userList.length > 0) {
    $("#teamLeadList").html("");
    teamMemberData = [];
    userList.forEach(function (user) {
      let currentUserAccess = accessList.find((accessLvl) => {
        return accessLvl.ID == user.LVLOFACCESS;
      }).NAME;

      // fill team lead list
      if (currentUserAccess == "Team lead" && user.ACTIVE) {
        $("#teamLeadList").append(`
        <option value="${user.ID}">${
          user.FIRSTNAME + " " + user.LASTNAME
        }</option>
      `);
      }

      // fill user list
      if (
        currentUserAccess != "Team lead" &&
        currentUserAccess != "Admin" &&
        currentUserAccess != "Manager" &&
        user.ACTIVE
      ) {
        teamMemberData.push({
          id: user.ID,
          text: user.FIRSTNAME + " " + user.LASTNAME,
        });
      }
    });
    if (teamMemberData.length == 0) {
      $("#employeeList").html("");
    }
    $("#employeeList").select2({
      data: teamMemberData,
      placeholder: "",
      allowClear: true,
      minimumResultsForSearch: 5,
    });
  }
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

let changeTab = (tab) => {
  $(".tabItem").each(function () {
    if ($(this).find("a").html() == tab) {
      $(this).find("a").removeClass("text-dark").addClass("text-white");
      $(this).addClass("active");
    } else {
      $(this).find("a").removeClass("text-white").addClass("text-dark");
      $(this).removeClass("active");
    }
  });
  if (tab == "All employees") {
    $("#allEmp").show("slow");
    $("#allTeams").hide("fast");
  }
  if (tab == "Teams") {
    initTeams();
    $("#allTeams").show("slow");
    $("#allEmp").hide("fast");
  }
};
