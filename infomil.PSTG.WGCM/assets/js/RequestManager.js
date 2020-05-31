class RequestManager {
  constructor(currentUser, userList, accessList, teamList, leaveList) {
    this.CURRENTUSER = currentUser;
    this.USERLIST = userList;
    this.ACCESSLIST = accessList;
    this.TEAMLIST = teamList;
    this.LEAVELIST = leaveList;
  }
  buildRequestList() {
    let requests = [];
    if (this.LEAVELIST.length > 0) {
      let currentTeam = null;
      this.TEAMLIST.forEach((team) => {
        if (
          team.LEAD.ID == this.CURRENTUSER.ID ||
          team.TEAMMANAGER.ID == this.CURRENTUSER.ID ||
          team.GMANAGER.ID == this.CURRENTUSER.ID
        ) {
          currentTeam = team;
        }
      });
      if (currentTeam != null) {
        let currentAccess = this.CURRENTUSER.LVLOFACCESS.ID;

        currentTeam.TEAMMANAGER.LEAVELIST.forEach((leave) => {
          if (
            currentAccess == "67292de3411d48ce8e8e7f4247fa07eb" &&
            leave.STATUS == "Sent for approval"
          ) {
            requests.push(`
            <tr>
            <td class="selectAreaRequest" data="${
              leave.ID
            }" style="text-align: center;">
            <input type="checkbox" onchange="checkToggleCherryPick(this, '${
              leave.ID
            }')">
            </td>
            <td style="text-align: center;">${
              currentTeam.TEAMMANAGER.FIRSTNAME + " " + currentTeam.TEAMMANAGER.LASTNAME
            }</td>
            <td style="text-align: center;">${leave.STARTDATE}</td>
            <td style="text-align: center;">${leave.ENDDATE}</td>
            <td style="text-align: center;">${leave.SICK_LEAVE}</td>
            <td style="text-align: center;">${leave.LOCAL_LEAVE}</td>
            <td style="text-align: center;">${leave.ANNUAL_LEAVE}</td>
            <td style="text-align: center;">${leave.UNPAID_LEAVE}</td>
            <td style="text-align: center;">${leave.NUMBEROFHOURS}</td>
            <td style="text-align: center;">${leave.COMMENT}</td>
            </tr>
          `);
          }
        });

        currentTeam.LEAD.LEAVELIST.forEach((leave) => {
          if (
            (currentAccess == "5a56dcc19d924247b5d1f1284a3505b5" &&
              leave.STATUS == "Sent for approval") ||
            (currentAccess == "67292de3411d48ce8e8e7f4247fa07eb" &&
              leave.STATUS == "Escalated to general manager")
          ) {
            requests.push(`
            <tr>
            <td class="selectAreaRequest" data="${
              leave.ID
            }" style="text-align: center;">
            <input type="checkbox" onchange="checkToggleCherryPick(this, '${
              leave.ID
            }')">
            </td>
            <td style="text-align: center;">${
              currentTeam.LEAD.FIRSTNAME + " " + currentTeam.LEAD.LASTNAME
            }</td>
            <td style="text-align: center;">${leave.STARTDATE}</td>
            <td style="text-align: center;">${leave.ENDDATE}</td>
            <td style="text-align: center;">${leave.SICK_LEAVE}</td>
            <td style="text-align: center;">${leave.LOCAL_LEAVE}</td>
            <td style="text-align: center;">${leave.ANNUAL_LEAVE}</td>
            <td style="text-align: center;">${leave.UNPAID_LEAVE}</td>
            <td style="text-align: center;">${leave.NUMBEROFHOURS}</td>
            <td style="text-align: center;">${leave.COMMENT}</td>
            </tr>
          `);
          }
        });
        currentTeam.MEMBERS.forEach((user) => {
          user.LEAVELIST.forEach((leave) => {
            if (
              (currentAccess == "94d7b41571da4cccb3d0cb11cc620d69" &&
                leave.STATUS == "Sent for approval") ||
              (currentAccess == "5a56dcc19d924247b5d1f1284a3505b5" &&
                leave.STATUS == "Escalated to manager") ||
              (currentAccess == "67292de3411d48ce8e8e7f4247fa07eb" &&
                leave.STATUS == "Escalated to general manager")
            ) {
              requests.push(`
              <tr>
              <td class="selectAreaRequest" data="${
                leave.ID
              }" style="text-align: center;">
              <input type="checkbox" onchange="checkToggleCherryPick(this, '${
                leave.ID
              }')">
              </td>
              <td style="text-align: center;">${
                user.FIRSTNAME + " " + user.LASTNAME
              }</td>
              <td style="text-align: center;">${leave.STARTDATE}</td>
              <td style="text-align: center;">${leave.ENDDATE}</td>
              <td style="text-align: center;">${leave.SICK_LEAVE}</td>
              <td style="text-align: center;">${leave.LOCAL_LEAVE}</td>
              <td style="text-align: center;">${leave.ANNUAL_LEAVE}</td>
              <td style="text-align: center;">${leave.UNPAID_LEAVE}</td>
              <td style="text-align: center;">${leave.NUMBEROFHOURS}</td>
              <td style="text-align: center;">${leave.COMMENT}</td>
              </tr>
            `);
            }
          });
        });
      }
    }
    return requests;
  }
  requestMod(mod, idList, comment) {
    let IDLIST = "";
    let userIdList = "";
    let managerIdList = "";
    let gmanagerIdList = "";
    idList.forEach((val, index) => {
      let relatedUserId = "";
      let relatedManagerId = "";
      let relatedGManagerId = "";
      this.USERLIST.forEach((user) => {
        if (user.LEAVELIST.length > 0) {
          user.LEAVELIST.forEach((leave) => {
            if (leave.ID == val) {
              relatedUserId = user.ID;
              this.TEAMLIST.forEach((team) => {
                team.MEMBERS.forEach((member) => {
                  if (member.ID == relatedUserId) {
                    relatedManagerId = team.TEAMMANAGER.ID;
                    relatedGManagerId = team.GMANAGER.ID;
                  }
                });
              });
            }
          });
        }
      });
      userIdList += relatedUserId;
      IDLIST += val;
      managerIdList += relatedManagerId;
      gmanagerIdList += relatedGManagerId;
      if (index != idList.length - 1) {
        userIdList += ";";
        IDLIST += ";";
        managerIdList += ";";
        gmanagerIdList += ";";
      }
    });
    switch (mod) {
      case "approve":
        this._utilFx
          .serverRequest(
            "ApproveLeave",
            `{IDLIST: '${IDLIST}', approverId: '${this.CURRENTUSER.ID}', userId: '${userIdList}', comment: '${comment}'}`
          )
          .then((result) => {
            $("#loader").delay(100).fadeOut("slow");
            $("#loader-wrapper").delay(500).fadeOut("slow");
            if (result.status == 200) {
              $.notify("Request " + mod + "d.", "success");
              $("#requestTable").html();
              /*if (typeof loadRequests === "function") {
                loadRequests();
              } else {
                dashboardLoadData();
              }*/
              location.reload();
            } else {
              $.notify("Server error: " + result.message, "error");
            }
          })
          .catch((err) => {
            $("#loader").delay(100).fadeOut("slow");
            $("#loader-wrapper").delay(500).fadeOut("slow");
            $.notify("Error: " + err, "error");
          });
        break;
      case "escalate":
        let status =
          this.CURRENTUSER.LVLOFACCESS.ID == "94d7b41571da4cccb3d0cb11cc620d69"
            ? "Escalated to manager"
            : "Escalated to general manager";
        this._utilFx
          .confirm(
            "Are you sure you want to escalate the selected request?",
            "Escalate request"
          )
          .then((response) => {
            if (response) {
              this._utilFx
                .serverRequest(
                  "EscalateLeave",
                  `{IDLIST: '${IDLIST}', approverId: '${this.CURRENTUSER.ID}', userId: '${userIdList}', managerId: '${managerIdList}', status: '${status}', gmanagerId: '${gmanagerIdList}' }`
                )
                .then((result) => {
                  $("#loader").delay(100).fadeOut("slow");
                  $("#loader-wrapper").delay(500).fadeOut("slow");
                  if (result.status == 200) {
                    $.notify("Request " + mod + "d.", "success");
                    $("#requestTable").html();
                    /*if (typeof loadRequests === "function") {
                      loadRequests();
                    } else {
                      dashboardLoadData();
                    }*/
                    location.reload();
                  } else {
                    $.notify("Server error: " + result.message, "error");
                  }
                })
                .catch((err) => {
                  $("#loader").delay(100).fadeOut("slow");
                  $("#loader-wrapper").delay(500).fadeOut("slow");
                  $.notify("Error: " + err, "error");
                });
            }
          })
          .catch((response) => {
            console.log(response);
          });
        break;
      case "reject":
        this._utilFx
          .confirm(
            "Are you sure you want to reject the selected request?",
            "Reject request"
          )
          .then((response) => {
            if (response) {
              this._utilFx
                .serverRequest(
                  "RejectLeave",
                  `{IDLIST: '${IDLIST}', approverId: '${this.CURRENTUSER.ID}', userId: '${userIdList}'}`
                )
                .then((result) => {
                  $("#loader").delay(100).fadeOut("slow");
                  $("#loader-wrapper").delay(500).fadeOut("slow");
                  if (result.status == 200) {
                    $.notify("Request " + mod + "ed.", "success");
                    $("#requestTable").html();
                    /*if (typeof loadRequests === "function") {
                      loadRequests();
                    } else {
                      dashboardLoadData();
                    }*/
                    location.reload();
                  } else {
                    $.notify("Server error: " + result.message, "error");
                  }
                })
                .catch((err) => {
                  $("#loader").delay(100).fadeOut("slow");
                  $("#loader-wrapper").delay(500).fadeOut("slow");
                  console.log(err);
                  $.notify("Error: " + err, "error");
                });
            }
          })
          .catch((response) => {
            $("#loader").delay(100).fadeOut("slow");
            $("#loader-wrapper").delay(500).fadeOut("slow");
            console.log(response);
          });
        break;
    }
  }
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
      $("#loader").show();
      $("#loader-wrapper").show();
      return new Promise((resolve, reject) => {
        makeAjaxReq("Requests_Manager.aspx/" + action, data).then(
          (response) => {
            if (response.d == "OK") {
              resolve({ status: 200, message: "OK" });
            } else {
              reject({ status: 500, message: "Server error: " + response.d });
            }
          }
        );
      });
    },
  };
  exportLeaves() {
    let csv = [];
    this.USERLIST.forEach((user) => {
      user.LEAVELIST.forEach((leave)=>{
        csv.push({
          FIRSTNAME: user.FIRSTNAME,
          LASTNAME: user.LASTNAME,
          DATEFROM: leave.STARTDATE,
          DATETO:leave.ENDDATE,
          LEAVEAMOUNT: leave.LEAVEAMOUNT,
          NUMBEROFHOURS: leave.NUMBEROFHOURS,
          STATUS: leave.STATUS
        });
      });
    });
    return this._utilFx.serverRequest("ExportCsv", `{csvData: '${JSON.stringify(csv)}'}`);
  }
}
