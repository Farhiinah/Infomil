const employeeCountContainer = "#totalEmployees";
const employeesListContainer = "#employeeCardList";
const teamsListContainer = "#teamsCardList";
const newEmpoyeeModalContainer = "#newEmpPopup";
const formName_NewUser = "#newUser";
const formInput_FistnameContainer = "#fname";
const formInput_LastnameContainer = "#lname";
const formInput_UsernameContainer = "#uname";
const formInput_EmailContainer = "#emailAdd";
const formInput_PasswordContainer = "#password";
const formInput_AccessLevelDropdownContainer = "#lvlAccessList";
const formInput_ProfilePictureContainer = "#profPic";
const formInput_SickLeaveContainer = "#sickLeave";
const formInput_LocalLeaveContainer = "#localLeave";
const formInput_AnnualLeaveContainer = "#annualLeave";

const employeesTabContainer = "#allEmp";
const teamsTabContainer = "#allTeams";

const teamCountContainer = "#totalTeams";
const newTeamModalContainer = "#newTeamsPopup";
const formName_NewTeam = "#newTeam";
const formInput_TeamName = "#teamName";
const formInput_TeamManagerListContainer = "#teamManagerList";
const formInput_TeamLeadListContainer = "#teamLeadList";
const formInput_TeamMemberListContainer = "#employeeList";
const fomrInput_leaveInputContainer = ".leaveInput";
const formInput_saveBtn = "#save";
const formInput_updateBtn = "#update";

let listenersLoaded = false;
let formData = { image: null, extension: null };

$(document).ready(function () {
  employeeLoadData();
});

let employeeLoadData = () => {
  new App()
    .build()
    .then((app) => {
      let employeeManager = new EmployeeManager(
        app.CURRENTUSER,
        app.USERLIST,
        app.ACCESSLIST,
        app.TEAMLIST
      );
      $(employeeCountContainer).html(app.USERLIST.length - 1);

      app.renderList(
        employeesListContainer,
        employeeManager.buildEmployeeList(),
        "No employee to display."
      );
      app.renderList(
        teamsListContainer,
        employeeManager.buildTeamList(),
        "No team to display."
      );

      let newEmployeeFormConstruct = employeeManager.buildNewEmployeeForm();
      app.renderList(
        formInput_AccessLevelDropdownContainer,
        newEmployeeFormConstruct.accessLvlDropdown,
        "No access level available."
      );

      $(teamCountContainer).html(app.TEAMLIST.length);

      let newTeamFormConstruct = employeeManager.buildNewTeamForm();
      app.renderList(
        formInput_TeamLeadListContainer,
        newTeamFormConstruct.teamLeadDropdown,
        "No team lead available."
      );

      app.renderList(
        formInput_TeamManagerListContainer,
        newTeamFormConstruct.teamManagerDropdown,
        "No manager available."
      );

      let teamMemberData = newTeamFormConstruct.teamMemberDropdown;

      if (teamMemberData.length == 0) {
        $(formInput_TeamMemberListContainer).html("");
      }
      $(formInput_TeamMemberListContainer).select2({
        data: teamMemberData,
        placeholder: "",
        allowClear: true,
        minimumResultsForSearch: 5,
      });

      !listenersLoaded ? initListners(app, employeeManager) : app.endLoad();
    })
    .catch((err) => {
      console.log(err);
    });
};

function initListners(app, employeeManager) {
  const randomUsernameAction = "generateUsername";
  let formInputListeners = [
    {
      dom: formInput_FistnameContainer,
      eventType: "blur",
      action: randomUsernameAction,
      preventDefaultEvent: false,
    },
    {
      dom: formInput_LastnameContainer,
      eventType: "blur",
      action: randomUsernameAction,
      preventDefaultEvent: false,
    },
    {
      dom: formInput_ProfilePictureContainer,
      eventType: "change",
      action: "loadImage",
      params: formInput_ProfilePictureContainer,
      preventDefaultEvent: false,
    },
    {
      dom: formName_NewUser,
      eventType: "submit",
      action: "createUser",
      params: employeeManager,
      preventDefaultEvent: true,
    },
    {
      dom: formInput_AccessLevelDropdownContainer,
      eventType: "change",
      action: "toggleLeaveInput",
      params: formInput_AccessLevelDropdownContainer,
      preventDefaultEvent: false,
    },
    {
      dom: formName_NewTeam,
      eventType: "submit",
      action: "createTeam",
      params: employeeManager,
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

function generateUsername() {
  let firstLetter = $(formInput_FistnameContainer)
    .val()
    .trim()
    .toLowerCase()
    .substring(0, 1);
  let secondLetter = $(formInput_LastnameContainer)
    .val()
    .trim()
    .toLowerCase()
    .substring(0, 1);
  if (firstLetter != "" && secondLetter != "") {
    $(formInput_UsernameContainer).val(
      firstLetter + secondLetter + Math.floor(100000 + Math.random() * 900000)
    );
  }
}

function loadImage(elementId) {
  let input = document.getElementById(elementId.split("#")[1]);
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      formData.extension = e.target.result.split(";")[0].split("/")[1];
      formData.image = e.target.result.split(",")[1];
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function createUser(controller) {
  controller.userOp("create");
}

function createTeam(controller) {
  controller.teamOp("create");
}

function changeTab(tab) {
  $(".tabItem").each(function () {
    if ($(this).find("a").html() == tab) {
      $(this).find("a").removeClass("text-dark").addClass("text-white");
      $(this).addClass("active");
    } else {
      $(this).find("a").removeClass("text-white").addClass("text-dark");
      $(this).removeClass("active");
    }
  });
  if (tab == "All employees") {
    $(employeesTabContainer).show("slow");
    $(teamsTabContainer).hide("fast");
  }
  if (tab == "Teams") {
    $(teamsTabContainer).show("slow");
    $(employeesTabContainer).hide("fast");
  }
}

function toggleLeaveInput(input) {
  if($(input).children("option:selected").val() != "87e096fd6d7a4e19ae4135b39e485b07"){
    $(fomrInput_leaveInputContainer).each(function () {
      $(this).show();
      $(this).find('input').prop('required', true);
    });
  }
  else {
    $(fomrInput_leaveInputContainer).each(function () {
      $(this).hide();
      $(this).find('input').prop('required', false);
    });
  }
}