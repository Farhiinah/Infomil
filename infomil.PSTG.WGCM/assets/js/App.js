class App {
  build() {
    return new Promise((resolve, reject) => {
      this.loadAllData()
        .then((dataList) => {
          let users = dataList[0];

          this.PAGE = window.location.href
            .replace("https://", "")
            .split("/")[1]
            .split(".")[0];
          this.USERLIST = [];
          this.TEAMLIST = [];
          this.ACCESSLIST = dataList[2];
          this.CURRENTUSER = this.loadUserAccess(
            JSON.parse(localStorage.getItem("CurrentUser")),
            this.ACCESSLIST
          );
          users.forEach((user) => {
            this.USERLIST.push(this.loadUserAccess(user, this.ACCESSLIST));
          });
          dataList[1].forEach((team) => {
            this.TEAMLIST.push(this.loadTeamsDetails(users, team));
          });
          this.checkCurrentPageInstance(this.PAGE);
          resolve(this);
        })
        .catch((error) => {
          reject(new Error(error).stack);
        });
    });
  }
  loadAllData() {
    return Promise.all([
      this._loadAllDataFx.loadUsers(),
      this._loadAllDataFx.loadTeams(),
      this._loadAllDataFx.loadAccess(),
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
  };
  loadUserAccess(user, accessList) {
    if (user) {
      accessList.forEach((access) => {
        if (access.ID == user.LVLOFACCESS) {
          user.LVLOFACCESS = access;
        }
      });
    }
    return user;
  }
  loadTeamsDetails(userlist, team) {
    let teamMembersList = [];
    userlist.find((user) => {
      if (user.ID == team.LEAD) {
        team.LEAD = user;
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
        if (currentLink.includes("_")) {
          currentLink = currentLink.replace(/[_]/g, " ");
        }
        if (currentLink == page) {
          $(this).removeClass("text-dark").addClass("text-white active");
        }
      });

      // Sidemenu mobile mobileActive
      $("a.menuItemMobile").each(function () {
        let currentLink = $(this).attr("href").split(".")[0];
        if (currentLink.includes("_")) {
          currentLink = currentLink.replace(/[_]/g, " ");
        }
        if (currentLink == page) {
          $(this).find("span").addClass("mobileActive");
        }
      });
    },
  };
}
