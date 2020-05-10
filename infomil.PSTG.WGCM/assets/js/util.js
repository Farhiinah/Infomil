let makeAjaxReq = async (url, data) => {
  return await $.ajax({
    url: url,
    method: "POST",
    contentType: "application/json",
    dataType: "json",
    data: data,
  });
};

let capitalize = (str) => {
  let splitStr = str.toLowerCase().split(" ");
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
};

/**
 * @desc: Enforce rights depending on profile
 */

let leaveManagementRights = (hasRights) => {
  if (!hasRights) {
    $(".leaveManagement").each(function () {
      $(this).hide();
    });
  }
};

let userManagementRights = (hasRights) => {
  if (!hasRights) {
    $(".userManagement").each(function () {
      $(this).hide();
    });
  }
};

/**
 * @desc: Init required scripts
 */
