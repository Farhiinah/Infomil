const totalEmployeesContainer = "#totalEmployees";
const totalTeamsContainer = "#totalTeams";
const teamLeadListContainer = "#teamLeadListDashboard";
const leaveListContainer = "#leavelistDashboard";
const totalLeaveTakingContainer = "#totalLeaveTaking";
const totalRequestsContainer = "#totalRequests";

$(document).ready(function () {
  dashboardLoadData();
});

let dashboardLoadData = () => {
  new App()
    .build()
    .then((app) => {
      $(totalEmployeesContainer).html(app.USERLIST.length - 1);
      $(totalTeamsContainer).html(app.TEAMLIST.length);
      let dashboardManager = new DashboardManager(
        app.CURRENTUSER,
        app.USERLIST,
        app.ACCESSLIST,
        app.TEAMLIST,
        app.LEAVELIST
      );
      app.renderList(
        teamLeadListContainer,
        dashboardManager.buildTeamLeadList(),
        "No team lead to display."
      );
      let leaveConstruct = dashboardManager.buildLeaveList();
      $(totalLeaveTakingContainer).html(leaveConstruct.totalLeaves);
      $(totalRequestsContainer).html(dashboardManager.buildRequestList().length);
      app.renderList(
        leaveListContainer,
        leaveConstruct.leaveList,
        "No upcoming leaves."
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

