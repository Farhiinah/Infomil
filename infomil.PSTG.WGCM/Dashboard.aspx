<%@ Page Title="Leaves Manager" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Dashboard.aspx.cs" Inherits="infomil.PSTG.WGCM.Dashboard" %>

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
                            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
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
                            <div class="col-xl-3 col-lg-6 col-sm-6 col-12">
                                <div class="card dash-widget ctm-border-radius shadow-sm grow">
                                    <div class="card-body">
                                        <div class="card-icon bg-warning">
                                            <i class="fa fa-building-o"></i>
                                        </div>
                                        <div class="card-right">
                                            <h4 class="card-title">Teams</h4>

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
                                            <h4 class="card-title">Absentees</h4>
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
                                            <h4 class="card-title">Requests</h4>
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
                                        <h3 class="card-title mb-0">Total employees</h3>
                                    </div>
                                    <div class="card-body">
                                        <canvas id="pieChart"></canvas>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 d-flex">
                                <div class="card ctm-border-radius shadow-sm flex-fill grow">
                                    <div class="card-header">
                                        <h3 class="card-title mb-0">Leaves' summary</h3>
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
                                        <h3 class="card-title mb-0 d-inline-block">Team leads</h3>
                                        <a href="Employees.aspx" class="dash-card float-right mb-0 text-primary">Manage teams</a>
                                    </div>
                                    <div class="card-body">
                                        <div class="media mb-3">
                                            <div class="e-avatar avatar-online mr-3">
                                                <img src="assets/img/profiles/img-6.jpg" alt="Maria Cotton" class="img-fluid">
                                            </div>
                                            <div class="media-body">
                                                <h4 class="m-0">Maria Cotton</h4>
                                                <p class="mb-0 ctm-text-sm">PHP</p>
                                            </div>
                                        </div>
                                        <hr>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-6 col-md-12 d-flex">
                                <!-- Today -->
                                <div class="card flex-fill today-list shadow-sm grow">
                                    <div class="card-header">
                                        <h3 class="card-title mb-0 d-inline-block">Upcoming leaves</h3>
                                        <a href="leave.html" class="d-inline-block float-right text-primary"><i class="customSuitCase fa fa-suitcase"></i></a>
                                    </div>
                                    <div class="card-body recent-activ">
                                        <div class="recent-comment">
                                            <a href="javascript:void(0)" class="dash-card text-danger">
                                                <div class="dash-card-container">
                                                    <div class="dash-card-icon">
                                                        <i class="fa fa-suitcase"></i>
                                                    </div>
                                                    <div class="dash-card-content">
                                                        <h4 class="mb-0">Mon, 16 Dec 2019</h4>
                                                    </div>
                                                </div>
                                            </a>
                                            <hr>
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
    <script type="text/javascript" src="assets/js/indexAdmin.js"></script>
</asp:Content>
