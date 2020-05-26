using Newtonsoft.Json;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Script.Serialization;
using System.Xml;
using System.Collections;
using System.Xml.Linq;
using System;
using System.Reflection;
using System.Diagnostics;
using System.Net.Mail;

namespace infomil.PSTG.WGCM.Data_Model
{
    public class Helper
    {
        public static string ReadXmlFileToJsonString(string filePath)
        {
            XmlDocument doc = new XmlDocument();
            XmlTextReader reader = new XmlTextReader(HttpContext.Current.Server.MapPath(filePath))
            {
                WhitespaceHandling = WhitespaceHandling.None
            };
            reader.MoveToContent();
            reader.Read();
            doc.Load(reader);
            reader.Close();
            return JsonConvert.SerializeXmlNode(doc);
        }

        public static ArrayList GetUserlist()
        {
            Dictionary<string, object> myUser = (Dictionary<string, object>)new JavaScriptSerializer().DeserializeObject(Regex.Replace(Regex.Replace(ReadXmlFileToJsonString(SiteMaster.userDB), "[@]", ""), "[`]", "@"));
            dynamic userList = myUser["userList"];
            ArrayList userls = new ArrayList();
            try
            {
                dynamic users = userList["user"];
                if (users.GetType().IsArray)
                {
                    foreach (object user in users)
                    {
                        userls.Add(user);
                    }
                }
                else
                {
                    userls.Add(users);
                }
            }
            catch (Exception e)
            {
                Trace.TraceInformation(e.Message);
            }
            return userls;
        }

        public static bool UserExist(string email)
        {
            ArrayList userList = GetUserlist();
            bool hasUser = false;
            foreach (dynamic user in userList)
            {
                if (user["EMAIL"] == email)
                {
                    hasUser = true;
                }
            }
            return hasUser;
        }

        public static ArrayList GetAccesslist()
        {
            Dictionary<string, object> myAccess = (Dictionary<string, object>)new JavaScriptSerializer().DeserializeObject(Regex.Replace(ReadXmlFileToJsonString(SiteMaster.accessLvlDB), "[@]", ""));
            dynamic accessList = myAccess["accessLevel"];
            ArrayList accessls = new ArrayList();
            try
            {
                dynamic access = accessList["access"];
                if (access.GetType().IsArray)
                {
                    foreach (object user in access)
                    {
                        accessls.Add(user);
                    }
                }
                else
                {
                    accessls.Add(access);
                }
            }
            catch (Exception e)
            {
                Trace.TraceInformation(e.Message);
            }
            return accessls;
        }

        public static ArrayList GetTeamlist()
        {
            Dictionary<string, object> myTeam = (Dictionary<string, object>)new JavaScriptSerializer().DeserializeObject(Regex.Replace(ReadXmlFileToJsonString(SiteMaster.teamDB), "[@]", ""));
            dynamic teamList = myTeam["teamList"];
            ArrayList teamsls = new ArrayList();
            try
            {
                dynamic teams = teamList["team"];
                if (teams.GetType().IsArray)
                {
                    foreach (object team in teams)
                    {
                        teamsls.Add(team);
                    }
                }
                else
                {
                    teamsls.Add(teams);
                }
            }
            catch (Exception e)
            {
                Trace.TraceInformation(e.Message);
            }
            return teamsls;
        }

        public static bool TeamExist(string teamName)
        {
            ArrayList teamList = GetTeamlist();
            bool hasTeam = false;
            foreach (dynamic team in teamList)
            {
                if (team["NAME"] == teamName)
                {
                    hasTeam = true;
                }
            }
            return hasTeam;
        }

        public static ArrayList GetLeavelist()
        {
            Dictionary<string, object> myLeave = (Dictionary<string, object>)new JavaScriptSerializer().DeserializeObject(Regex.Replace(ReadXmlFileToJsonString(SiteMaster.leaveDB), "[@]", ""));
            dynamic leaveList = myLeave["leaveList"];
            ArrayList leavesls = new ArrayList();
            try
            {
                dynamic leaves = leaveList["leave"];
                if (leaves.GetType().IsArray)
                {
                    foreach (object leave in leaves)
                    {
                        leavesls.Add(leave);
                    }
                }
                else
                {
                    leavesls.Add(leaves);
                }
            }
            catch (Exception e)
            {
                Trace.TraceInformation(e.Message);
            }
            return leavesls;
        }

