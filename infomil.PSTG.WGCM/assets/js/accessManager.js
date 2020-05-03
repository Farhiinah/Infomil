$(document).ready(function () {
  setAccessManagerPagedata();
  $("#newAccessLvl").click(function () {
    $("#accessErrLbl").hide();
    let accessLvl = {
      NAME: $("#accessLvlName").val().trim(),
      MANAGEUSER: $("#accessLvlUsers").is(":checked"),
      MANAGELEAVES: $("#accessLvlLeaves").is(":checked"),
      MANAGEACCESS: $("#accessLvlAccess").is(":checked"),
      VIEWREPORTS: $("#accessLvlReports").is(":checked"),
      ISAPPROVER: $("#accessLvlApprover").is(":checked"),
      MANAGETEAMS: $("#accessLvlTeams").is(":checked"),
    };
    if (accessLvl.NAME != "") {
      makeAjaxReq(
        "Access_Manager.aspx/SetAccesslevel",
        JSON.stringify(accessLvl)
      )
        .then((response) => {
          if (response.d == "OK") {
            $("#newAccesslvlPopup").modal("hide");
            setAccessManagerPagedata();
            $.notify("Access level created", "success");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      $("#accessErrLbl").show();
      $("#accessErrLbl").html("Name is required.");
    }
  });
});

let setAccessManagerPagedata = () => {
  $("#AccessList").html("");
  makeAjaxReq("Access_Manager.aspx/GetAccesslist", null).then((response) => {
    let accessLvl = response.d;
    let numOfAccessLvl = accessLvl.length;
    if (numOfAccessLvl > 0) {
      $("#totalAccess").html(numOfAccessLvl);
      accessLvl.forEach((access, index) => {
        $("#AccessList").append(`
        <div class="card">
          <div
            class="card-header collapsed""
            id="${access.NAME}"
            data-toggle="collapse"
            data-target="#accessLvlAccordion_${access.ID}"
            style="cursor: pointer;"
          >
            <span style="font-size: 1.3em;">
                ${access.NAME} 
                ${
                  index > 1
                    ? `<span style="float:right; color: #dc3545;" onclick="delAccessLvl('${access.ID}')">
                <i class="fa fa-trash"></i>
            </span>`
                    : ""
                }
            </span>
          </div>
        
          <div
            id="accessLvlAccordion_${access.ID}"
            class="collapse"
            aria-labelledby="${access.NAME}"
            data-parent="#AccessList"
          >
            <div class="card-body">
                <div class="container">
                    <div class="row">
                        <div class="col-sm">
                            <label>
                                <input type="checkbox" data-toggle="toggle" disabled ${
                                  access.MANAGEUSER == "true" ? "checked" : ""
                                }>
                                Manage users
                            </label>
                        </div>
                        <div class="col-sm">
                            <label>
                                <input type="checkbox" data-toggle="toggle" disabled ${
                                  access.MANAGELEAVES == "true" ? "checked" : ""
                                }>
                                Manage leaves
                            </label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm">
                            <label>
                                <input type="checkbox" data-toggle="toggle" disabled ${
                                  access.MANAGEACCESS == "true" ? "checked" : ""
                                }>
                                Manage access
                            </label>
                        </div>
                        <div class="col-sm">
                            <label>
                                <input type="checkbox" data-toggle="toggle" disabled ${
                                  access.VIEWREPORTS == "true" ? "checked" : ""
                                }>
                                View reports
                            </label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm">
                            <label>
                                <input type="checkbox" data-toggle="toggle" disabled ${
                                  access.ISAPPROVER == "true" ? "checked" : ""
                                }>
                                Approver
                            </label>
                        </div>
                        <div class="col-sm">
                            <label>
                                <input type="checkbox" data-toggle="toggle" disabled ${
                                  access.MANAGETEAMS == "true" ? "checked" : ""
                                }>
                                Manage teams
                            </label>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
              `);
      });
    } else {
      $("#AccessList").append(
        `<div style="width: 80%; margin: 0 auto;"><p style="text-align: center;">No access level to display.</p></div>`
      );
    }
  });
};

let delAccessLvl = (id) => {
  bootpopup.confirm(
    "Are you sure you want to delete this access?",
    "Delete access",
    function (ans) {
      if (ans) {
        makeAjaxReq("Access_Manager.aspx/DelAccesslevel", "{ID: '" + id + "'}").then(
          (response) => {
            if (response.d == "OK") {
              setAccessManagerPagedata();
              $.notify("Deletion successful", "success");
            }
          }
        );
      }
    }
  );
};

