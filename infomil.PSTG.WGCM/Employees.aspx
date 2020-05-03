<%@ Page Title="Leaves Manager" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Employees.aspx.cs" Inherits="infomil.PSTG.WGCM.Employees" %>

<asp:Content ID="EmployeeContent" ContentPlaceHolderID="employees" runat="server">
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
                <div class="col-xl-9 col-lg-8 col-md-12">
                    <div class="quicklink-sidebar-menu ctm-border-radius shadow-sm grow bg-white card">
                        <div class="card-body">
                            <ul class="list-group list-group-horizontal-lg">
                                <li class="list-group-item text-center active button-5"><a href="employees.html" class="text-white">All employees</a></li>
                                <li class="list-group-item text-center button-6"><a class="text-dark" href="employees-team.html">Teams</a></li>

                            </ul>
                        </div>
                    </div>
                    <div class="card shadow-sm grow ctm-border-radius">
                        <div class="card-body align-center">
                            <h3 class="card-title float-left mb-0 mt-2"><span>Number of employees: </span><span id="totalEmployees">0</span></h3>
                            <ul class="nav nav-tabs float-right border-0 tab-list-emp">
                                <li class="nav-item" data-toggle="modal" data-target="#newEmpPopup">
                                    <a class="nav-link active border-0 font-23 grid-view" href="javascript:void(0)"><i class="fa fa-plus" aria-hidden="true"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="ctm-border-radius shadow-sm grow card">
                        <div class="card-body">
                            <!--Content tab-->
                            <div id="employeeCardList" class="row people-grid-row">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--/Content-->


    <script type="text/javascript" src="assets/js/employeeAdmin.js"></script>
</asp:Content>