        public static string AddXmlData(string db, string rootElement, string tableName, object obj)
        {
            string status = "OK";
            try
            {
                string path = HttpContext.Current.Server.MapPath(db);
                XDocument xdoc = XDocument.Load(path);
                XElement table = new XElement(tableName);
                Type objType = obj.GetType();
                IList<PropertyInfo> props = new List<PropertyInfo>(objType.GetProperties());
                foreach (PropertyInfo prop in props)
                {
                    table.Add(new XAttribute(prop.ToString().Split(' ')[1], prop.GetValue(obj, null).ToString()));
                }
                xdoc.Element("root").Element(rootElement).Add(table);
                xdoc.Save(path);
            }
            catch (Exception e)
            {
                status = e.Message;
            }
            return status;
        }

        public static string UpdateXmlData(string id, string db, string rootElement, string tableName, string attributeToUpdate, string attributeVal)
        {
            string status = "OK";
            try
            {
                string path = HttpContext.Current.Server.MapPath(db);
                XDocument xdoc = XDocument.Load(path);
                var ls = xdoc.Element("root").Element(rootElement).Elements(tableName);
                foreach (var element in ls)
                {
                    if (element.Attribute("ID").Value == id)
                    {
                        element.Attribute(attributeToUpdate).Value = attributeVal;
                    }
                }
                xdoc.Save(path);
            }
            catch (Exception e)
            {
                status = e.Message;
            }
            return status;
        }

        public static string DelXmlData(string id, string db, string rootElement, string tableName)
        {
            string status = "OK";
            try
            {
                string path = HttpContext.Current.Server.MapPath(db);
                XDocument xdoc = XDocument.Load(path);
                var ls = xdoc.Element("root").Element(rootElement).Elements(tableName);
                foreach (var element in ls)
                {
                    if (element.Attribute("ID").Value == id)
                    {
                        element.Remove();
                    }
                }
                xdoc.Save(path);
            }
            catch (Exception e)
            {
                status = e.Message;
            }
            return status;
        }

        public static string GetXmlAttributeData(string id, string db, string rootElement, string tableName, string attribute)
        {
            string val = "";
            try
            {
                string path = HttpContext.Current.Server.MapPath(db);
                XDocument xdoc = XDocument.Load(path);
                var ls = xdoc.Element("root").Element(rootElement).Elements(tableName);
                foreach (var element in ls)
                {
                    if (element.Attribute("ID").Value == id)
                    {
                        val = element.Attribute(attribute).Value;
                    }
                }
                xdoc.Save(path);
            }
            catch (Exception e)
            {
                Trace.TraceInformation(e.Message);
            }
            return val;
        }

        public static XElement GetElementById(string id, string db, string rootElement, string tableName)
        {
            XElement record = null;
            try
            {
                string path = HttpContext.Current.Server.MapPath(db);
                XDocument xdoc = XDocument.Load(path);
                var ls = xdoc.Element("root").Element(rootElement).Elements(tableName);
                foreach (var element in ls)
                {
                    if (element.Attribute("ID").Value == id)
                    {
                        record = element;
                    }
                }
                xdoc.Save(path);
            }
            catch (Exception e)
            {
                Trace.TraceInformation(e.Message);
            }
            return record;
        }

        public static string RefillLeave(string uid, string leaveId)
        {
            string result = "OK";
            try
            {
                XElement leave = Helper.GetElementById(leaveId, SiteMaster.leaveDB, "leaveList", "leave");
                if (leave != null)
                {
                    double SICK_LEAVE = float.Parse(leave.Attribute("SICK_LEAVE").Value) / 8;
                    double LOCAL_LEAVE = float.Parse(leave.Attribute("LOCAL_LEAVE").Value) / 8;
                    double ANNUAL_LEAVE = float.Parse(leave.Attribute("ANNUAL_LEAVE").Value) / 8;
                    string remaining_SICK_LEAVE = (float.Parse(Helper.GetXmlAttributeData(uid, SiteMaster.userDB, "userList", "user", "SICK_LEAVE")) + SICK_LEAVE).ToString();
                    string remaining_LOCAL_LEAVE = (float.Parse(Helper.GetXmlAttributeData(uid, SiteMaster.userDB, "userList", "user", "LOCAL_LEAVE")) + LOCAL_LEAVE).ToString();
                    string remaining_ANNUAL_LEAVE = (float.Parse(Helper.GetXmlAttributeData(uid, SiteMaster.userDB, "userList", "user", "SICK_LEAVE")) + ANNUAL_LEAVE).ToString();
                    Helper.UpdateXmlData(uid, SiteMaster.userDB, "userList", "user", "SICK_LEAVE", remaining_SICK_LEAVE);
                    Helper.UpdateXmlData(uid, SiteMaster.userDB, "userList", "user", "LOCAL_LEAVE", remaining_LOCAL_LEAVE);
                    Helper.UpdateXmlData(uid, SiteMaster.userDB, "userList", "user", "ANNUAL_LEAVE", remaining_ANNUAL_LEAVE);
                }
                else
                {
                    result = "Leave not found.";
                }
            }
            catch (Exception e)
            {
                result = e.Message;
            }
            return result;
        }

