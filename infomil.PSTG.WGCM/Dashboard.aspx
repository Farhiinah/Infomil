﻿<%@ Page Title="Leaves Manager" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Dashboard.aspx.cs" Inherits="infomil.PSTG.WGCM.Dashboard" %>

<asp:Content ID="DefaultContent" ContentPlaceHolderID="index_Admin" runat="server">
    <div class="inner-wrapper">
        <!-- Header -->
        <!--#include file="Header.aspx"-->
        <!-- /Header -->

        <!-- Content -->
        <div class="page-wrapper">
            <div class="container-fluid">
                <div class="row">
                    <!-- Sidebar -->
                    <!--#include file="Sidebar.aspx"-->
                    <!-- /Sidebar -->

                    <div class="col-xl-9 col-lg-8  col-md-12">
                        <!-- Widget -->
                        <div class="row">
                            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 userManagement">
                                <div class="card dash-widget ctm-border-radius shadow-sm grow">
                                    <div class="card-body">
                                        <div class="card-icon bg-primary">
                                            <i class="fa fa-users" aria-hidden="true"></i>
                                        </div>
                                        <div class="card-right">
                                            <h4 class="card-title">Employees</h4>
                                            <p class="card-text" id="totalEmployees">0</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-lg-6 col-sm-6 col-12 userManagement">
                                <div class="card dash-widget ctm-border-radius shadow-sm grow">
                                    <div class="card-body">
                                        <div class="card-icon bg-warning">
                                            <i class="fa fa-building-o"></i>
                                        </div>
                                        <div class="card-right">
                                            <h4 class="card-title">Teams</h4>

                                            <p class="card-text" id="totalTeams">0</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-lg-6 col-sm-6 col-12 leaveManagement">
                                <div class="card dash-widget ctm-border-radius shadow-sm grow">
                                    <div class="card-body">
                                        <div class="card-icon bg-danger">
                                            <i class="fa fa-suitcase" aria-hidden="true"></i>
                                        </div>
                                        <div class="card-right">
                                            <h4 class="card-title">Total leave taken</h4>
                                            <p class="card-text" id="totalLeaveTaking">0</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-lg-6 col-sm-6 col-12 requestManagement">
                                <div class="card dash-widget ctm-border-radius shadow-sm grow">
                                    <div class="card-body">
                                        <div class="card-icon bg-success">
                                            <i class="fa fa-bell" aria-hidden="true"></i>
                                        </div>
                                        <div class="card-right">
                                            <h4 class="card-title">Requests</h4>
                                            <p class="card-text" id="totalRequests">0</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 leaveManagement">
                                <div class="card dash-widget ctm-border-radius shadow-sm grow">
                                    <div class="card-body">
                                        <div class="card-icon bg-primary">
                                            <i class="fa fa-suitcase" aria-hidden="true"></i>
                                        </div>
                                        <div class="card-right">
                                            <h4 class="card-title">My sick leave</h4>
                                            <p class="card-text" id="totalSick">0</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-lg-6 col-sm-6 col-12 leaveManagement">
                                <div class="card dash-widget ctm-border-radius shadow-sm grow">
                                    <div class="card-body">
                                        <div class="card-icon bg-warning">
                                            <i class="fa fa-suitcase"></i>
                                        </div>
                                        <div class="card-right">
                                            <h4 class="card-title">My Local leave</h4>

                                            <p class="card-text" id="totalLocal">0</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-lg-6 col-sm-6 col-12 leaveManagement">
                                <div class="card dash-widget ctm-border-radius shadow-sm grow">
                                    <div class="card-body">
                                        <div class="card-icon bg-danger">
                                            <i class="fa fa-suitcase" aria-hidden="true"></i>
                                        </div>
                                        <div class="card-right">
                                            <h4 class="card-title">My annual leave</h4>
                                            <p class="card-text" id="totalAnnual">0</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- / Widget -->

                        <!-- Chart -->
                        <div class="row">
                            <div class="col-md-6 leaveManagement">
                                <div class="card ctm-border-radius shadow-sm flex-fill grow">
                                    <div class="card-header">
                                        <h3 class="card-title mb-0">Leaves' summary</h3>
                                    </div>
                                    <div class="card-body">
                                        <canvas id="pieChart"></canvas>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-12 leaveManagement">
                                <!-- Today -->
                                <div class="card flex-fill today-list shadow-sm grow">
                                    <div class="card-header">
                                        <h3 class="card-title mb-0 d-inline-block">Upcoming leaves</h3>
                                        <a href="Leaves_Manager.aspx" class="d-inline-block float-right text-primary"><i class="customSuitCase fa fa-suitcase"></i></a>
                                    </div>
                                    <div class="card-body recent-activ" id="leavelistDashboard" style="max-height: 285px; overflow-y: auto;">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 requestManagement">
                                <div class="card ctm-border-radius shadow-sm flex-fill grow">
                                    <div class="card-header">
                                        <h3 class="card-title mb-0">Team summary
                                        </h3>
                                    </div>
                                    <div class="card-body">
                                        <canvas id="barChart"></canvas>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-12 requestManagement">
                                <!-- Today -->
                                <div class="card flex-fill today-list shadow-sm grow">
                                    <div class="card-header">
                                        <h3 class="card-title mb-0 d-inline-block">Pending requests</h3>
                                        <a href="Requests_Manager.aspx" class="d-inline-block float-right text-primary"><i class="customSuitCase fa fa-envelope"></i></a>
                                    </div>
                                    <div class="card-body recent-activ" id="requestlistDashboard" style="max-height: 285px; overflow-y: auto;">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- / Chart -->

                        <div class="row">
                            
                            <div class="col-lg-6 col-md-12 leaveManagement absenceList">
                                <!-- Today -->
                                <div class="card flex-fill today-list shadow-sm grow">
                                    <div class="card-header">
                                        <h3 class="card-title mb-0 d-inline-block">On leave today</h3>
                                    </div>
                                    <div class="card-body recent-activ" style="max-height: 285px; overflow-y: auto;">
                                    <ul id="leavelistCurrentDayDashboard"></ul>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-6 col-md-12 userManagement">
                                <!-- Team Leads List -->
                                <div class="card flex-fill team-lead shadow-sm grow">
                                    <div class="card-header">
                                        <h3 class="card-title mb-0 d-inline-block">Team leads</h3>
                                        <a href="Employees.aspx" class="dash-card float-right mb-0 text-primary">Manage teams</a>
                                    </div>
                                    <div class="card-body" id="teamLeadListDashboard" style="max-height: 285px; overflow-y: auto;">
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

    <script src="assets/js/RequestManager.js"></script>
    <script src="assets/js/request.js"></script>
    <script src="assets/js/DashboardManager.js"></script>
    <script defer type="text/javascript" src="assets/js/indexAdmin.js"></script>
    <script>
        if (JSON.parse(localStorage.getItem("CurrentUser")).LVLOFACCESS == "678af57675744c22a9b47c11eced0aa8") {
            $(".absenceList").hide();
        }
    </script>
</asp:Content>
