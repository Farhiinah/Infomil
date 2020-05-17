<%@ Page Title="Leaves Manager" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Leaves_Manager.aspx.cs" Inherits="infomil.PSTG.WGCM.Leaves_Manager" %>

<asp:Content ID="LeaveContent" ContentPlaceHolderID="leavesManager" runat="server">
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
                                <li class="tabItem list-group-item text-center active" onclick=""><a href="javascript:void(0)" class="text-white">Leaves</a></li>
                                <li class="tabItem list-group-item text-center" onclick=""><a class="text-dark" href="javascript:void(0)">Calendar</a></li>

                            </ul>
                        </div>
                    </div>
                    <div id="allEmp">
                        <div class="card shadow-sm grow ctm-border-radius">
                            <div class="card-body align-center">
                                <h3 class="card-title float-left mb-0 mt-2"><span># of leaves: </span><span id="totalLeaves">0</span></h3>
                                <ul class="nav nav-tabs float-right border-0 tab-list-emp">
                                    <li class="nav-item" data-toggle="modal" data-target="#newLeave">
                                        <a class="nav-link active border-0 font-23 grid-view" href="javascript:void(0)"><i class="fa fa-plus" aria-hidden="true"></i></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="ctm-border-radius shadow-sm grow card">
                            <div class="card-body">
                                <!--Content tab-->
                                <div id="leavesCardList" class="row people-grid-row">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="allTeams" style="display: none;">
                        <div class="card shadow-sm grow ctm-border-radius">
                            <div class="card-body align-center">
                                <h3 class="card-title float-left mb-0 mt-2"><span># of teams: </span><span id="totalTeams">0</span></h3>
                                <ul class="nav nav-tabs float-right border-0 tab-list-emp">
                                    <li class="nav-item" data-toggle="modal" data-target="#newTeamsPopup">
                                        <a class="nav-link active border-0 font-23 grid-view" href="javascript:void(0)"><i class="fa fa-plus" aria-hidden="true"></i></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="ctm-border-radius shadow-sm grow card">
                            <div class="card-body">
                                <!--Content tab-->
                                <div id="teamsCardList" class="row people-grid-row">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="newLeave" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">New Leave</h2>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" style="font-size: 1.5em;">&times;</span>
                    </button>
                </div>
                <form id="newUser">
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="exampleFormControlSelect1">Leave type</label>
                            <br />
                            <select class="form-control" id="leaveTypeList" style="width: 100%;" required>
                                <option value="SICK_LEAVE">Sick leave</option>
                                <option value="LOCAL_LEAVE">Local leave</option>
                                <option value="ANNUAL_LEAVE">Annual leave</option>
                                <option value="LEAVE_WITHOUTPAY">Leave without pay</option>
                            </select>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>Start date</label>
                                    <input id="startDate" type="text" class="form-control datetimepicker" required>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>End date</label>
                                    <input id="endDate" type="text" class="form-control datetimepicker" required>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlSelect1">Comment</label>
                            <br />
                            <textarea id="comments" class="form-control" rows="4"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal" style="font-size: 1em;">Cancel</button>
                        <button type="submit" class="btn btn-primary" style="font-size: 1em;">Send for approval</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!--/Content-->

    <script src="assets/js/LeaveManager.js"></script>
    <script type="text/javascript" src="assets/js/leave.js"></script>
</asp:Content>