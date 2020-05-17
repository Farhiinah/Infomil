const requestsListContainer = "#requestsCardList";
const requestsCountContainer = "#totalRequests";

let listenersLoaded = false;

$(document).ready(function () {
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
      !listenersLoaded ? initListners(app, requestManager) : app.endLoad();
    })
    .catch((err) => {
      console.log(err);
    });
});

function initListners(app, requestManager) {
    let formInputListeners = [
      /*{
        dom: form_loginContainer,
        eventType: "submit",
        action: "login",
        params: loginManager,
        preventDefaultEvent: true,
      },*/
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