const form_loginContainer = "#loginForm";

let listenersLoaded = false;

$(document).ready(function () {
  new App()
    .build() 
    .then((app) => {
      let loginManager = new LoginManager(
        app.USERLIST,
        app.ACCESSLIST,
        app.TEAMLIST
      );
      !listenersLoaded ? initListners(app, loginManager) : app.endLoad();
    })
    .catch((err) => {
      console.log(err);
    });
});

function initListners(app, loginManager) {
  let formInputListeners = [
    {
      dom: form_loginContainer,
      eventType: "submit",
      action: "login",
      params: loginManager,
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

function login(loginManager) {
  loginManager.doLogin();
}
