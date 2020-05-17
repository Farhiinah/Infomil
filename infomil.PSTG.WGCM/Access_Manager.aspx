<%@ Page Title="Leaves Manager" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Access_Manager.aspx.cs" Inherits="infomil.PSTG.WGCM.AccessManager" %>

<asp:Content ID="AccessManager" ContentPlaceHolderID="accessManager" runat="server">
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
                    <div class="card shadow-sm grow ctm-border-radius">
                        <div class="card-body align-center">
                            <h3 class="card-title float-left mb-0 mt-2"><span># of access levels: </span><span id="totalAccess">0</span></h3>
                            <ul class="nav nav-tabs float-right border-0 tab-list-emp">
                                <li class="nav-item" data-toggle="modal" data-target="#newAccesslvlPopup">
                                    <a class="nav-link active border-0 font-23 grid-view" href="javascript:void(0)"><i class="fa fa-plus" aria-hidden="true"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="ctm-border-radius shadow-sm grow card">
                        <div class="card-body">
                            <div class="accordion" id="AccessList">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="newAccesslvlPopup" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">New access level</h2>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" style="font-size: 1.5em;">&times;</span>
                    </button>
                </div>

                <form id="newAccessLvl">
                    <div class="modal-body">
                        <div class="alert alert-danger" role="alert" id="accessErrLbl" style="display: none;">
                        </div>
                        <div class="input-group mb-3">
                            <input id="accessLvlName" type="text" class="form-control" placeholder="Access name" required>
                        </div>
                        <div class="container">
                            <div class="row">
                                <div class="col-sm">
                                    <label>
                                        <input type="checkbox" data-toggle="toggle" id="accessLvlUsers">
                                        Manage users
                                    </label>
                                </div>
                                <div class="col-sm">
                                    <label>
                                        <input type="checkbox" data-toggle="toggle" id="accessLvlLeaves">
                                        Manage leaves
                                    </label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm">
                                    <label>
                                        <input type="checkbox" data-toggle="toggle" id="accessLvlAccess">
                                        Manage access
                                    </label>
                                </div>
                                <div class="col-sm">
                                    <label>
                                        <input type="checkbox" data-toggle="toggle" id="accessLvlReports">
                                        View reports
                                    </label>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm">
                                    <label>
                                        <input type="checkbox" data-toggle="toggle" id="accessLvlApprover">
                                        Approver
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal" style="font-size: 1em;">Cancel</button>
                        <button type="submit" class="btn btn-primary" style="font-size: 1em;">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!--/Content-->
    <script type="text/javascript" src="assets/js/AccessManagerController.js"></script>
    <script type="text/javascript" src="assets/js/accessManager.js"></script>
</asp:Content>

