const accessCountContainer = "#totalAccess";
const accessListContainer = "#AccessList";
const newAccessModalContainer = "#newAccesslvlPopup";
const formName_NewAccess = "#newAccessLvl";
const formInput_AccessNameContainer = "#accessLvlName";
const formInput_ManageUserRadioContainer = "#accessLvlUsers";
const formInput_ManageLeavesRadioContainer = "#accessLvlLeaves";
const formInput_ManageAccessRadioContainer = "#accessLvlAccess";
const formInput_ManageReportsRadioContainer = "#accessLvlReports";
const formInput_ApprovalRadioContainer = "#accessLvlApprover";
const formInput_ManagerTeamsRadioContainer = "#accessLvlTeams";

let listenersLoaded = false;

$(document).ready(function () {
  accessLoadData();
});

let accessLoadData = () => {
  new App()
    .build()
    .then((app) => {
      let accessManager = new AccessManager(
        app.CURRENTUSER,
        app.USERLIST,
        app.ACCESSLIST,
        app.TEAMLIST
      );

      $(accessCountContainer).html(app.ACCESSLIST.length);

      app.renderList(
        accessListContainer,
        accessManager.buildAccessList(),
        "No access to display."
      );
      
      !listenersLoaded ? initListners(app, accessManager) : app.endLoad();
    })
    .catch((err) => {
      console.log(err);
    });
};

function initListners(app, accessManager) {
  let formInputListeners = [
    {
      dom: formName_NewAccess,
      eventType: "submit",
      action: "createAccess",
      params: accessManager,
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

function createAccess(controller) {
  controller.accessLevelOp("create");
}