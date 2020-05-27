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
                            </ul>
                        </div>
                    </div>
                    <div id="allLeaves">
                        <div class="card shadow-sm grow ctm-border-radius">
                            <div class="card-body align-center">
                                <h3 class="card-title float-left mb-0 mt-2"><span># of leaves: </span><span id="totalLeaves">0</span></h3>
                                <ul class="nav nav-tabs float-right border-0 tab-list-emp">
                                    <li class="nav-item" data-toggle="modal" data-target="#newLeave">
                                        <a class="nav-link active border-0 font-23 grid-view" href="javascript:void(0)" title="Request leave"><i class="fa fa-plus" aria-hidden="true"></i></a>
                                    </li>
                                    <li class="nav-item" id="cancelLeave" style="display: none;">
                                        <a class="nav-link active border-0 font-23 grid-view" href="javascript:void(0)" title="Cancel leave"><i class="fa fa-ban" aria-hidden="true"></i></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="ctm-border-radius shadow-sm grow card">
                            <div class="card-body">
                                <!--Content tab-->
                                <table id="leaveTable" class="display">
                                    <thead>
                                        <tr>
                                            <th id="thCheckLeave" onclick="checkToggleLeave(this)"><input type="checkbox" style="margin-left: 49%;"></th>
                                            <th style="text-align: center;">From</th>
                                            <th style="text-align: center;">To</th>
                                            <th style="text-align: center;">Sick leave</th>
                                            <th style="text-align: center;">Local leave</th>
                                            <th style="text-align: center;">Annual leave</th>
                                            <th style="text-align: center;">Unpaid leave</th>
                                            <th style="text-align: center;">Total</th>
                                            <th style="text-align: center;">Comments</th>
                                            <th style="text-align: center;">Status</th>
                                            <th style="text-align: center;">Approved</th>
                                        </tr>
                                    </thead>
                                    <tbody id="leavesCardList">
                                        
                                    </tbody>
                                </table>
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
                    <h2 class="modal-title">New leave request</h2>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" style="font-size: 1.5em;">&times;</span>
                    </button>
                </div>
                <form id="newUser">
                    <div class="modal-body">
                        <div class="form-group">
                            <label>I will be absent </label>
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>from:</label>
                                        <input id="startDate" type="date" class="form-control" required>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>to:</label>
                                        <input id="endDate" type="date" class="form-control" required>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>
                                            <input type="checkbox" data-toggle="toggle" id="allDay" checked onchange="calculateTotalAbsences()">
                                            All day
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <label>Number of day(s): <span id="numOfDays">0</span> | Number of hour(s): <span id="numOfHrs">0</span></label>
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label><u>Leave type</u></label>
                                        <br />
                                        <label>Sick leave</label>
                                        <br />
                                        <label>Local leave</label>
                                        <br />
                                        <label>Annual leave</label>
                                        <br />
                                        <label>Unpaid leave</label>
                                        <br />
                                        <label>Total</label>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label><u>Number of hour(s)</u></label>
                                        <input id="SICKLEAVE" step="0.01" onkeyup="calculateTotalLeaves()" type="number" class="form-control" style="height: 25px; margin-bottom: 8px; width: 100px;">
                                        <input id="LOCALEAVE" step="0.01" onkeyup="calculateTotalLeaves()" type="number" class="form-control" style="height: 25px; margin-bottom: 8px; width: 100px;">
                                        <input id="ANNUALLEAVE" step="0.01" onkeyup="calculateTotalLeaves()" type="number" class="form-control" style="height: 25px; margin-bottom: 8px; width: 100px;">
                                        <input id="UNPAIDLEAVE" step="0.01" onkeyup="calculateTotalLeaves()" type="number" class="form-control" style="height: 25px; margin-bottom: 8px; width: 100px;">
                                        <input id="totalLeaveCount" type="number" value="0.0" class="form-control" style="height: 25px; width: 100px;" disabled>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlSelect1">Comments (If any)</label>
                                <br />
                                <textarea id="comments" class="form-control" rows="4"></textarea>
                            </div>
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
    <script>
        document.getElementById("startDate").min = formatDate(new Date());
        document.getElementById("endDate").min = formatDate(new Date());
    </script>
</asp:Content>
