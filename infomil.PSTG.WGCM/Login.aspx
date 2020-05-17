<%@ Page Title="Login" MasterPageFile="~/Site.Master" Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="infomil.PSTG.WGCM.Login" %>

<asp:Content ID="LoginContent" ContentPlaceHolderID="login" runat="server">
    <!-- Main Wrapper -->
    <div class="inner-wrapper login-body">
        <div class="login-wrapper">
            <div class="container">
                <div class="loginbox shadow-sm grow">
                    <div class="login-left">
                        <img class="img-fluid" src="assets/img/logo.png" alt="Logo">
                    </div>
                    <div class="login-right">
                        <div class="login-right-wrap">
                            <h1>Login</h1>
                            <p class="account-subtitle">Access to our dashboard</p>
                            <!-- Form -->
                            <form id="loginForm">
                                <div class="form-group">
                                    <input name="username" id="uname" class="form-control" type="text" placeholder="Username" required>
                                </div>
                                <div class="form-group">
                                    <input name="password" id="pswd" class="form-control" type="password" placeholder="Password" required>
                                </div>
                                <div class="form-group" style="text-align: center;">
                                    <button type="submit" class="loginBtn btn btn-theme button-1 text-white ctm-border-radius btn-block">Login</button>
                                </div>
                            </form>
                            <!-- /Form -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="assets/js/LoginManager.js"></script>
    <script type="text/javascript" src="assets/js/login.js"></script>
</asp:Content>
