class EmployeeManager {
  constructor(currentUser, userList, accessList, teamList) {
    this.CURRENTUSER = currentUser;
    this.USERLIST = userList;
    this.ACCESSLIST = accessList;
    this.TEAMLIST = teamList;
  }
  buildEmployeeList() {
    let employees = [];
    if (this.USERLIST.length > 0 && this.ACCESSLIST.length > 0) {
      this.USERLIST.forEach((user) => {
        let currentUserAccess = user.LVLOFACCESS.NAME;
        if (user.EMAIL != this.CURRENTUSER.EMAIL) {
          user.ACTIVE = user.ACTIVE == "true";
          employees.push(`
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
              this.USERLIST.length > 1
                ? `<div class="btn-group col-xs-1 text-center" role="group" aria-label="Basic example" style="width: 100%; top: 10px; font-size: 1em; margin-bottom: 5px;">
            <button type="button" class="btn btn-danger" onclick="new EmployeeManager().userOp('delete', '${
              user.ID
            }')">Delete</button>
            ${
              user.ACTIVE
                ? `<button type="button" class="btn btn-warning" onclick="new EmployeeManager().userOp('deactivate', '${user.ID}')">Deactivate</button>`
                : `<button type="button" class="btn btn-success" onclick="new EmployeeManager().userOp('activate', '${user.ID}')">Activate</button>`
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
    }
    return employees;
  }
  buildTeamList() {
    let teams = [];
    if (this.TEAMLIST.length > 0) {
      this.TEAMLIST.forEach((team) => {
        let teamMemberlist = "";
        team.MEMBERS.forEach((member) => {
          teamMemberlist += member.FIRSTNAME + " " + member.LASTNAME + "<br/>";
        });
        teams.push(`
          <div class="col-md-6 col-lg-6 col-xl-4">
          <div class="ctm-border-radius shadow-sm grow card">
          <div class="card-header">
          <h2 class="page-sub-title d-inline-block mb-0 mt-2">${team.NAME}</h2>
          <div class="team-action-icon float-right">
          <span  onclick="new EmployeeManager().teamOp('delete', '${team.ID}')">
          <a href="javascript:void(0)" class="btn btn-theme text-white" title="Delete" style="font-size: 1em; border-radius: 100%; width: 35px; height: 35px;"><i class="fa fa-trash"></i></a>
          </span>
          </div>
          </div>
          <div class="card-body">
          <div style="margin: 10px; color: rgba(0,0,0,0.5); border-bottom: 1px solid rgba(0,0,0,0.1)">
          ${teamMemberlist}
          </div>
          <br/>
          Team lead: ${team.LEAD.FIRSTNAME + " " + team.LEAD.LASTNAME} <br/>
          Team manager: ${team.TEAMMANAGER.FIRSTNAME + " " + team.TEAMMANAGER.LASTNAME}
          </div>
          </div>
          </div>
        `);
      });
    }
    return teams;
  }
  buildNewEmployeeForm() {
    return {
      accessLvlDropdown: this._buildEmployeeFormFx.buildAccessLevelDropdown(),
    };
  }
  _buildEmployeeFormFx = {
    buildAccessLevelDropdown: () => {
      let accessDropdown = [];
      if (this.ACCESSLIST.length > 0) {
        this.ACCESSLIST.forEach((access) => {
          accessDropdown.push(
            `<option value="${access.ID}">${access.NAME}</option>`
          );
        });
      }
      return accessDropdown;
    },
  };
  buildNewTeamForm() {
    return {
      teamLeadDropdown: this._buildTeamFormFx.buildTeamLeadDropdown(),
      teamMemberDropdown: this._buildTeamFormFx.buildMemberDropdown(),
      teamManagerDropdown: this._buildTeamFormFx.buildManagerDropdown(),
    };
  }
  _buildTeamFormFx = {
    buildTeamLeadDropdown: () => {
      let teamLeadData = [];
      this.USERLIST.forEach((user) => {
        let currentUserAccess = user.LVLOFACCESS.NAME;
        if (currentUserAccess == "Team lead" && user.ACTIVE) {
          teamLeadData.push(`
            <option value="${user.ID}">${
            user.FIRSTNAME + " " + user.LASTNAME
          }</option>
          `);
        }
      });
      return teamLeadData;
    },
    buildManagerDropdown: () => {
      let managerData = [];
      this.USERLIST.forEach((user) => {
        let currentUserAccess = user.LVLOFACCESS.NAME;
        if (currentUserAccess == "Manager" && user.ACTIVE) {
          managerData.push(`
            <option value="${user.ID}">${
            user.FIRSTNAME + " " + user.LASTNAME
          }</option>
          `);
        }
      });
      return managerData;
    },
    buildMemberDropdown: () => {
      let teamMemberData = [];
      this.USERLIST.forEach((user) => {
        let currentUserAccess = user.LVLOFACCESS.NAME;
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
      return teamMemberData;
    },
  };
  userOp(mod, uid) {
    switch (mod) {
      case "delete":
        this._utilFx
          .confirm("Are you sure you want to delete this user?", "Delete user")
          .then((choice) => {
            if (choice) {
              this._utilFx
                .serverRequest("DelUser", `{ID: '${uid}'}`)
                .then((result) => {
                  if (result.status == 200) {
                    $.notify("User " + mod + "d.", "success");
                    employeeLoadData();
                  } else {
                    $.notify("An error occured: " + result.message, "error");
                  }
                })
                .catch((err) => {
                  $.notify(err.message, "error");
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case "deactivate":
        this._utilFx
          .confirm(
            "Are you sure you want to deactivate this user?",
            "Deactivate user"
          )
          .then((choice) => {
            if (choice) {
              this._utilFx
                .serverRequest("DeactivateUser", `{ID: '${uid}'}`)
                .then((result) => {
                  if (result.status == 200) {
                    $.notify("User " + mod + "d.", "success");
                    employeeLoadData();
                  } else {
                    $.notify("An error occured: " + result.message, "error");
                  }
                })
                .catch((err) => {
                  $.notify(err.message, "error");
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case "activate":
        this._utilFx
          .serverRequest("ActivateUser", `{ID: '${uid}'}`)
          .then((result) => {
            if (result.status == 200) {
              $.notify("User " + mod + "d.", "success");
              employeeLoadData();
            } else {
              $.notify("An error occured: " + result.message, "error");
            }
          })
          .catch((err) => {
            $.notify(err.message, "error");
          });
        break;
      case "create":
        this._userOpfx
          .createUser()
          .then((result) => {
            if (result.status == 200) {
              $.notify("User " + mod + "d.", "success");
              employeeLoadData();
            } else {
              $.notify("An error occured: " + result.message, "error");
            }
            $(newEmpoyeeModalContainer).modal("hide");
            $(formName_NewUser).trigger("reset");
          })
          .catch((err) => {
            $.notify(err.message, "error");
          });
        break;
    }
  }
  _userOpfx = {
    createUser: () => {
      let userData = {
        FIRSTNAME: capitalize($(formInput_FistnameContainer).val().trim()),
        LASTNAME: capitalize($(formInput_LastnameContainer).val().trim()),
        USERNAME: $(formInput_UsernameContainer).val(),
        EMAILADDRESS: $(formInput_EmailContainer).val().trim().toLowerCase(),
        INITIALS:
          $(formInput_FistnameContainer)
            .val()
            .trim()
            .substring(0, 1)
            .toLowerCase() +
          $(formInput_LastnameContainer)
            .val()
            .trim()
            .substring(0, 1)
            .toLowerCase(),
        PASSWORD: $(formInput_PasswordContainer).val(),
        LVLOFACCESS: $(formInput_AccessLevelDropdownContainer)
          .children("option:selected")
          .val(),
        PROFILEPIC: formData.image,
        fileExtension: formData.extension,
        SICKLEAVE: $(formInput_SickLeaveContainer).val(),
        LOCALLEAVE: $(formInput_LocalLeaveContainer).val(),
        ANNUALLEAVE: $(formInput_AnnualLeaveContainer).val(),
      };
      return this._utilFx.serverRequest("CreateUser", JSON.stringify(userData));
    },
  };
  teamOp(mod, uid) {
    switch (mod) {
      case "create":
        this._teamOpfx
          .createTeam()
          .then((result) => {
            if (result.status == 200) {
              $.notify("Team " + mod + "d.", "success");
              employeeLoadData();
            } else {
              $.notify("An error occured: " + result.message, "error");
            }
            $(newTeamModalContainer).modal("hide");
            $(formName_NewTeam).trigger("reset");
          })
          .catch((err) => {
            $.notify(err.message, "error");
          });
        break;
      case "delete":
        this._utilFx
          .confirm(
            "Are you sure you want to delete this team?",
            "Delete team"
          )
          .then((choice) => {
            if (choice) {
              this._utilFx
                .serverRequest("DeleteTeam", `{ID: '${uid}'}`)
                .then((result) => {
                  if (result.status == 200) {
                    $.notify("Team " + mod + "d.", "success");
                    employeeLoadData();
                  } else {
                    $.notify("An error occured: " + result.message, "error");
                  }
                })
                .catch((err) => {
                  $.notify(err.message, "error");
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });
        break;
    }
  }
  _teamOpfx = {
    createTeam: () => {
      let teamMemberData = $("#employeeList").select2('data');
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
        TEAMNAME: capitalize($(formInput_TeamName).val().trim()),
        TEAMLEAD: $(formInput_TeamLeadListContainer)
          .children("option:selected")
          .val(),
        TEAMMANAGER: $(formInput_TeamManagerListContainer)
          .children("option:selected")
          .val(),
        TEAMMEMBERS: teamMembersFinal,
      };
      console.log(teamData);
      return this._utilFx.serverRequest("CreateTeam", JSON.stringify(teamData));
    },
  };

  _utilFx = {
    confirm: (message, title) => {
      return new Promise((resolve, reject) => {
        bootpopup.confirm(message, title, function (ans) {
          if (ans) {
            resolve(true);
          } else {
            reject(false);
          }
        });
      });
    },
    serverRequest: (action, data) => {
      return new Promise((resolve, reject) => {
        makeAjaxReq("Employees.aspx/" + action, data).then((response) => {
          if (response.d == "OK") {
            resolve({ status: 200, message: "OK" });
          } else {
            reject({ status: 500, message: "Server error: " + response.d });
          }
        });
      });
    },
  };
}
