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
      $("#totalSick").html(app.CURRENTUSER.SICK_LEAVE + " day(s)");
      $("#totalLocal").html(app.CURRENTUSER.LOCAL_LEAVE + " day(s)");
      $("#totalAnnual").html(app.CURRENTUSER.ANNUAL_LEAVE + " day(s)");
      app.renderList(
        teamLeadListContainer,
        dashboardManager.buildTeamLeadList(),
        "No team lead to display."
      );
      let leaveConstruct = dashboardManager.buildLeaveList();
      $(totalLeaveTakingContainer).html(leaveConstruct.totalLeaves);
      $(totalRequestsContainer).html(
        dashboardManager.buildRequestList().length
      );
      app.renderList(
        leaveListContainer,
        leaveConstruct.leaveList,
        "No upcoming leaves."
      );
      buildChart([leaveConstruct.totalLeaves, leaveConstruct.totalLeaveRemaining]);
    })
    .catch((err) => {
      console.log(err);
    });
};

function buildChart(leaveData) {
  var ctx = document.getElementById("pieChart").getContext("2d");
  var pieChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Leave(s) taken", "Leave(s) remaining"],
      datasets: [
        {
          label: "# of Votes",
          data: leaveData,
          backgroundColor: [
            "#f6822d",
            "#353847",
            "#7f2df6",
            "#1bd790",
            "#e8da0d",
            "#f62d82",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      legend: {
        display: false,
      },
    },
  });
}
