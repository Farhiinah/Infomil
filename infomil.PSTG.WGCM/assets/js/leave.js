const leavesCountContainer = "#totalLeaves";
const leavesListContainer = "#leavesCardList";
const modalContainer = "#newLeave";
const formName_NewLeave = "#newUser";
const formInput_LeaveTypeContainer = "#leaveTypeList";
const formInput_StartDateContainer = "#startDate";
const formInput_EndDateContainer = "#endDate";

let listenersLoaded = false;
let selectedLeaveData = new Set();

$(document).ready(function () {
  leaveLoadData();
});

let leaveLoadData = () => {
  new App()
    .build()
    .then((app) => {
      let leaveManager = new LeaveManager(
        app.CURRENTUSER,
        app.USERLIST,
        app.ACCESSLIST,
        app.TEAMLIST,
        app.LEAVELIST
      );

      let leaveConstruct = leaveManager.buildLeaveList();
      $(leavesCountContainer).html(leaveConstruct.totalLeaves);
      app.renderList(leavesListContainer, leaveConstruct.leaveList, null);
      $("#leaveTable").DataTable();

      !listenersLoaded ? initListners(app, leaveManager) : app.endLoad();
    })
    .catch((err) => {
      console.log(err);
    });
};

function initListners(app, leaveManager) {
  let formInputListeners = [
    {
      dom: formName_NewLeave,
      eventType: "submit",
      action: "createLeave",
      params: leaveManager,
      preventDefaultEvent: true,
    },
    {
      dom: formInput_StartDateContainer,
      eventType: "change",
      action: "calculateTotalAbsences",
      params: "sDate",
      preventDefaultEvent: false,
    },
    {
      dom: formInput_EndDateContainer,
      eventType: "change",
      action: "calculateTotalAbsences",
      preventDefaultEvent: false,
    },
    {
      dom: "#cancelLeave",
      eventType: "click",
      action: "cancelLeave",
      params: leaveManager,
      preventDefaultEvent: true,
    },
  ];
  formInputListeners.forEach((formInput) => {
    app.addListener(
      formInput.dom,
      formInput.eventType,
      formInput.action,
      formInput.params ? formInput.params : null,
      formInput.preventDefaultEvent
    );
  });

  listenersLoaded = true;
}

function createLeave(controller) {
  controller.leaveOp("create");
}

function cancelLeave(controller) {
  if (selectedLeaveData.size > 0) {
    controller.leaveOp("cancel", Array.from(selectedLeaveData));
  } else {
    $.notify("Please select at least 1 leave.", "error");
  }
}

function calculateTotalAbsences(mod) {
  let sDate = $(formInput_StartDateContainer).val();
  if (mod == "sDate") {
    $(formInput_EndDateContainer).val(sDate);
  }
  let eDate = $(formInput_EndDateContainer).val();
  let isWeekEndResult = isWeekend(sDate, eDate);
  let totalDays = 0;
  let totalHrs = 0;

  if (sDate != "" && eDate != "") {
    const diffTime = Math.abs(new Date(eDate) - new Date(sDate));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    totalDays = diffDays;
    if (isWeekEndResult.isWeekend) {
      totalDays -= isWeekEndResult.count;
    }
    totalHrs = totalDays * 8;
    if (new Date(eDate) < new Date(sDate)) {
      $.notify("Invalid period.", "error");
      $("#numOfDays").html(0);
      $("#numOfHrs").html(0);
    } else {
      $("#numOfDays").html(totalDays);
      if (!$("#allDay").is(":checked")) {
        $("#numOfHrs").html("Min: 0.25, Max: 8 per day.");
      } else {
        $("#numOfHrs").html(totalHrs);
      }
    }
  } else {
    $("#numOfDays").html(0);
    $("#numOfHrs").html(0);
  }
}

function calculateTotalLeaves() {
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
  if (SICKLEAVE > 0 || LOCALEAVE > 0 || ANNUALLEAVE > 0 || UNPAIDLEAVE > 0) {
    $("#totalLeaveCount").val(
      SICKLEAVE + LOCALEAVE + ANNUALLEAVE + UNPAIDLEAVE
    );
  } else {
    $("#totalLeaveCount").val(0.0);
  }
}

function isWeekend(date1, date2) {
  var d1 = new Date(date1),
    d2 = new Date(date2),
    isWeekend = false;

  var result = { isWeekend: false, count: 0 };
  var count = 0;

  while (d1 <= d2) {
    var day = d1.getDay();
    isWeekend = day === 6 || day === 0;
    if (isWeekend) {
      result.isWeekend = true;
      count += 1;
    }
    d1.setDate(d1.getDate() + 1);
  }
  result.count = count;

  return result;
}

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

function checkToggleLeave(input) {
  $(input).find("input[type=checkbox]").click();
  $(".selectAreaLeave").each(function () {
    if (!$(input).find("input[type=checkbox]").prop("checked")) {
      $(this).find("input[type=checkbox]").prop("checked", false);
      selectedLeaveData.clear();
    } else {
      $(this).find("input[type=checkbox]").prop("checked", true);
      selectedLeaveData.add($(this).attr("data"));
    }
  });
  if (selectedLeaveData.size > 0) {
    $("#cancelLeave").show();
  } else {
    $("#cancelLeave").hide();
  }
}

function checkToggleCherryPick(input, data) {
  if ($(input).prop("checked")) {
    selectedLeaveData.add(data);
  } else {
    if (
      $("#thCheckLeave").find("input[type=checkbox]").prop("checked") &&
      selectedLeaveData.size > 1
    ) {
      $("#thCheckLeave")
        .find("input[type=checkbox]")
        .prop("indeterminate", true);
    } else {
      $("#thCheckLeave")
        .find("input[type=checkbox]")
        .prop("indeterminate", false);
      $("#thCheckLeave").find("input[type=checkbox]").prop("checked", false);
    }
    selectedLeaveData.delete(data);
  }
  if (selectedLeaveData.size > 0) {
    $("#cancelLeave").show();
  } else {
    $("#cancelLeave").hide();
  }
}
