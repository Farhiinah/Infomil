const leavesCountContainer = "#totalLeaves";
const leavesListContainer = "#leavesCardList";
const modalContainer = "#newLeave";
const formName_NewLeave = "#newUser";
const formInput_LeaveTypeContainer = "#leaveTypeList";
const formInput_StartDateContainer = "#startDate";
const formInput_EndDateContainer = "#endDate";
const formInput_CommentContainer = "#comments";

let listenersLoaded = false;

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
      app.renderList(
        leavesListContainer,
        leaveConstruct.leaveList,
        "No leave to display."
      );

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
