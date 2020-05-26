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
      $("#totalSick").html(convertHoursIfAny(app, "SICK_LEAVE"));
      $("#totalLocal").html(convertHoursIfAny(app, "LOCAL_LEAVE"));
      $("#totalAnnual").html(convertHoursIfAny(app, "ANNUAL_LEAVE"));
      app.renderList(
        teamLeadListContainer,
        dashboardManager.buildTeamLeadList(),
        "No team lead to display."
      );
      let leaveConstruct = dashboardManager.buildLeaveList();
      let leaveRequestConstruct = dashboardManager.buildRequestList();
      $(totalLeaveTakingContainer).html(leaveConstruct.totalLeaves);
      $(totalRequestsContainer).html(leaveRequestConstruct.length);
      app.renderList(
        leaveListContainer,
        leaveConstruct.leaveList,
        "No upcoming leave."
      );

      app.renderList(
        "#requestlistDashboard",
        leaveRequestConstruct,
        "No active request."
      );

      buildChart([
        leaveConstruct.totalLeaves,
        leaveConstruct.totalLeaveRemaining,
      ]);
      buildBarChart(dashboardManager.generateBarChartData());
    })
    .catch((err) => {
      console.log(err);
    });
};

function convertHoursIfAny(app, type) {
  let val = 0 + " day(s)";
  if(app.CURRENTUSER[type].includes('.')) {
    val = app.CURRENTUSER[type].split('.')[0] + " day(s) & " + ((parseFloat(app.CURRENTUSER[type]) % 1) * 8) + " hour(s)";
  }
  else {
    val = app.CURRENTUSER[type] + " day(s)";
  }
  return val;
}

function buildChart(leaveData) {
  let color = "#353847";
  let leavePercentage = (leaveData[0] / leaveData[1]) * 100;
  if (leavePercentage > 0 && leavePercentage <= 25) {
    color = "#28a745";
  } else if (leavePercentage > 25 && leavePercentage <= 50) {
    color = "#ffc107";
  } else if (leavePercentage > 50) {
    color = "#dc3545";
  }
  new Chart(document.getElementById("pieChart").getContext("2d"), {
    type: "pie",
    data: {
      labels: ["Leave(s) taken", "Leave(s) remaining"],
      datasets: [
        {
          label: "",
          data: leaveData,
          backgroundColor: [color, "#353847"],
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

function buildBarChart(leaveData) {
  new Chart(document.getElementById("barChart").getContext("2d"), {
    type: "bar",
    data: {
      labels: ["Sick", "Local", "Annual", "Unpaid"],
      datasets: [
        {
          label: "Team total leave",
          data: leaveData,
          fill: false,
          borderColor: "#373651",
          backgroundColor: ["#ea7b2b", "#ffc107", "#dc3545"],
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

function requestMod(request, leaveId) {
  new App()
    .build()
    .then((app) => {
      new RequestManager(
        app.CURRENTUSER,
        app.USERLIST,
        app.ACCESSLIST,
        app.TEAMLIST,
        app.LEAVELIST
      ).requestMod(request, [leaveId]);
      dashboardLoadData();
    })
    .catch((err) => {
      console.log(err);
    });
}
