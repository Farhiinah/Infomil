(function () {
  "use strict";
  /*jslint browser: true*/
  /*global $, jQuery, alert*/
  // Defaultly Hiding sidebar Overlay
  $("#sidebar_overlay").hide();

  // Tooltip

  if ($('[data-toggle="tooltip"]').length > 0) {
    $('[data-toggle="tooltip"]').tooltip();
  }
  // Select 2

  if ($(".select").length > 0) {
    $(".select").select2({
      minimumResultsForSearch: -1,
      width: "100%",
    });
  }
  // Date Time Picker

  if ($(".datetimepicker").length > 0) {
    $(".datetimepicker").datetimepicker({
      format: "DD/MM/YYYY",
      icons: {
        up: "fa fa-angle-up",
        down: "fa fa-angle-down",
        next: "fa fa-angle-right",
        previous: "fa fa-angle-left",
      },
    });
  }

  $(window).on("load", function () {
    $("#loader").delay(100).fadeOut("slow");
    $("#loader-wrapper").delay(500).fadeOut("slow");
    $("body").delay(500).css({ overflow: "visible" });
  });

  //sidebar open and close
  $(document).on("click", "#open_navSidebar", function () {
    $("#offcanvas_menu").css("width", "250px");
    $("#sidebar_overlay").show();
    $(".inner-wrapper").css("overflow", "hidden");
  });

  $(document).on("click", "#close_navSidebar", function () {
    $("#offcanvas_menu").css("width", "0px");
    $("#sidebar_overlay").hide();
    $(".inner-wrapper").css("overflow", "scroll");
  });

  $(document).on("click", "#sidebar_overlay", function () {
    $("#offcanvas_menu").css("width", "0px");
    $("#sidebar_overlay").hide();
  });

  /*================================
    stickey sidebar
    ==================================*/

  if ($(window).width() > 767) {
    if ($(".theiaStickySidebar").length > 0) {
      $(".theiaStickySidebar").theiaStickySidebar({
        // Settings
        additionalMarginTop: 20,
      });
    }
  }
})();

let makeAjaxReq = async (url, method) => {
  return await $.ajax({
    url: url,
    method: method,
    contentType: "application/json",
    dataType: "json",
  });
};

let setPagedata = (user) => {
    let currentUserData = JSON.parse(user);
  $("#userFullname").html(
    currentUserData.FIRSTNAME + " " + currentUserData.LASTNAME
  );
  $(".profilePic").each(function() {
    $(this).attr("src", currentUserData.PROFILEPIC);
  });
  $("#currentDate").html(getCurrentDate());
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
    return month + "\n" + day + "," + year;
};
