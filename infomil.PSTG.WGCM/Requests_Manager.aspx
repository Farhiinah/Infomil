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
                                        <a class="nav-link active border-0 font-20 grid-view" style="color: #6a782c;" href="javascript:void(0)">Approve all</a>
                                    </li>
                                    <li class="nav-item" data-toggle="modal" data-target="#newLeave">
                                        <a class="nav-link active border-0 font-20 grid-view" style="color: #ac2936;" href="javascript:void(0)">Reject all</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="ctm-border-radius shadow-sm grow card">
                            <div class="card-body">
                                <!--Content tab-->
                                <div id="requestsCardList" class="row people-grid-row">
                                    
                                </div>
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
</asp:Content>