        public static string SendMail(string email, string variance, string leaveId, string uid)
        {
            string response;
            try
            {
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");

                mail.From = new MailAddress("infomil@info.com");
                mail.To.Add(email);
                mail.Subject = "Leave manager system";
                mail.Body = buildMailBody(variance, Helper.GetElementById(leaveId, SiteMaster.leaveDB, "leaveList", "leave"), Helper.GetElementById(uid, SiteMaster.userDB, "userList", "user"));

                SmtpServer.Port = 587;
                SmtpServer.Credentials = new System.Net.NetworkCredential("infomilTest1234@gmail.com", "InfoMil1234");
                SmtpServer.EnableSsl = true;

                SmtpServer.Send(mail);
                response = "OK";
            }
            catch (Exception e)
            {
                response = e.Message;
            }
            return response;
        }

        public static string buildMailBody(string variance, XElement leave, XElement user)
        {
            string body = "";
            string table =
                        "<style>" +
                        "table, th, td {" +
                        "border: 1px solid black;" +
                        "border-collapse: collapse;" +
                        "text-align: center;" +
                        "}" +
                        "</style>" +
                        "<table>" +
                        "<tr>" +
                        "<th>" +
                        "Start date" +
                        "</th>" +
                        "<th>" +
                        "End date" +
                        "</th>" +
                        "<th>" +
                        "Duration" +
                        "</th>" +
                        "<th>" +
                        "Sick leave" +
                        "</th>" +
                        "<th>" +
                        "Local leave" +
                        "</th>" +
                        "<th>" +
                        "Annual leave" +
                        "</th>" +
                        "<th>" +
                        "Unpaid leave" +
                        "</th>" +
                        "<th>" +
                        "Total" +
                        "</th>" +
                        "<th>" +
                        "Comment" +
                        "</th>" +
                        "</tr>" +
                        "<tr>" +
                        "<td>" +
                        leave.Attribute("STARTDATE").Value +
                        "</td>" +
                        "<td>" +
                        leave.Attribute("ENDDATE").Value +
                        "</td>" +
                        "<td>" +
                        leave.Attribute("LEAVEAMOUNT").Value +
                        " day(s)</td>" +
                        "<td>" +
                        leave.Attribute("SICK_LEAVE").Value +
                        " hr(s)</td>" +
                        "<td>" +
                        leave.Attribute("LOCAL_LEAVE").Value +
                        " hr(s)</td>" +
                        "<td>" +
                        leave.Attribute("ANNUAL_LEAVE").Value +
                        " hr(s)</td>" +
                        "<td>" +
                        leave.Attribute("UNPAID_LEAVE").Value +
                        " hr(s)</td>" +
                        "<td>" +
                        leave.Attribute("NUMBEROFHOURS").Value +
                        " hr(s)</td>" +
                        "<td>" +
                        leave.Attribute("COMMENT").Value +
                        "</td>" +
                        "</tr>" +
                        "</table>";
            string signature = "<h6>Please connect to <a href='https://localhost:44322/Requests_Manager.aspx'>leave manager tool</a> for more information.<h6>";
            switch (variance)
            {
                case "Approval":
                    body = "<h5>New Request from " + user.Attribute("FIRSTNAME").Value + " " + user.Attribute("LASTNAME").Value + "</h5><br/>" + table + "<br/>" + signature;
                    break;
                case "Approve":
                    body = "<h5>Your below leave request has been approved by " + user.Attribute("FIRSTNAME").Value + " " + user.Attribute("LASTNAME").Value + "</h5><br/>" + table + "<br/>" + signature;
                    break;
                case "Escalate":
                    body = "<h5>Your below leave request has been escalated to " + user.Attribute("FIRSTNAME").Value + " " + user.Attribute("LASTNAME").Value + "</h5><br/>" + table + "<br/>" + signature;
                    break;
                case "Reject":
                    body = "<h5>Your below leave request has been rejected by " + user.Attribute("FIRSTNAME").Value + " " + user.Attribute("LASTNAME").Value + "</h5><br/>" + table + "<br/>" + signature;
                    break;
            }
            return body;
        }
    }
}