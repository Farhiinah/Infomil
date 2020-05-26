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
          team.TEAMMANAGER.ID == this.CURRENTUSER.ID
        ) {
          currentTeam = team;
        }
      });
      if (currentTeam != null) {
        if(this.CURRENTUSER.LVLOFACCESS.ID == "5a56dcc19d924247b5d1f1284a3505b5") {
          currentTeam.LEAD.LEAVELIST.forEach((leave) => {
            if (leave.STATUS == "Sent for approval") {
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
        }
        currentTeam.MEMBERS.forEach((user) => {
          if (user.LEAVELIST.length > 0) {
            user.LEAVELIST.forEach((leave) => {
              if (leave.STATUS == "Sent for approval") {
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
              if (
                this.CURRENTUSER.LVLOFACCESS.ID ==
                  "5a56dcc19d924247b5d1f1284a3505b5" &&
                leave.STATUS == "Escalated"
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
          }
        });
      }
    }
    return requests;
  }
  requestMod(mod, idList) {
    let IDLIST = "";
    let userIdList = "";
    idList.forEach((val, index) => {
      let relatedUserId = "";
      this.USERLIST.forEach((user) => {
        if (user.LEAVELIST.length > 0) {
          user.LEAVELIST.forEach((leave) => {
            if(leave.ID == val) {
              relatedUserId = user.ID;
            }
          });
        }
      });
      userIdList += relatedUserId;
      IDLIST += val;
      if (index != idList.length - 1) {
        userIdList += ";";
        IDLIST += ";";
      }
    });
    switch (mod) {
      case "approve":
        this._utilFx
          .serverRequest(
            "ApproveLeave",
            `{IDLIST: '${IDLIST}', approverId: '${this.CURRENTUSER.ID}'}`
          )
          .then((result) => {
            if (result.status == 200) {
              $.notify("Request " + mod + "d.", "success");
              $("#requestTable").html();
              if(typeof loadRequests === "function") {
                loadRequests();
              }
              else {
                dashboardLoadData();
              }
            } else {
              $.notify("Server error: " + result.message, "error");
            }
          })
          .catch((err) => {
            $.notify("Error: " + err, "error");
          });
        break;
      case "escalate":
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
                  `{IDLIST: '${IDLIST}', approverId: '${this.CURRENTUSER.ID}'}`
                )
                .then((result) => {
                  if (result.status == 200) {
                    $.notify("Request " + mod + "d.", "success");
                    $("#requestTable").html();
                    if(typeof loadRequests === "function") {
                      loadRequests();
                    }
                    else {
                      dashboardLoadData();
                    }
                  } else {
                    $.notify("Server error: " + result.message, "error");
                  }
                })
                .catch((err) => {
                  $.notify("Error: " + err, "error");
                });
            }
          })
          .catch((response) => {
            console.log(response);
          });
        break;
      case "reject":
        console.log(userIdList);
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
                  if (result.status == 200) {
                    $.notify("Request " + mod + "ed.", "success");
                    $("#requestTable").html();
                    if(typeof loadRequests === "function") {
                      loadRequests();
                    }
                    else {
                      dashboardLoadData();
                    }
                  } else {
                    $.notify("Server error: " + result.message, "error");
                  }
                })
                .catch((err) => {
                  console.log(err);
                  $.notify("Error: " + err, "error");
                });
            }
          })
          .catch((response) => {
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
}
