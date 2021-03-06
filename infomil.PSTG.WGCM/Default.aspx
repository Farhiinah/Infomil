﻿<%@ Page Title="Leaves Manager" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="infomil.PSTG.WGCM._Default" %>

<asp:Content ID="DefaultContent" ContentPlaceHolderID="index" runat="server">
    <!-- Inner wrapper -->
    <div class="inner-wrapper">
        <!-- Header -->
        <header class="header">
            <!-- Top Header Section -->
            <div class="top-header-section">
                <div class="container-fluid">
                    <div class="row align-items-center">
                        <div class="col-lg-3 col-md-3 col-sm-3 col-6">
                            <div class="logo my-3 my-sm-0">
                                <a href="Default.aspx">
                                    <img src="assets/img/logo.png" alt="logo image" class="img-fluid" width="100">
                                </a>
                            </div>
                        </div>
                        <div class="col-lg-9 col-md-9 col-sm-9 col-6 text-right">
                            <div class="user-block d-none d-lg-block">
                                <div class="row align-items-center">
                                    <div class="col-lg-12 col-md-12 col-sm-12">
                                        <!-- User notification-->
                                        <div class="user-notification-block align-right d-inline-block">
                                            <ul class="list-inline m-0">
                                                <li class="list-inline-item" data-toggle="tooltip" data-placement="top" title="" data-original-title="Apply Leave">
                                                    <a href="leave.html" class="font-23 menu-style text-white align-middle">
                                                        <span class="lnr lnr-briefcase position-relative"></span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <!-- /User notification-->

                                        <!-- user info-->
                                        <div class="user-info align-right dropdown d-inline-block header-dropdown">
                                            <a href="javascript:void(0)" data-toggle="dropdown" class=" menu-style dropdown-toggle">
                                                <div class="user-avatar d-inline-block">
                                                    <img src="" alt="user avatar" class="rounded-circle img-fluid profilePic" style="object-fit: cover; width: 55px; height: 55px;">
                                                </div>
                                            </a>

                                            <!-- Notifications -->
                                            <div class="dropdown-menu notification-dropdown-menu shadow-lg border-0 p-3 m-0 dropdown-menu-right">
                                                <a class="dropdown-item p-2" href="employment.html">
                                                    <span class="media align-items-center">
                                                        <span class="lnr lnr-user mr-3"></span>
                                                        <span class="media-body text-truncate">
                                                            <span class="text-truncate">Profile</span>
                                                        </span>
                                                    </span>
                                                </a>
                                                <a class="dropdown-item p-2" href="settings.html">
                                                    <span class="media align-items-center">
                                                        <span class="lnr lnr-cog mr-3"></span>
                                                        <span class="media-body text-truncate">
                                                            <span class="text-truncate">Settings</span>
                                                        </span>
                                                    </span>
                                                </a>
                                                <a id="logoutBtn" class="dropdown-item p-2" href="javascript:void(0)">
                                                    <span class="media align-items-center">
                                                        <span class="lnr lnr-power-switch mr-3"></span>
                                                        <span class="media-body text-truncate">
                                                            <span class="text-truncate">Logout</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </div>
                                            <!-- Notifications -->

                                        </div>
                                        <!-- /User info-->

                                    </div>
                                </div>
                            </div>
                            <div class="d-block d-lg-none">
                                <a href="javascript:void(0)">
                                    <span class="lnr lnr-user d-block display-5 text-white" id="open_navSidebar"></span>
                                </a>

                                <!-- Offcanvas menu -->
                                <div class="offcanvas-menu" id="offcanvas_menu">
                                    <span class="lnr lnr-cross float-left display-6 position-absolute t-1 l-1 text-white" id="close_navSidebar"></span>
                                    <div class="user-info align-center bg-theme text-center">
                                        <a href="javascript:void(0)" class="d-block menu-style text-white">
                                            <div class="user-avatar d-inline-block mr-3">
                                                <img src="assets/img/profiles/img-6.jpg" alt="user avatar" class="rounded-circle img-fluid" width="55">
                                            </div>
                                        </a>
                                    </div>
                                    <div class="user-notification-block align-center">
                                        <div class="top-nav-search">
                                            <form>
                                                <input type="text" class="form-control" placeholder="Search here">
                                                <button class="btn" type="submit"><i class="fa fa-search"></i></button>
                                            </form>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="user-menu-items px-3 m-0">
                                        <a class="px-0 pb-2 pt-0" href="index.html">
                                            <span class="media align-items-center">
                                                <span class="lnr lnr-home mr-3"></span>
                                                <span class="media-body text-truncate text-left">
                                                    <span class="text-truncate text-left">Dashboard</span>
                                                </span>
                                            </span>
                                        </a>
                                        <a class="p-2" href="employees.html">
                                            <span class="media align-items-center">
                                                <span class="lnr lnr-users mr-3"></span>
                                                <span class="media-body text-truncate text-left">
                                                    <span class="text-truncate text-left">Employés</span>
                                                </span>
                                            </span>
                                        </a>
                                        <a class="p-2" href="company.html">
                                            <span class="media align-items-center">
                                                <span class="lnr lnr-apartment mr-3"></span>
                                                <span class="media-body text-truncate text-left">
                                                    <span class="text-truncate text-left">Compagnie</span>
                                                </span>
                                            </span>
                                        </a>
                                        <a class="p-2" href="calendar.html">
                                            <span class="media align-items-center">
                                                <span class="lnr lnr-calendar-full mr-3"></span>
                                                <span class="media-body text-truncate text-left">
                                                    <span class="text-truncate text-left">Calendrier</span>
                                                </span>
                                            </span>
                                        </a>
                                        <a class="p-2" href="leave.html">
                                            <span class="media align-items-center">
                                                <span class="lnr lnr-briefcase mr-3"></span>
                                                <span class="media-body text-truncate text-left">
                                                    <span class="text-truncate text-left">Leave</span>
                                                </span>
                                            </span>
                                        </a>

                                        <a class="p-2" href="reports.html">
                                            <span class="media align-items-center">
                                                <span class="lnr lnr-rocket mr-3"></span>
                                                <span class="media-body text-truncate text-left">
                                                    <span class="text-truncate text-left">Rapports</span>
                                                </span>
                                            </span>
                                        </a>


                                        <a class="p-2" href="employment.html">
                                            <span class="media align-items-center">
                                                <span class="lnr lnr-user mr-3"></span>
                                                <span class="media-body text-truncate text-left">
                                                    <span class="text-truncate text-left">Profile</span>
                                                </span>
                                            </span>
                                        </a>
                                        <a class="p-2" href="login.html">
                                            <span class="media align-items-center">
                                                <span class="lnr lnr-power-switch mr-3"></span>
                                                <span class="media-body text-truncate text-left">
                                                    <span class="text-truncate text-left">Logout</span>
                                                </span>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                                <!-- /Offcanvas menu -->

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /Top Header Section -->

        </header>
        <!-- /Header -->

        <!-- Content -->
        <div class="page-wrapper">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xl-3 col-lg-4 col-md-12 theiaStickySidebar">
                        <aside class="sidebar sidebar-user">
                            <div class="row">
                                <div class="col-12">
                                    <div class="card ctm-border-radius shadow-sm grow">
                                        <div class="card-body py-4">
                                            <div class="row">
                                                <div class="col-md-12 mr-auto text-left">
                                                    <div class="custom-search input-group">
                                                        <div class="custom-breadcrumb">
                                                            <ol class="breadcrumb no-bg-color d-inline-block p-0 m-0 mb-2">
                                                                <li class="breadcrumb-item d-inline-block"><a href="index.html" class="text-dark">Home</a></li>
                                                                <li class="breadcrumb-item d-inline-block active">Dashboard</li>
                                                            </ol>
                                                            <h4 class="text-dark">Admin Dashboard</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="user-card card shadow-sm bg-white text-center ctm-border-radius grow">
                                <div class="user-info card-body">
                                    <div class="user-avatar mb-4">
                                        <img src="assets/img/profiles/img-13.jpg" alt="User Avatar" class="img-fluid rounded-circle profilePic"  style="object-fit: cover; width: 100px; height: 100px;">
                                    </div>
                                    <div class="user-details">
                                        <h4><b>Welcome <span id="userFullname"></span></b></h4>
                                        <p id="currentDate"></p>
                                    </div>
                                </div>
                            </div>
                            <!-- Sidebar -->
                            <div class="sidebar-wrapper d-lg-block d-md-none d-none">
                                <div class="card ctm-border-radius shadow-sm border-none grow">
                                    <div class="card-body">
                                        <div class="row no-gutters">
                                            <div class="col-6 align-items-center text-center">
                                                <a href="index.html" class="text-white active p-4 first-slider-btn ctm-border-right ctm-border-left ctm-border-top"><span class="lnr lnr-home pr-0 pb-lg-2 font-23"></span><span class="">Dashboard</span></a>
                                            </div>
                                            <div class="col-6 align-items-center shadow-none text-center">
                                                <a href="employees.html" class="text-dark p-4 second-slider-btn ctm-border-right ctm-border-top"><span class="lnr lnr-users pr-0 pb-lg-2 font-23"></span><span class="">Employés</span></a>
                                            </div>
                                            <div class="col-6 align-items-center shadow-none text-center">
                                                <a href="company.html" class="text-dark p-4 ctm-border-right ctm-border-left"><span class="lnr lnr-apartment pr-0 pb-lg-2 font-23"></span><span class="">Compagnie</span></a>
                                            </div>
                                            <div class="col-6 align-items-center shadow-none text-center">
                                                <a href="calendar.html" class="text-dark p-4 ctm-border-right"><span class="lnr lnr-calendar-full pr-0 pb-lg-2 font-23"></span><span class="">Calendrier</span></a>
                                            </div>
                                            <div class="col-6 align-items-center shadow-none text-center">
                                                <a href="view-leave.html" class="text-dark p-4 ctm-border-right ctm-border-left"><span class="lnr lnr-briefcase pr-0 pb-lg-2 font-23"></span><span class="">Demandes à traiter</span></a>
                                            </div>
                                            <div class="col-6 align-items-center shadow-none text-center">
                                                <a href="leave.html" class="text-dark p-4 last-slider-btn ctm-border-right"><span class="lnr lnr-star pr-0 pb-lg-2 font-23"></span><span class="">Poser un congé</span></a>
                                            </div>
                                            <div class="col-6 align-items-center shadow-none text-center">
                                                <a href="reports.html" class="text-dark p-4 ctm-border-right ctm-border-left"><span class="lnr lnr-rocket pr-0 pb-lg-2 font-23"></span><span class="">Rapports</span></a>
                                            </div>
                                            <div class="col-6 align-items-center shadow-none text-center">
                                                <a href="employment.html" class="text-dark p-4 ctm-border-right"><span class="lnr lnr-sync pr-0 pb-lg-2 font-23"></span><span class="">Profil</span></a>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- /Sidebar -->

                        </aside>
                    </div>

                    <div class="col-xl-9 col-lg-8  col-md-12">
                        <!-- Widget -->
                        <div class="row">
                            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div class="card dash-widget ctm-border-radius shadow-sm grow">
                                    <div class="card-body">
                                        <div class="card-icon bg-primary">
                                            <i class="fa fa-users" aria-hidden="true"></i>
                                        </div>
                                        <div class="card-right">
                                            <h4 class="card-title">Employés</h4>
                                            <p class="card-text">700</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-lg-6 col-sm-6 col-12">
                                <div class="card dash-widget ctm-border-radius shadow-sm grow">
                                    <div class="card-body">
                                        <div class="card-icon bg-warning">
                                            <i class="fa fa-building-o"></i>
                                        </div>
                                        <div class="card-right">
                                            <h4 class="card-title">Équipe</h4>

                                            <p class="card-text">30</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-lg-6 col-sm-6 col-12">
                                <div class="card dash-widget ctm-border-radius shadow-sm grow">
                                    <div class="card-body">
                                        <div class="card-icon bg-danger">
                                            <i class="fa fa-suitcase" aria-hidden="true"></i>
                                        </div>
                                        <div class="card-right">
                                            <h4 class="card-title">Absent</h4>
                                            <p class="card-text">3</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-lg-6 col-sm-6 col-12">
                                <div class="card dash-widget ctm-border-radius shadow-sm grow">
                                    <div class="card-body">
                                        <div class="card-icon bg-success">
                                            <i class="fa fa-bell" aria-hidden="true"></i>
                                        </div>
                                        <div class="card-right">
                                            <h4 class="card-title">Demande</h4>
                                            <p class="card-text">10</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- / Widget -->

                        <!-- Chart -->
                        <div class="row">
                            <div class="col-md-6 d-flex">
                                <div class="card ctm-border-radius shadow-sm flex-fill grow">
                                    <div class="card-header">
                                        <h4 class="card-title mb-0">Total des employés</h4>
                                    </div>
                                    <div class="card-body">
                                        <canvas id="pieChart"></canvas>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 d-flex">
                                <div class="card ctm-border-radius shadow-sm flex-fill grow">
                                    <div class="card-header">
                                        <h4 class="card-title mb-0">Resumé des congés</h4>
                                    </div>
                                    <div class="card-body">
                                        <canvas id="PieChart"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- / Chart -->

                        <div class="row">
                            <div class="col-lg-6 col-md-12 d-flex">

                                <!-- Team Leads List -->
                                <div class="card flex-fill team-lead shadow-sm grow">
                                    <div class="card-header">
                                        <h4 class="card-title mb-0 d-inline-block">Chefs d'équipe</h4>
                                        <a href="employees.html" class="dash-card float-right mb-0 text-primary">Gérer l'équipe </a>
                                    </div>
                                    <div class="card-body">
                                        <div class="media mb-3">
                                            <div class="e-avatar avatar-online mr-3">
                                                <img class="" src="assets/img/profiles/img-6.jpg" alt="Maria Cotton" class="img-fluid">
                                            </div>
                                            <div class="media-body">
                                                <h6 class="m-0">Maria Cotton</h6>
                                                <p class="mb-0 ctm-text-sm">PHP</p>
                                            </div>
                                        </div>
                                        <hr>
                                        <div class="media mb-3">
                                            <div class="e-avatar avatar-online mr-3">
                                                <img class="img-fluid" src="assets/img/profiles/img-5.jpg" alt="Linda Craver">
                                            </div>
                                            <div class="media-body">
                                                <h6 class="m-0">Danny Ward</h6>
                                                <p class="mb-0 ctm-text-sm">Design</p>
                                            </div>
                                        </div>
                                        <hr>
                                        <div class="media mb-3">
                                            <div class="e-avatar avatar-online mr-3">
                                                <img src="assets/img/profiles/img-4.jpg" alt="Linda Craver" class="img-fluid">
                                            </div>
                                            <div class="media-body">
                                                <h6 class="m-0">Linda Craver</h6>
                                                <p class="mb-0 ctm-text-sm">IOS</p>
                                            </div>
                                        </div>
                                        <hr>
                                        <div class="media mb-3">
                                            <div class="e-avatar avatar-online mr-3">
                                                <img class="img-fluid" src="assets/img/profiles/img-3.jpg" alt="Linda Craver">
                                            </div>
                                            <div class="media-body">
                                                <h6 class="m-0">Jenni Sims</h6>
                                                <p class="mb-0 ctm-text-sm">Android</p>
                                            </div>
                                        </div>
                                        <hr>
                                        <div class="media">
                                            <div class="e-avatar avatar-offline mr-3">
                                                <img class="img-fluid" src="assets/img/profiles/img-2.jpg" alt="Linda Craver">
                                            </div>
                                            <div class="media-body">
                                                <h6 class="m-0">John Gibbs</h6>
                                                <p class="mb-0 ctm-text-sm">Business</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-6 col-md-12 d-flex">

                                <!-- Today -->
                                <div class="card flex-fill today-list shadow-sm grow">
                                    <div class="card-header">
                                        <h4 class="card-title mb-0 d-inline-block">Vos prochain congés</h4>
                                        <a href="leave.html" class="d-inline-block float-right text-primary"><i class="fa fa-suitcase"></i></a>
                                    </div>
                                    <div class="card-body recent-activ">
                                        <div class="recent-comment">
                                            <a href="javascript:void(0)" class="dash-card text-danger">
                                                <div class="dash-card-container">
                                                    <div class="dash-card-icon">
                                                        <i class="fa fa-suitcase"></i>
                                                    </div>
                                                    <div class="dash-card-content">
                                                        <h6 class="mb-0">Mon, 16 Dec 2019</h6>
                                                    </div>
                                                </div>
                                            </a>
                                            <hr>
                                            <a href="javascript:void(0)" class="dash-card text-primary">
                                                <div class="dash-card-container">
                                                    <div class="dash-card-icon">
                                                        <i class="fa fa-suitcase"></i>
                                                    </div>
                                                    <div class="dash-card-content">
                                                        <h6 class="mb-0">Fri, 20 Dec 2019</h6>
                                                    </div>
                                                </div>
                                            </a>
                                            <hr>
                                            <a href="javascript:void(0)" class="dash-card text-primary">
                                                <div class="dash-card-container">
                                                    <div class="dash-card-icon">
                                                        <i class="fa fa-suitcase"></i>
                                                    </div>
                                                    <div class="dash-card-content">
                                                        <h6 class="mb-0">Wed, 25 Dec 2019</h6>
                                                    </div>
                                                </div>
                                            </a>
                                            <hr>
                                            <a href="javascript:void(0)" class="dash-card text-primary">
                                                <div class="dash-card-container">
                                                    <div class="dash-card-icon">
                                                        <i class="fa fa-suitcase"></i>
                                                    </div>
                                                    <div class="dash-card-content">
                                                        <h6 class="mb-0">Fri, 27 Dec 2019</h6>
                                                    </div>
                                                </div>
                                            </a>
                                            <hr>
                                            <a href="javascript:void(0)" class="dash-card text-primary">
                                                <div class="dash-card-container">
                                                    <div class="dash-card-icon">
                                                        <i class="fa fa-suitcase"></i>
                                                    </div>
                                                    <div class="dash-card-content">
                                                        <h6 class="mb-0">Tue, 31 Dec 2019</h6>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--/Content-->

    </div>
    <!-- Inner Wrapper -->

    <script type="text/javascript">
        $(document).ready(function () {
            let user = localStorage.getItem("CurrentUser");
            if (user) {
                setPagedata(user);
                $("#logoutBtn").click(function () {
                    localStorage.clear();
                    window.location.href = "/Login.aspx";
                });
            }
            else {
                window.location.href = "/Login.aspx";
            }
        });
    </script>

</asp:Content>
