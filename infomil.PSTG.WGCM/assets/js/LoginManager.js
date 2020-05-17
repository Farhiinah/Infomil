class LoginManager {
  constructor(userList, accessList, teamList) {
    this.USERLIST = userList;
    this.ACCESSLIST = accessList;
    this.TEAMLIST = teamList;
  }
  doLogin() {
    let userData = {
      username: $("#uname").val().trim(),
      password: $("#pswd").val().trim(),
    };
    if (this.USERLIST.length > 0) {
        let currentUser = this.USERLIST.find(
          (user) =>
            user.USERNAME == userData.username &&
            user.PASSWORD == userData.password
        );
      if (currentUser != null && localStorage) {
        localStorage.setItem("CurrentUser", JSON.stringify(currentUser));
        window.location.href = "/Dashboard.aspx";
      }
      else {
        $.notify("Incorrect username or password.", "error");
      }
    }
    else {
        $.notify("No user found.", "error");
    }
  }
}
