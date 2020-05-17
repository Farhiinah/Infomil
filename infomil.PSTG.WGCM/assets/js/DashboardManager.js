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
    let leaves = {totalLeaves:0, leaveList: []};
    if (this.CURRENTUSER.LEAVELIST.length > 0) {
        this.CURRENTUSER.LEAVELIST.forEach((leave) => {
          leaves.totalLeaves += parseInt(leave.LEAVEAMOUNT);
          leaves.leaveList.push(`
            <div class="recent-comment">
            <div class="dash-card-container">
            <div class="dash-card-icon">
            <i class="fa fa-suitcase"></i>
            </div>
            <div class="dash-card-content">
            <h4 class="mb-0">${capitalize(leave.LEAVETYPE.replace("_", " ")) + " : " + leave.STARTDATE + " - " + leave.ENDDATE}</h4>
            </div>
            </div>
            <hr>
            </div>
          `);
        });
      }
    return leaves;
  }
  buildRequestList() {
    let requests = [];
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
              if (leave.STATUS == "Sent for approval") {
                requests.push("record");
              }
            });
          }
        });
      }
    }
    return requests;
  }
}
