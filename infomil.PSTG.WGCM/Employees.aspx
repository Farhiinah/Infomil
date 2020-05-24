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
                                <li class="tabItem list-group-item text-center active" onclick="changeTab('All employees')"><a href="javascript:void(0)" class="text-white">All employees</a></li>
                                <li class="tabItem list-group-item text-center" onclick="changeTab('Teams')"><a class="text-dark" href="javascript:void(0)">Teams</a></li>

                            </ul>
                        </div>
                    </div>
                    <div id="allEmp">
                        <div class="card shadow-sm grow ctm-border-radius">
                            <div class="card-body align-center">
                                <h3 class="card-title float-left mb-0 mt-2"><span># of employees: </span><span id="totalEmployees">0</span></h3>
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
    <div id="newEmpPopup" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">New employee</h2>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" style="font-size: 1.5em;">&times;</span>
                    </button>
                </div>
                <form id="newUser">
                    <div class="modal-body">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" style="font-size: 1em;"><i class="fa fa-user-circle-o" aria-hidden="true"></i></span>
                            </div>
                            <input type="text" class="form-control" placeholder="First name" id="fname" required>
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" style="font-size: 1em;"><i class="fa fa-user-circle-o" aria-hidden="true"></i></span>
                            </div>
                            <input type="text" class="form-control" placeholder="Last name" id="lname" required>
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" style="font-size: 1em;"><i class="fa fa-user-circle-o" aria-hidden="true"></i></span>
                            </div>
                            <input type="text" class="form-control" placeholder="Username" id="uname" disabled>
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" style="font-size: 1em;"><i class="fa fa-envelope" aria-hidden="true"></i></span>
                            </div>
                            <input type="email" class="form-control" placeholder="Email address" id="emailAdd" required>
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" style="font-size: 1em;"><i class="fa fa-lock" aria-hidden="true"></i></span>
                            </div>
                            <input type="password" class="form-control" placeholder="Password" id="password" required>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlSelect1">Level of access</label>
                            <select class="form-control" id="lvlAccessList">
                            </select>
                        </div>
                        
                        <div class="input-group mb-3 leaveInput" style="display: none;">
                            <div class="input-group-prepend">
                                <span class="input-group-text" style="font-size: 1em;"><i class="fa fa-suitcase" aria-hidden="true"></i></span>
                            </div>
                            <input type="number" class="form-control" placeholder="Sick leave" id="sickLeave">
                        </div>
                        
                        <div class="input-group mb-3 leaveInput" style="display: none;">
                            <div class="input-group-prepend">
                                <span class="input-group-text" style="font-size: 1em;"><i class="fa fa-suitcase" aria-hidden="true"></i></span>
                            </div>
                            <input type="number" class="form-control" placeholder="Local leave" id="localLeave">
                        </div>
                        
                        <div class="input-group mb-3 leaveInput" style="display: none;">
                            <div class="input-group-prepend">
                                <span class="input-group-text" style="font-size: 1em;"><i class="fa fa-suitcase" aria-hidden="true"></i></span>
                            </div>
                            <input type="number" class="form-control" placeholder="Annual leave" id="annualLeave">
                        </div>

                        <div class="form-group">
                            <label for="exampleFormControlFile1">Profile picture</label>
                            <input type="file" class="form-control-file" id="profPic" accept="image/*">
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
    <div id="newTeamsPopup" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">New team</h2>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" style="font-size: 1.5em;">&times;</span>
                    </button>
                </div>
                <form id="newTeam">
                    <div class="modal-body">
                        <div class="input-group mb-3">
                            <input id="teamName" type="text" class="form-control" placeholder="Team name" required>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlSelect1">Manager</label>
                            <select class="form-control" id="teamManagerList" required>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlSelect1">Team lead</label>
                            <select class="form-control" id="teamLeadList" required>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlSelect1">Team members</label>
                            <br />
                            <select class="form-control" id="employeeList" multiple="multiple" style="width: 100%;" required>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal" style="font-size: 1em;">Cancel</button>
                        <button type="submit" class="btn btn-primary" style="font-size: 1em;" id="save">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!--/Content-->

    <script src="assets/js/EmployeeManager.js"></script>
    <script type="text/javascript" src="assets/js/employeeAdmin.js"></script>
</asp:Content>
