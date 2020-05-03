let page = window.location.href
  .replace("https://", "")
  .split("/")[1]
  .split(".")[0];

$(document).ready(function () {
  let user = localStorage.getItem("CurrentUser");
  if (user) {

    // Check if user exist/active
    
    // END

    if (page == "Login") {
      window.location.href = "/Dashboard.aspx";
    } else {
      loadBreadcrumb();
      setProfileData(JSON.parse(user));
      setMenuItemActive();
    }
  } else {
    if (page != "Login") {
      window.location.href = "/Login.aspx";
    }
  }

  // Init logout button
  if (page != "Login") {
    $("#logoutBtn").click(function () {
      localStorage.clear();
      window.location.href = "/Login.aspx";
    });
  }
});

let loadBreadcrumb = () => {
  if (page.includes("_")) {
    page = page.replace(/[_]/g, " ");
  }
  $("#breadcrumb").html(
    `<li class="breadcrumb-item d-inline-block active">${page}</li>`
  );
};

let setMenuItemActive = () => {
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
};

let makeAjaxReq = async (url, data) => {
  return await $.ajax({
    url: url,
    method: "POST",
    contentType: "application/json",
    dataType: "json",
    data: data,
  });
};

let getCurrentDate = () => {
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
  let dateObj = new Date(),
    month = monthNames[dateObj.getMonth()],
    day = String(dateObj.getDate()).padStart(2, "0"),
    year = dateObj.getFullYear();
  return month + "\n" + day + ", " + year;
};

let setProfileData = (user) => {
  $("#userFullname").html(user.FIRSTNAME + " " + user.LASTNAME);
  $(".profilePic").each(function () {
    $(this).attr("src", user.PROFILEPIC);
  });
  $("#currentDate").html(getCurrentDate()); // Set current date
};

let capitalize = (str) => {
  let splitStr = str.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  return splitStr.join(' '); 
}