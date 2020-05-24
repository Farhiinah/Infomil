class App {
  build() {
    return new Promise((resolve, reject) => {
      this.loadAllData()
        .then((dataList) => {
          let users = dataList[0];
          if(localStorage && localStorage.getItem("CurrentUser") != null) { 
            this.reloadCurrentUser(dataList[0]);
          }
          this.PAGE = window.location.href
            .replace("https://", "")
            .split("/")[1]
            .split(".")[0];
          this.USERLIST = [];
          this.TEAMLIST = []; 
          this.LEAVELIST = dataList[3];
          this.ACCESSLIST = dataList[2];
          this.CURRENTUSER = localStorage && localStorage.getItem("CurrentUser") != null ? this.loadUserDetails(
            JSON.parse(localStorage.getItem("CurrentUser")),
            this.ACCESSLIST,
            this.LEAVELIST
          ) : null;
          users.forEach((user) => {
            this.USERLIST.push(this.loadUserDetails(user, this.ACCESSLIST, this.LEAVELIST));
          });
          dataList[1].forEach((team) => {
            this.TEAMLIST.push(this.loadTeamsDetails(users, team));
          });
          this.checkCurrentPageInstance(this.PAGE);
          localStorage.getItem("CurrentUser") != null ? this.enforceUserRights(this.CURRENTUSER) : this.endLoad();
          resolve(this);
        })
        .catch((error) => {
          reject(new Error(error).stack);
        });
    });
  }
  reloadCurrentUser(userlist) {
    let currentUser = userlist.find(
      (user) =>
        user.ID == JSON.parse(localStorage.getItem("CurrentUser")).ID
    );
    localStorage.setItem("CurrentUser", JSON.stringify(currentUser));
  }
  loadAllData() {
    return Promise.all([
      this._loadAllDataFx.loadUsers(),
      this._loadAllDataFx.loadTeams(),
      this._loadAllDataFx.loadAccess(),
      this._loadAllDataFx.loadLeaves(),
    ]);
  }
  _loadAllDataFx = {
    loadUsers: () => {
      return new Promise((resolve, reject) => {
        makeAjaxReq("Employees.aspx/GetUserList", null)
          .then((response) => {
            resolve(response.d);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    loadTeams: () => {
      return new Promise((resolve, reject) => {
        makeAjaxReq("Employees.aspx/GetTeamlist", null)
          .then((response) => {
            resolve(response.d);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    loadAccess: () => {
      return new Promise((resolve, reject) => {
        makeAjaxReq("Access_Manager.aspx/GetAccesslist", null)
          .then((response) => {
            resolve(response.d);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    loadLeaves: () => {
      return new Promise((resolve, reject) => {
        makeAjaxReq("Leaves_Manager.aspx/GetLeavelist", null)
          .then((response) => {
            resolve(response.d);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  };
  loadUserDetails(user, accessList, leaveList) {
    if (user) {
      accessList.forEach((access) => {
        if (access.ID == user.LVLOFACCESS) {
          user.LVLOFACCESS = access;
        }
      });
      let currentUserLeaves = user.LEAVELIST.includes(";") ? user.LEAVELIST.split(";") : user.LEAVELIST.toString();
      let userLeaveList = [];
      leaveList.forEach((leave) => {
        if(Array.isArray(currentUserLeaves)) {
          currentUserLeaves.forEach((userLeave) => {
            if(userLeave == leave.ID) {
              userLeaveList.push(leave);
            }
          });
        }
        else {
          if(currentUserLeaves == leave.ID) {
            userLeaveList.push(leave);
          }
        }
      });
      user.LEAVELIST = userLeaveList;
    }
    return user;
  }
  loadTeamsDetails(userlist, team) {
    let teamMembersList = [];
    userlist.find((user) => {
      if (user.ID == team.LEAD) {
        team.LEAD = user;
      }
      if(user.ID == team.TEAMMANAGER) {
        team.TEAMMANAGER = user;
      }
      let currentTeamMembers = team.MEMBERS;
      currentTeamMembers.split(";").forEach((teamMember) => {
        if (teamMember == user.ID) {
          teamMembersList.push(user);
        }
      });
    });
    team.MEMBERS = teamMembersList;
    return team;
  }
  checkCurrentPageInstance(currentPage) {
    if (this.CURRENTUSER) {
      if (currentPage == "Login") {
        window.location.href = "/Dashboard.aspx";
      } else {
        this._checkCurrentPageInstanceFx.loadBreadcrumb(currentPage);
        this._checkCurrentPageInstanceFx.setProfileData(this.CURRENTUSER);
        this._checkCurrentPageInstanceFx.setMenuItemActive(currentPage);
      }
    } else if (currentPage != "Login") {
      window.location.href = "/Login.aspx";
    }
    // Init logout button
    if (currentPage != "Login") {
      $("#logoutBtn").click(function () {
        localStorage.clear();
        window.location.href = "/Login.aspx";
      });
    }
  }
  _checkCurrentPageInstanceFx = {
    loadBreadcrumb: (page) => {
      if (page.includes("_")) {
        page = page.replace(/[_]/g, " ");
      }
      $("#breadcrumb").html(
        `<li class="breadcrumb-item d-inline-block active">${page}</li>`
      );
    },
    setProfileData: (user) => {
      $("#userFullname").html(user.FIRSTNAME + " " + user.LASTNAME);
      $(".profilePic").each(function () {
        $(this).attr("src", user.PROFILEPIC);
      });
      $("#currentDate").html(
        this._checkCurrentPageInstanceFx._setProfileDataFx.getCurrentDate()
      ); // Set current date
    },
    _setProfileDataFx: {
      getCurrentDate: () => {
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        let dateObj = new Date();
        return (
          monthNames[dateObj.getMonth()] +
          "\n" +
          String(dateObj.getDate()).padStart(2, "0") +
          ", " +
          dateObj.getFullYear()
        );
      },
    },
    setMenuItemActive: (page) => {
      // Sidemenu
      $("a.menuItem").each(function () {
        let currentLink = $(this).attr("href").split(".")[0];
        if (currentLink == page) {
          if (currentLink.includes("_")) {
            currentLink = currentLink.replace(/[_]/g, " ");
          }
          $(this).removeClass("text-dark").addClass("text-white active");
        }
      });

      // Sidemenu mobile mobileActive
      $("a.menuItemMobile").each(function () {
        let currentLink = $(this).attr("href").split(".")[0];
        if (currentLink == page) {
          if (currentLink.includes("_")) {
            currentLink = currentLink.replace(/[_]/g, " ");
          }
          $(this).find("span").addClass("mobileActive");
        }
      });
    },
  };
  renderList(domContainer, list, emptyMessage) {
    $(domContainer).html("");
    if (list.length > 0) {
      list.forEach((item) => {
        $(domContainer).append(item);
      });
    } else {
      if($(domContainer).is('select')) {
        $(domContainer).html(
          `<option value="">${emptyMessage}</div>`
        );
      }
      else {
        if(emptyMessage != null) {
          $(domContainer).html(
            `<div style="width: 80%; margin: 0 auto;"><p style="text-align: center;">${emptyMessage}</p></div>`
          );
        }
      }
    }
  }
  addListener(domContainer, listener, action, params, preventDefault) {
    let fn = this._addListenerFx.getFunctionByName(action);
    $(domContainer).on(listener, function (event) {
      preventDefault
        ? event.preventDefault()
        : console.log("Default event: " + event.type);
      try {
        fn.call(this, params);
      } catch (e) {
        console.log(e);
      }
    });
  }
  _addListenerFx = {
    getFunctionByName: (functionName, context) => {
      if (typeof window == "undefined") {
        context = context || global;
      } else {
        context = context || window;
      }
      let namespaces = functionName.split(".");
      let functionToExecute = namespaces.pop();
      for (let i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
      }
      if (context) {
        return context[functionToExecute];
      } else {
        return undefined;
      }
    },
  };
  endLoad() {
    console.log("Page loaded");
  }
  enforceUserRights(currentUser) {
    let rights = currentUser.LVLOFACCESS;
    if (rights.MANAGELEAVES != "true") {
      $(".leaveManagement").each(function () {
        $(this).hide();
      });
    }
    if (rights.MANAGEUSER != "true") {
      $(".userManagement").each(function () {
        $(this).hide();
      });
    }
    if (rights.MANAGEACCESS != "true") {
      $(".accessManagement").each(function () {
        $(this).hide();
      });
    }
    if (rights.VIEWREPORTS != "true") {
      $(".reportsManagement").each(function () {
        $(this).hide();
      });
    }
    if (rights.ISAPPROVER != "true") {
      $(".requestManagement").each(function () {
        $(this).hide();
      });
    }
  }
}