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
        if (team.LEAD.ID == this.CURRENTUSER.ID) {
          currentTeam = team;
        }
      });
      if (currentTeam != null) {
        currentTeam.MEMBERS.forEach((user) => {
          if (user.LEAVELIST.length > 0) {
            user.LEAVELIST.forEach((leave) => {
              if (leave.STATUS == "Sent for approval") {
                requests.push(`
                    <div class="col-md-6 col-lg-6 col-xl-4">
                    <div class="ctm-border-radius shadow-sm grow card">
                    <div class="card-header">
                    <h3 class="page-sub-title d-inline-block mb-0 mt-2">${user.FIRSTNAME + " " + user.LASTNAME}</h3>
                    </div>
                    <div class="card-body">
                    <div style="margin: 10px; color: rgba(0,0,0,0.5); border-bottom: 1px solid rgba(0,0,0,0.1)">
                    ${capitalize(leave.LEAVETYPE.replace("_", " "))}
                    <br />
                    ${leave.STARTDATE + " " + leave.ENDDATE} (${leave.LEAVEAMOUNT})
                    <br />
                    ${leave.COMMENT}
                    </div>
                    <br />
                    <div class="btn-group col-xs-1 text-center" role="group" aria-label="Basic example" style="width: 100%; top: 10px; font-size: 1em; margin-bottom: 5px;">
                    <button type="button" class="btn btn-success" onclick="">Approve</button>
                    <button type="button" class="btn btn-danger" onclick="">Reject</button>
                    </div>
                    </div>
                    </div>
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
}
