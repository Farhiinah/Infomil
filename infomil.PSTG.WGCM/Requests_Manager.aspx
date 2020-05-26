<%@ Page Title="Leaves Manager" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Requests_Manager.aspx.cs" Inherits="infomil.PSTG.WGCM.Requests_Manager" %>

<asp:Content ID="RequestContent" ContentPlaceHolderID="requestManager" runat="server">
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
                                <li class="tabItem list-group-item text-center active" onclick=""><a href="javascript:void(0)" class="text-white">Requests</a></li>
                            </ul>
                        </div>
                    </div>
                    <div id="allEmp">
                        <div class="card shadow-sm grow ctm-border-radius">
                            <div class="card-body align-center">
                                <h3 class="card-title float-left mb-0 mt-2"><span># of requests: </span><span id="totalRequests">0</span></h3>
                                <ul class="nav nav-tabs float-right border-0 tab-list-emp">
                                    <li class="nav-item" data-toggle="modal" data-target="#newLeave">
                                        <a class="nav-link active border-0 font-20 grid-view" style="color: #6a782c;" href="javascript:void(0)" id="approveBtn">Approve</a>
                                    </li>
                                    <li class="nav-item" data-toggle="modal" data-target="#newLeave">
                                        <a class="nav-link active border-0 font-20 grid-view" style="color: #f6822d;" href="javascript:void(0)" id="escalateBtn">Escalate</a>
                                    </li>
                                    <li class="nav-item" data-toggle="modal" data-target="#newLeave">
                                        <a class="nav-link active border-0 font-20 grid-view" style="color: #ac2936;" href="javascript:void(0)" id="rejectBtn">Reject</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="ctm-border-radius shadow-sm grow card">
                            <div class="card-body">
                                <!--Content tab-->
                                <table id="requestTable" class="display">
                                    <thead>
                                        <tr>
                                            <th id="thCheck" onclick="checkToggle(this)"><input type="checkbox" style="margin-left: 49%;"></th>
                                            <th>Employee</th>
                                            <th>From</th>
                                            <th>To</th>
                                            <th>Sick leave</th>
                                            <th>Local leave</th>
                                            <th>Annual leave</th>
                                            <th>Unpaid leave</th>
                                            <th>Total</th>
                                            <th>Comments</th>
                                        </tr>
                                    </thead>
                                    <tbody id="requestsCardList">
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--/Content-->

    <script src="assets/js/RequestManager.js"></script>
    <script type="text/javascript" src="assets/js/request.js"></script>
    <script>
        if (JSON.parse(localStorage.getItem("CurrentUser")).LVLOFACCESS == "5a56dcc19d924247b5d1f1284a3505b5") {
            $("#escalateBtn").hide();
        }
    </script>
</asp:Content>
