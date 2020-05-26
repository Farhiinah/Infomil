class DashboardManager {
  constructor(currentUser, userList, accessList, teamList, leavelist) {
    this.CURRENTUSER = currentUser;
    this.USERLIST = userList;
    this.ACCESSLIST = accessList;
    this.TEAMLIST = teamList;
    this.LEAVELIST = leavelist;
  }
  buildTeamLeadList() {
    let teamLeadList = [];
    if (this.USERLIST.length > 0) {
      this.USERLIST.forEach((user) => {
        if (user.LVLOFACCESS.ID == "94d7b41571da4cccb3d0cb11cc620d69") {
          teamLeadList.push(`
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
    }
    return teamLeadList;
  }
  buildLeaveList() {
    let leaves = { totalLeaves: 0, leaveList: [], totalLeaveRemaining: 0 };
    if (this.CURRENTUSER.LEAVELIST.length > 0) {
      this.CURRENTUSER.LEAVELIST.forEach((leave) => {
        if (leave.STATUS != "Rejected") {
          leaves.totalLeaves += parseFloat(leave.LEAVEAMOUNT);
        }
        leaves.leaveList.push(`
            <div class="recent-comment">
            <div class="dash-card-container">
            <div class="dash-card-icon">
            <i class="fa fa-suitcase"></i>
            </div>
            <div class="dash-card-content">
            <h4 class="mb-0"> ${
              leave.STARTDATE +
              " - " +
              leave.ENDDATE +
              " | " +
              leave.NUMBEROFHOURS +
              "hr(s). | " +
              leave.STATUS
            }</h4>
            </div>
            </div>
            <hr>
            </div>
          `);
      });
    }
    leaves.totalLeaveRemaining =
      parseFloat(this.CURRENTUSER.SICK_LEAVE) +
      parseFloat(this.CURRENTUSER.LOCAL_LEAVE) +
      parseFloat(this.CURRENTUSER.ANNUAL_LEAVE);
    return leaves;
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
        if (
          this.CURRENTUSER.LVLOFACCESS.ID == "5a56dcc19d924247b5d1f1284a3505b5"
        ) {
          currentTeam.LEAD.LEAVELIST.forEach((leave) => {
            if (leave.STATUS == "Sent for approval") {
              requests.push(`
              <div class="recent-comment">
                  <div class="dash-card-container">
                  <div class="dash-card-icon">
                  <i class="fa fa-envelope"></i>
                  </div>
                  <div class="dash-card-content" style="width: 100%;">
                  <h4 class="mb-0" style="width: 100%;"> 
                  ${
                    currentTeam.LEAD.FIRSTNAME +
                    " " +
                    currentTeam.LEAD.LASTNAME +
                    " : " +
                    leave.STARTDATE +
                    " - " +
                    leave.ENDDATE
                  }
                  <a href="javascript:void(0)" class="d-inline-block float-right text-primary" style="margin: 0 5px 0 5px;" title="Approve"
                  onclick="requestMod('approve', '${leave.ID}')">
                  <i class="customSuitCase fa fa-check">
                  </i>
                  </a>
                  <a href="javascript:void(0)" class="d-inline-block float-right text-primary" style="margin: 0 5px 0 5px;" title="Reject"
                  onclick="requestMod('reject', '${leave.ID}')">
                  <i class="customSuitCase fa fa-times">
                  </i>
                  </a>
                  </h4>
                  </div>
                  </div>
                  <hr>
                  </div>
            `);
            }
          });
        }
        currentTeam.MEMBERS.forEach((user) => {
          if (user.LEAVELIST.length > 0) {
            user.LEAVELIST.forEach((leave) => {
              if (leave.STATUS == "Sent for approval") {
                requests.push(`
                  <div class="recent-comment">
                  <div class="dash-card-container">
                  <div class="dash-card-icon">
                  <i class="fa fa-envelope"></i>
                  </div>
                  <div class="dash-card-content" style="width: 100%;">
                  <h4 class="mb-0" style="width: 100%;"> 
                  ${
                    user.FIRSTNAME +
                    " " +
                    user.LASTNAME +
                    " : " +
                    leave.STARTDATE +
                    " - " +
                    leave.ENDDATE
                  }
                  <a href="javascript:void(0)" class="d-inline-block float-right text-primary" style="margin: 0 5px 0 5px;" title="Approve"
                  onclick="requestMod('approve', '${leave.ID}')">
                  <i class="customSuitCase fa fa-check">
                  </i>
                  </a>
                  <a href="javascript:void(0)" class="d-inline-block float-right text-primary" style="margin: 0 5px 0 5px;" title="Reject"
                  onclick="requestMod('reject', '${leave.ID}')">
                  <i class="customSuitCase fa fa-times">
                  </i>
                  </a>
                  <a href="javascript:void(0)" class="d-inline-block float-right text-primary" style="margin: 0 5px 0 5px;" title="Escalate"
                  onclick="requestMod('escalate', '${leave.ID}')">
                  <i class="customSuitCase fa fa-arrow-up">
                  </i>
                  </a>
                  </h4>
                  </div>
                  </div>
                  <hr>
                  </div>
                `);
              }
              if (
                this.CURRENTUSER.LVLOFACCESS.ID ==
                  "5a56dcc19d924247b5d1f1284a3505b5" &&
                leave.STATUS == "Escalated"
              ) {
                requests.push(`
                  <div class="recent-comment">
                  <div class="dash-card-container">
                  <div class="dash-card-icon">
                  <i class="fa fa-envelope"></i>
                  </div>
                  <div class="dash-card-content">
                  <h3 class="mb-0" style="width: 100%;"> 
                  ${
                    user.FIRSTNAME +
                    " " +
                    user.LASTNAME +
                    " : " +
                    leave.STARTDATE +
                    " - " +
                    leave.ENDDATE
                  }
                  <a href="javascript:void(0)" class="d-inline-block float-right text-primary" style="margin: 0 5px 0 5px;" title="Approve">
                  <i class="customSuitCase fa fa-check">
                  </i>
                  </a>
                  <a href="javascript:void(0)" class="d-inline-block float-right text-primary" style="margin: 0 5px 0 5px;" title="Reject">
                  <i class="customSuitCase fa fa-times">
                  </i>
                  </a>
                  </h3>
                  </div>
                  </div>
                  <hr>
                  </div>
                `);
              }
            });
          }
        });
      }
    }
    return requests;
  }
  generateBarChartData() {
    let sick = 0;
    let local = 0;
    let annual = 0;
    let unpaid = 0;

    if (this.LEAVELIST.length > 0) {
      let currentTeam = null;
      this.TEAMLIST.forEach((team) => {
        if (team.LEAD.ID == this.CURRENTUSER.ID) {
          currentTeam = team;
        }
      });
      if (currentTeam != null) {
        currentTeam.MEMBERS.forEach((user) => {
          if (user.LEAVELIST.length > 0) {
            user.LEAVELIST.forEach((leave) => {
              if (leave.STATUS != "Rejected") {
                sick += parseFloat(leave.SICK_LEAVE) / 8;
                local += parseFloat(leave.LOCAL_LEAVE) / 8;
                annual += parseFloat(leave.ANNUAL_LEAVE) / 8;
                unpaid += parseFloat(leave.UNPAID_LEAVE) / 8;
              }
            });
          }
        });
      }
    }
    return [sick, local, annual, unpaid];
  }
}
