class AccessManager {
  constructor(currentUser, userList, accessList, teamList) {
    this.CURRENTUSER = currentUser;
    this.USERLIST = userList;
    this.ACCESSLIST = accessList;
    this.TEAMLIST = teamList;
  }
  buildAccessList() {
    let accesslist = [];
    if (this.ACCESSLIST.length > 0) {
      this.ACCESSLIST.forEach((access, index) => {
        accesslist.push(`
            <div class="card">
            <div
            class="card-header collapsed""
            id="${access.NAME}"
            data-toggle="collapse"
            data-target="#accessLvlAccordion_${access.ID}"
            style="cursor: pointer;"
            >
            <span style="font-size: 1.3em;">
            ${access.NAME} 
            ${
              index > 4
                ? `<span style="float:right; color: #dc3545;" onclick="new AccessManager().accessLevelOp('delete', '${access.ID}')">
            <i class="fa fa-trash"></i>
            </span>`
                : ""
            }
            </span>
            </div>

            <div
            id="accessLvlAccordion_${access.ID}"
            class="collapse"
            aria-labelledby="${access.NAME}"
            data-parent="#AccessList"
            >
            <div class="card-body">
            <div class="container">
            <div class="row">
            <div class="col-sm">
            <label>
            <input type="checkbox" data-toggle="toggle" disabled ${
              access.MANAGEUSER == "true" ? "checked" : ""
            }>
            Manage users
            </label>
            </div>
            <div class="col-sm">
            <label>
            <input type="checkbox" data-toggle="toggle" disabled ${
              access.MANAGELEAVES == "true" ? "checked" : ""
            }>
            Manage leaves
            </label>
            </div>
            </div>
            <div class="row">
            <div class="col-sm">
            <label>
            <input type="checkbox" data-toggle="toggle" disabled ${
              access.MANAGEACCESS == "true" ? "checked" : ""
            }>
            Manage access
            </label>
            </div>
            <div class="col-sm">
            <label>
            <input type="checkbox" data-toggle="toggle" disabled ${
              access.VIEWREPORTS == "true" ? "checked" : ""
            }>
            View reports
            </label>
            </div>
            </div>
            <div class="row">
            <div class="col-sm">
            <label>
            <input type="checkbox" data-toggle="toggle" disabled ${
              access.ISAPPROVER == "true" ? "checked" : ""
            }>
            Approver
            </label>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
        `);
      });
    }
    return accesslist;
  }
  accessLevelOp(mod, uid) {
    switch (mod) {
      case "create":
          this._accessLevelOpFx.createAccessLevel()
          .then((result) => {
            if (result.status == 200) {
                $.notify("AccessLevel " + mod + "d.", "success");
                accessLoadData();
              } else {
                $.notify("An error occured: " + result.message, "error");
              }
              $(newAccessModalContainer).modal("hide");
              $(formName_NewAccess).trigger("reset");
          })
          .catch((err) => {
            $.notify(err.message, "error");
          });
        break;
         case "delete": 
         this._utilFx
          .confirm(
            "Are you sure you want to delete this access?",
            "Delete access"
          )
          .then((choice) => {
            if (choice) {
              this._utilFx
                .serverRequest("DelAccesslevel", `{ID: '${uid}'}`)
                .then((result) => {
                  if (result.status == 200) {
                    $.notify("AccessLevel " + mod + "d.", "success");
                    accessLoadData();
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
  _accessLevelOpFx = {
    createAccessLevel: () => {
      let accessLvl = {
        NAME: $(formInput_AccessNameContainer).val().trim(),
        MANAGEUSER: $(formInput_ManageUserRadioContainer).is(":checked"),
        MANAGELEAVES: $(formInput_ManageLeavesRadioContainer).is(":checked"),
        MANAGEACCESS: $(formInput_ManageAccessRadioContainer).is(":checked"),
        VIEWREPORTS: $(formInput_ManageReportsRadioContainer).is(":checked"),
        ISAPPROVER: $(formInput_ApprovalRadioContainer).is(":checked"),
      };
      return this._utilFx.serverRequest("SetAccesslevel", JSON.stringify(accessLvl));
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
        makeAjaxReq("Access_Manager.aspx/" + action, data).then((response) => {
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
