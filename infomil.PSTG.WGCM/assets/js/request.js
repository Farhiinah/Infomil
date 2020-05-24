const requestsListContainer = "#requestsCardList";
const requestsCountContainer = "#totalRequests";

let listenersLoaded = false;
let selectedRequestData = new Set();

$(document).ready(function () {
  loadRequests();
});

function loadRequests() {
  new App()
    .build()
    .then((app) => {
      let requestManager = new RequestManager(
        app.CURRENTUSER,
        app.USERLIST,
        app.ACCESSLIST,
        app.TEAMLIST,
        app.LEAVELIST
      );
      let requestsConstruct = requestManager.buildRequestList();
      $(requestsCountContainer).html(requestsConstruct.length);
      app.renderList(
        requestsListContainer,
        requestsConstruct,
        "No requests to display."
      );
      $("#requestTable").DataTable();
      !listenersLoaded ? initListners(app, requestManager) : app.endLoad();
    })
    .catch((err) => {
      console.log(err);
    });
}

function initListners(app, requestManager) {
  let formInputListeners = [
    {
      dom: "#approveBtn",
      eventType: "click",
      action: "requestMod",
      params: { controller: requestManager, mod: "approve" },
      preventDefaultEvent: true,
    },
    {
      dom: "#escalateBtn",
      eventType: "click",
      action: "requestMod",
      params: { controller: requestManager, mod: "escalate" },
      preventDefaultEvent: true,
    },
    {
      dom: "#rejectBtn",
      eventType: "click",
      action: "requestMod",
      params: { controller: requestManager, mod: "reject" },
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

function checkToggle(input) {
  $(input).find("input[type=checkbox]").click();
  $(".selectAreaRequest").each(function () {
    if (!$(input).find("input[type=checkbox]").prop("checked")) {
      $(this).find("input[type=checkbox]").prop("checked", false);
      selectedRequestData.clear();
    } else {
      $(this).find("input[type=checkbox]").prop("checked", true);
      selectedRequestData.add($(this).attr("data"));
    }
  });
}

function checkToggleCherryPick(input, data) {
  if ($(input).prop("checked")) {
    selectedRequestData.add(data);
  } else {
    if (
      $("#thCheck").find("input[type=checkbox]").prop("checked") &&
      selectedRequestData.size > 1
    ) {
      $("#thCheck").find("input[type=checkbox]").prop("indeterminate", true);
    } else {
      $("#thCheck").find("input[type=checkbox]").prop("indeterminate", false);
      $("#thCheck").find("input[type=checkbox]").prop("checked", false);
    }
    selectedRequestData.delete(data);
  }
}

function requestMod(params) {
  let controller = params.controller;
  let mod = params.mod;
  if (selectedRequestData.size > 0) {
    controller.requestMod(mod, Array.from(selectedRequestData));
  } else {
    $.notify("Select at least 1 request.", "error");
  }
}
