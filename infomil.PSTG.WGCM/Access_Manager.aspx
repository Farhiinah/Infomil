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
                            <h3 class="card-title float-left mb-0 mt-2"><span>Number of access levels: </span><span id="totalAccess">0</span></h3>
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
    <!--/Content-->
    <script type="text/javascript" src="assets/js/accessManager.js"></script>
</asp:Content>

