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
        if (leave.STATUS != "Rejected" || leave.STATUS != "Cancelled") {
          leaves.totalLeaves += parseInt(leave.LEAVEAMOUNT);
        }
        let approverMark = "";
        let approverIdList =
          leave.APPROVER != "" ? leave.APPROVER.split(";") : null;
        if (approverIdList != null) {
          approverIdList.forEach((approver) => {
            let currentApprover = this.USERLIST.find((user) => {
              return user.ID == approver;
            }).LVLOFACCESS.ID;
            if (currentApprover == "94d7b41571da4cccb3d0cb11cc620d69") {
              if (leave.STATUS == "Approved") {
                approverMark += " ✔ ".fontcolor("#2979e7");
              }
              if (leave.STATUS == "Escalated to manager") {
                approverMark += " ⭡ ".fontcolor("#2979e7");
              }
              if (leave.STATUS == "Rejected") {
                approverMark += " ⤬ ".fontcolor("#2979e7");
              }
            }
            if (currentApprover == "5a56dcc19d924247b5d1f1284a3505b5") {
              if (leave.STATUS == "Approved") {
                approverMark += " ✔ ".fontcolor("#ff9a00");
              }
              if (leave.STATUS == "Escalated to general manager") {
                approverMark += " ⭡ ".fontcolor("#ff9a00");
              }
              if (leaves.STATUS == "Rejected") {
                approverMark += " ⤬ ".fontcolor("#ff9a00");
              }
            }
            if (currentApprover == "67292de3411d48ce8e8e7f4247fa07eb") {
              if (leave.STATUS == "Approved") {
                approverMark += " ⮙ ".fontcolor("#009e10");
              }
              if (leave.STATUS == "Rejected") {
                approverMark += " ⤬ ".fontcolor("#ce2829");
              }
            }
          });
        }
        leaves.leaveList.push(`
        <tr>
        ${
          leave.STATUS != "Cancelled" && leave.STATUS != "Rejected"
            ? `<td class="selectAreaLeave" data="${leave.ID}" style="text-align: center;">
        <input type="checkbox" onchange="checkToggleCherryPick(this, '${leave.ID}')">
        </td>`
            : `<td></td>`
        }
        <td style="text-align: center;">${leave.STARTDATE}</td>
        <td style="text-align: center;">${leave.ENDDATE}</td>
        <td style="text-align: center;">${leave.SICK_LEAVE}</td>
        <td style="text-align: center;">${leave.LOCAL_LEAVE}</td>
        <td style="text-align: center;">${leave.ANNUAL_LEAVE}</td>
        <td style="text-align: center;">${leave.UNPAID_LEAVE}</td>
        <td style="text-align: center;">${leave.NUMBEROFHOURS}</td>
        <td style="text-align: center;">${leave.COMMENT}</td>
        <td style="text-align: center;">${leave.STATUS}</td>
        <td style="text-align: center;">${approverMark}</td>
        </tr>
        `);
      });
    }
    return leaves;
  }
  leaveOp(mod, idList) {
    let IDLIST = "";
    let emailIdList = "";
    let userIdList = "";
    if (typeof idList != "undefined") {
      if (idList.length > 0) {
        idList.forEach((val, index) => {
          let relatedUserId = "";
          let relatedEmailId = "";
          this.USERLIST.forEach((user) => {
            if (user.LEAVELIST.length > 0) {
              user.LEAVELIST.forEach((leave) => {
                if (leave.ID == val) {
                  relatedUserId = user.ID;
                  this.TEAMLIST.forEach((team) => {
                    team.MEMBERS.forEach((member) => {
                      if (member.ID == relatedUserId) {
                        if (leave.STATUS == "Escalated") {
                          relatedEmailId = team.TEAMMANAGER.ID;
                        } else {
                          relatedEmailId = team.LEAD.ID;
                        }
                      }
                    });
                  });
                }
              });
            }
          });
          userIdList += relatedUserId;
          IDLIST += val;
          emailIdList += relatedEmailId;
          if (index != idList.length - 1) {
            userIdList += ";";
            IDLIST += ";";
            emailIdList += ";";
          }
        });
      }
    }
    switch (mod) {
      case "create":
        let results = this._leaveFx.createLeave();
        if (typeof results != "undefined") {
          results
            .then((result) => {
              $("#loader").delay(100).fadeOut("slow");
              $("#loader-wrapper").delay(500).fadeOut("slow");
              if (result.status == 200) {
                $.notify("Leave " + mod + "d.", "success");
                //leaveLoadData();
                location.reload();
              } else {
                $.notify("An error occured: " + result.message, "error");
              }
              $(modalContainer).modal("hide");
              $(formName_NewLeave).trigger("reset");
              $("#numOfDays").html(0);
              $("#numOfHrs").html(0);
            })
            .catch((err) => {
              $("#loader").delay(100).fadeOut("slow");
              $("#loader-wrapper").delay(500).fadeOut("slow");
              $.notify(err.message, "error");
            });
        }
        break;
      case "cancel":
        this._utilFx
          .confirm(
            "Are you sure you want to cancel the selected leave?",
            "Cancel leave"
          )
          .then((response) => {
            if (response) {
              this._utilFx
                .serverRequest(
                  "CancelLeave",
                  `{IDLIST: '${IDLIST}', emailIdList: '${this.CURRENTUSER.ID}', userIdList: '${userIdList}'}`
                )
                .then((result) => {
                  $("#loader").delay(100).fadeOut("slow");
                  $("#loader-wrapper").delay(500).fadeOut("slow");
                  if (result.status == 200) {
                    $.notify("Leaves " + mod + "led.", "success");
                    location.reload();
                  } else {
                    $.notify("Server error: " + result.message, "error");
                  }
                })
                .catch((err) => {
                  $("#loader").delay(100).fadeOut("slow");
                  $("#loader-wrapper").delay(500).fadeOut("slow");
                  $.notify("Error: " + err.message, "error");
                });
            }
          })
          .catch((err) => {
            $("#loader").delay(100).fadeOut("slow");
            $("#loader-wrapper").delay(500).fadeOut("slow");
            $.notify("Error: " + err, "error");
          });
        break;
    }
  }
  _leaveFx = {
    createLeave: () => {
      let totalLeaveCount = parseFloat($("#totalLeaveCount").val());
      let sDate = $(formInput_StartDateContainer).val();
      let eDate = $(formInput_EndDateContainer).val();
      let team = null;
      this.TEAMLIST.forEach((teams) => {
        teams.MEMBERS.forEach((member) => {
          if (
            member.ID == this.CURRENTUSER.ID ||
            teams.LEAD.ID == this.CURRENTUSER.ID ||
            teams.TEAMMANAGER.ID == this.CURRENTUSER.ID
          ) {
            team = teams;
          }
        });
      });
      if (new Date(eDate) < new Date(sDate)) {
        $.notify("Invalid period.", "error");
      } else {
        if (this._leaveFx.dateOverlaps(sDate, eDate)) {
          $.notify("Date period overlaps with another.", "error");
        } else {
          if ($("#allDay").is(":checked")) {
            if (
              totalLeaveCount == parseFloat($("#numOfHrs").html()) &&
              totalLeaveCount != 0
            ) {
              let SICKLEAVE =
                $("#SICKLEAVE").val() == "" || $("#SICKLEAVE").val() == null
                  ? 0
                  : parseFloat($("#SICKLEAVE").val());
              let LOCALEAVE =
                $("#LOCALEAVE").val() == "" || $("#LOCALEAVE").val() == null
                  ? 0
                  : parseFloat($("#LOCALEAVE").val());
              let ANNUALLEAVE =
                $("#ANNUALLEAVE").val() == "" || $("#ANNUALLEAVE").val() == null
                  ? 0
                  : parseFloat($("#ANNUALLEAVE").val());
              let UNPAIDLEAVE =
                $("#UNPAIDLEAVE").val() == "" || $("#UNPAIDLEAVE").val() == null
                  ? 0
                  : parseFloat($("#UNPAIDLEAVE").val());

              let leaveData = {
                SICK_LEAVE: SICKLEAVE,
                LOCAL_LEAVE: LOCALEAVE,
                ANNUAL_LEAVE: ANNUALLEAVE,
                UNPAID_LEAVE: UNPAIDLEAVE,
                LEAVEAMOUNT: parseFloat($("#numOfDays").html()),
                NUMOFHOURS: totalLeaveCount,
                STATUS:
                  this.CURRENTUSER.LVLOFACCESS.ID ==
                  "5a56dcc19d924247b5d1f1284a3505b5"
                    ? "Approved"
                    : "Sent for approval",
                COMMENT: $("#comments").val().trim(),
                sDate: sDate.split("-").reverse().join("/"),
                eDate: eDate.split("-").reverse().join("/"),
                currentLeaveList: this._leaveFx.generateLeaveList(),
                userId: this.CURRENTUSER.ID,
                email:
                  this.CURRENTUSER.LVLOFACCESS.ID ==
                  "94d7b41571da4cccb3d0cb11cc620d69"
                    ? team.LEAD.EMAIL.replace(/[`]/g, "@")
                    : team.TEAMMANAGER.EMAIL.replace(/[`]/g, "@"),
              };
              if (
                this.CURRENTUSER.SICK_LEAVE == 0 ||
                (this.CURRENTUSER.SICK_LEAVE * 8 - leaveData.SICK_LEAVE < 0 &&
                  this.CURRENTUSER.LOCAL_LEAVE == 0) ||
                (this.CURRENTUSER.LOCAL_LEAVE * 8 - leaveData.LOCAL_LEAVE < 0 &&
                  this.CURRENTUSER.ANNUAL_LEAVE == 0) ||
                this.CURRENTUSER.ANNUAL_LEAVE * 8 - leaveData.ANNUAL_LEAVE < 0
              ) {
                $.notify("You do not have enough sick leaves.", "error");
              } else if (
                this.CURRENTUSER.LOCAL_LEAVE == 0 ||
                (this.CURRENTUSER.LOCAL_LEAVE * 8 - leaveData.LOCAL_LEAVE < 0 &&
                  this.CURRENTUSER.ANNUAL_LEAVE == 0) ||
                (this.CURRENTUSER.ANNUAL_LEAVE * 8 - leaveData.ANNUAL_LEAVE <
                  0 &&
                  this.CURRENTUSER.SICK_LEAVE == 0) ||
                this.CURRENTUSER.SICK_LEAVE * 8 - leaveData.SICK_LEAVE < 0
              ) {
                $.notify("You do not have enough local leaves.", "error");
              } else if (
                this.CURRENTUSER.ANNUAL_LEAVE == 0 ||
                (this.CURRENTUSER.ANNUAL_LEAVE * 8 - leaveData.ANNUAL_LEAVE <
                  0 &&
                  this.CURRENTUSER.SICK_LEAVE == 0) ||
                (this.CURRENTUSER.SICK_LEAVE * 8 - leaveData.SICK_LEAVE < 0 &&
                  this.CURRENTUSER.ANNUAL_LEAVE == 0) ||
                this.CURRENTUSER.ANNUAL_LEAVE * 8 - leaveData.ANNUAL_LEAVE < 0
              ) {
                $.notify("You do not have enough annual leaves.", "error");
              } else {
                leaveData.remainingSick =
                  (this.CURRENTUSER.SICK_LEAVE * 8 - leaveData.SICK_LEAVE) / 8;
                leaveData.remainingLocal =
                  (this.CURRENTUSER.LOCAL_LEAVE * 8 - leaveData.LOCAL_LEAVE) /
                  8;
                leaveData.remainingAnnual =
                  (this.CURRENTUSER.ANNUAL_LEAVE * 8 - leaveData.ANNUAL_LEAVE) /
                  8;
                return this._utilFx.serverRequest(
                  "CreateLeave",
                  JSON.stringify(leaveData)
                );
              }
            } else {
              $.notify("Incorrect leave input.", "error");
            }
          } else {
            if ($("#comments").val().trim() == "") {
              $.notify(
                "Comment specifying time for each day is mandatory for non-all day leaves to be approved.",
                "error"
              );
            } else {
              if (totalLeaveCount > parseInt($("#numOfDays").html()) * 8) {
                $.notify(
                  "Total leave amount exceeds maximum allowed for time period.",
                  "error"
                );
              } else {
                if (totalLeaveCount > 0) {
                  let SICKLEAVE =
                    $("#SICKLEAVE").val() == "" || $("#SICKLEAVE").val() == null
                      ? 0
                      : parseFloat($("#SICKLEAVE").val());
                  let LOCALEAVE =
                    $("#LOCALEAVE").val() == "" || $("#LOCALEAVE").val() == null
                      ? 0
                      : parseFloat($("#LOCALEAVE").val());
                  let ANNUALLEAVE =
                    $("#ANNUALLEAVE").val() == "" ||
                    $("#ANNUALLEAVE").val() == null
                      ? 0
                      : parseFloat($("#ANNUALLEAVE").val());
                  let UNPAIDLEAVE =
                    $("#UNPAIDLEAVE").val() == "" ||
                    $("#UNPAIDLEAVE").val() == null
                      ? 0
                      : parseFloat($("#UNPAIDLEAVE").val());
                  let leaveData = {
                    SICK_LEAVE: SICKLEAVE,
                    LOCAL_LEAVE: LOCALEAVE,
                    ANNUAL_LEAVE: ANNUALLEAVE,
                    UNPAID_LEAVE: UNPAIDLEAVE,
                    LEAVEAMOUNT: parseFloat($("#numOfDays").html()),
                    NUMOFHOURS: totalLeaveCount,
                    STATUS:
                      this.CURRENTUSER.LVLOFACCESS.ID ==
                      "5a56dcc19d924247b5d1f1284a3505b5"
                        ? "Approved"
                        : "Sent for approval",
                    COMMENT: $("#comments").val(),
                    sDate: sDate.split("-").reverse().join("/"),
                    eDate: eDate.split("-").reverse().join("/"),
                    currentLeaveList: this._leaveFx.generateLeaveList(),
                    userId: this.CURRENTUSER.ID,
                    email:
                      this.CURRENTUSER.LVLOFACCESS.ID ==
                        "94d7b41571da4cccb3d0cb11cc620d69" && team != null
                        ? team.LEAD.EMAIL.replace(/[`]/g, "@")
                        : team.TEAMMANAGER.EMAIL.replace(/[`]/g, "@"),
                  };
                  if (
                    (leaveData.SICK_LEAVE != 0 &&
                      leaveData.SICK_LEAVE < 0.25) ||
                    (leaveData.LOCAL_LEAVE != 0 &&
                      leaveData.LOCAL_LEAVE < 0.25) ||
                    (leaveData.ANNUAL_LEAVE != 0 &&
                      leaveData.ANNUAL_LEAVE < 0.25) ||
                    (leaveData.UNPAID_LEAVE != 0 &&
                      leaveData.UNPAID_LEAVE < 8) ||
                    (leaveData.SICK_LEAVE != 0 && leaveData.SICK_LEAVE > 8) ||
                    (leaveData.LOCAL_LEAVE != 0 && leaveData.LOCAL_LEAVE > 8) ||
                    (leaveData.ANNUAL_LEAVE != 0 &&
                      leaveData.ANNUAL_LEAVE > 8) ||
                    (leaveData.UNPAID_LEAVE != 0 && leaveData.UNPAID_LEAVE > 8)
                  ) {
                    $.notify(
                      "None-all-day leaves should be a minimum of 0.25 & maximum of 8.",
                      "error"
                    );
                  } else {
                    if (
                      this.CURRENTUSER.SICK_LEAVE == 0 ||
                      this.CURRENTUSER.SICK_LEAVE * 8 - leaveData.SICK_LEAVE < 0
                    ) {
                      $.notify("You do not have enough sick leaves.", "error");
                    } else if (
                      this.CURRENTUSER.LOCAL_LEAVE == 0 ||
                      this.CURRENTUSER.LOCAL_LEAVE * 8 - leaveData.LOCAL_LEAVE <
                        0
                    ) {
                      $.notify("You do not have enough local leaves.", "error");
                    } else if (
                      this.CURRENTUSER.ANNUAL_LEAVE == 0 ||
                      this.CURRENTUSER.ANNUAL_LEAVE * 8 -
                        leaveData.ANNUAL_LEAVE <
                        0
                    ) {
                      $.notify(
                        "You do not have enough annual leaves.",
                        "error"
                      );
                    } else {
                      leaveData.remainingSick =
                        (this.CURRENTUSER.SICK_LEAVE * 8 -
                          leaveData.SICK_LEAVE) /
                        8;
                      leaveData.remainingLocal =
                        (this.CURRENTUSER.LOCAL_LEAVE * 8 -
                          leaveData.LOCAL_LEAVE) /
                        8;
                      leaveData.remainingAnnual =
                        (this.CURRENTUSER.ANNUAL_LEAVE * 8 -
                          leaveData.ANNUAL_LEAVE) /
                        8;
                      return this._utilFx.serverRequest(
                        "CreateLeave",
                        JSON.stringify(leaveData)
                      );
                    }
                  }
                } else {
                  $.notify("Amount of leave not specified.", "error");
                }
              }
            }
          }
        }
      }
    },
    dateOverlaps: (sDate, eDate) => {
      let s = new Date(sDate);
      let e = new Date(eDate);
      let isOverlapping = false;
      let count = 0;
      if (this.CURRENTUSER.LEAVELIST.length > 0) {
        this.CURRENTUSER.LEAVELIST.forEach((leave) => {
          if (
            s <=
              new Date(
                leave.ENDDATE.split("/")[2] +
                  "-" +
                  leave.ENDDATE.split("/")[1] +
                  "-" +
                  leave.ENDDATE.split("/")[0]
              ) &&
            new Date(
              leave.STARTDATE.split("/")[2] +
                "-" +
                leave.STARTDATE.split("/")[1] +
                "-" +
                leave.STARTDATE.split("/")[0]
            ) <= e &&
            leave.STATUS != "Rejected"
          ) {
            count++;
          }
        });
      }
      if (count > 0) {
        isOverlapping = true;
      }
      return isOverlapping;
    },
    generateLeaveList: () => {
      let leaveList = "";
      this.CURRENTUSER.LEAVELIST.forEach((leave, index) => {
        leaveList += leave.ID;
        if (this.CURRENTUSER.LEAVELIST.length - 1 != index) {
          leaveList += ";";
        }
      });
      return leaveList;
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
      $("#loader").show();
      $("#loader-wrapper").show();
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
