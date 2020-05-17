class LeaveManager {
  constructor(currentUser, userList, accessList, teamList, leaveList) {
    this.CURRENTUSER = currentUser;
    this.USERLIST = userList;
    this.ACCESSLIST = accessList;
    this.TEAMLIST = teamList;
    this.LEAVELIST = leaveList;
  }
  buildLeaveList() {
    let leaves = { totalLeaves: 0, leaveList: [] };
    if (this.CURRENTUSER.LEAVELIST.length > 0) {
      this.CURRENTUSER.LEAVELIST.forEach((leave) => {
        leaves.totalLeaves += parseInt(leave.LEAVEAMOUNT);
        leaves.leaveList.push(`
            <div class="col-md-6 col-lg-6 col-xl-4">
            <div class="ctm-border-radius shadow-sm grow card">
            <div class="card-header">
            <h2 class="page-sub-title d-inline-block mb-0 mt-2">${capitalize(
              leave.LEAVETYPE.replace("_", " ")
            )}</h2>
            <div class="team-action-icon float-right">
            <h2 class="page-sub-title d-inline-block mb-0 mt-2">${
              leave.LEAVEAMOUNT
            }</h2>
            </div>
            </div>
            <div class="card-body">
            <div style="margin: 10px; color: rgba(0,0,0,0.5); border-bottom: 1px solid rgba(0,0,0,0.1)">
            ${leave.STARTDATE + " - " + leave.ENDDATE}
            <br/>
            ${leave.COMMENT}
            </div>
            <br/>
            <b style="color: ${
              leave.STATUS == "Sent for approval"
                ? "#f6822d"
                : leave.STATUS == "Approved"
                ? "#6a782c"
                : leave.status == "Rejected"
                ? "#ac2936"
                : "black"
            }">${leave.STATUS}</b>
            </div>
            </div>
            </div>
          `);
      });
    }
    return leaves;
  }
  leaveOp(mod, uid) {
    switch (mod) {
      case "create":
        let results = this._leaveFx.createLeave();
        if (typeof results != "undefined") {
          results
            .then((result) => {
              if (result.status == 200) {
                $.notify("Leave " + mod + "d.", "success");
                leaveLoadData();
              } else {
                $.notify("An error occured: " + result.message, "error");
              }
              $(modalContainer).modal("hide");
              $(formName_NewLeave).trigger("reset");
            })
            .catch((err) => {
              $.notify(err.message, "error");
            });
        }
        break;
    }
  }
  _leaveFx = {
    createLeave: () => {
      let leaveData = {
        LEAVETYPE: $(formInput_LeaveTypeContainer)
          .children("option:selected")
          .val(),
        COMMENT: $(formInput_CommentContainer).val().trim(),
        STATUS: "Sent for approval",
        STARTDATE: $(formInput_StartDateContainer).val(),
        ENDDATE: $(formInput_EndDateContainer).val(),
        LEAVETAKING: 0,
        LEAVEREMAINING: 0,
        userId: this.CURRENTUSER.ID,
      };
      let leaveRemaining =
        leaveData.LEAVETYPE != "LEAVEWITHOUTPAY"
          ? this.CURRENTUSER[leaveData.LEAVETYPE]
          : -1;
      let startDate = new Date(
        leaveData.STARTDATE.split("/")[2],
        leaveData.STARTDATE.split("/")[1] - 1,
        leaveData.STARTDATE.split("/")[0]
      );
      let endDate = new Date(
        leaveData.ENDDATE.split("/")[2],
        leaveData.ENDDATE.split("/")[1] - 1,
        leaveData.ENDDATE.split("/")[0]
      );
      if (
        startDate > new Date() &&
        endDate > new Date() &&
        endDate > startDate
      ) {
        leaveData.LEAVETAKING = this._leaveFx.dateDifference(
          startDate,
          endDate
        );
        if (leaveRemaining != 0) {
          leaveData.LEAVEREMAINING = leaveRemaining - leaveData.LEAVETAKING;
          this.CURRENTUSER[
            leaveData.LEAVETYPE
          ] = leaveData.LEAVEREMAINING.toString();
          localStorage.setItem("CurrentUser", JSON.stringify(this.CURRENTUSER));
        }
        if (leaveRemaining == -1) {
          leaveData.LEAVEREMAINING = 404;
        }
        if (leaveData.LEAVETAKING == 0) {
          $.notify("Please select a valid period.", "error");
        }
        if (leaveData.LEAVEREMAINING <= 0) {
          $.notify("Period exceeds available leave.", "error");
        }
        if (leaveData.LEAVETAKING > 0 && leaveData.LEAVEREMAINING >= 0) {
          return this._utilFx.serverRequest(
            "CreateLeave",
            JSON.stringify(leaveData)
          );
        }
      } else {
        $.notify("Please select a valid period.", "error");
      }
    },
    dateDifference: (start, end) => {
      let s = new Date(+start);
      let e = new Date(+end);
      s.setHours(12, 0, 0, 0);
      e.setHours(12, 0, 0, 0);
      let totalDays = Math.round((e - s) / 8.64e7);
      let wholeWeeks = (totalDays / 7) | 0;
      let days = wholeWeeks * 5;
      if (totalDays % 7) {
        s.setDate(s.getDate() + wholeWeeks * 7);
        while (s < e) {
          s.setDate(s.getDate() + 1);
          if (s.getDay() != 0 && s.getDay() != 6) {
            ++days;
          }
        }
      }
      return days;
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
        makeAjaxReq("Leaves_Manager.aspx/" + action, data).then((response) => {
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
