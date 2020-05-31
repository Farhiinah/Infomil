using infomil.PSTG.WGCM.Data_Model;
using System.Web.Services;
using System.Collections;
using System;
using System.Text.RegularExpressions;

namespace infomil.PSTG.WGCM
{
    public partial class Requests_Manager : System.Web.UI.Page
    {
        [WebMethod]
        public static string ApproveLeave(string IDLIST, string approverId, string userId, string comment)
        {
            string result = "OK";
            try
            {
                string[] idlist = IDLIST.Split(';');
                string[] userIdList = userId.Split(';');
                for (int i = 0; i < idlist.Length; i++)
                {
                    Helper.UpdateXmlData(idlist[i], SiteMaster.leaveDB, "leaveList", "leave", "STATUS", "Approved");
                    string approverIdOnLeave = Helper.GetXmlAttributeData(idlist[i], SiteMaster.leaveDB, "leaveList", "leave", "APPROVER");
                    Helper.UpdateXmlData(idlist[i], SiteMaster.leaveDB, "leaveList", "leave", "APPROVER", approverIdOnLeave != "" ? approverIdOnLeave + ";" + approverId : approverId);
                    string commentOnleave = Helper.GetXmlAttributeData(idlist[i], SiteMaster.leaveDB, "leaveList", "leave", "COMMENT");
                    Helper.UpdateXmlData(idlist[i], SiteMaster.leaveDB, "leaveList", "leave", "COMMENT", commentOnleave + "\n-" + comment);
                    string email = Regex.Replace(Helper.GetElementById(userIdList[i], SiteMaster.userDB, "userList", "user").Attribute("EMAIL").Value, "[`]", "@");
                    result = Helper.SendMail(email, "Approve", idlist[i], approverId);
                }
            }
            catch (Exception e)
            {
                result = e.Message;
            }
            return result;
        }

        [WebMethod]
        public static string RejectLeave(string IDLIST, string approverId, string userId)
        {
            string result = "OK";
            try
            {
                string[] idlist = IDLIST.Split(';');
                string[] userIdList = userId.Split(';');
                string[] approverIdList = approverId.Split(';');
                for (int i = 0; i < idlist.Length; i++)
                {
                    Helper.UpdateXmlData(idlist[i], SiteMaster.leaveDB, "leaveList", "leave", "STATUS", "Rejected");
                    string approverIdOnLeave = Helper.GetXmlAttributeData(idlist[i], SiteMaster.leaveDB, "leaveList", "leave", "APPROVER");
                    Helper.UpdateXmlData(idlist[i], SiteMaster.leaveDB, "leaveList", "leave", "APPROVER", approverIdOnLeave != "" ? approverIdOnLeave + ";" + approverId : approverId);
                    string refillLeaveStatus = Helper.RefillLeave(userIdList[i], idlist[i]);
                    if (refillLeaveStatus == "OK")
                    {
                        string email = Regex.Replace(Helper.GetElementById(userIdList[i], SiteMaster.userDB, "userList", "user").Attribute("EMAIL").Value, "[`]", "@");
                        result = Helper.SendMail(email, "Reject", idlist[i], approverIdList.Length > 0 && i < 3 ? approverIdList[i] : approverId);
                    }
                }
            }
            catch (Exception e)
            {
                result = e.Message;
            }
            return result;
        }

        [WebMethod]
        public static string EscalateLeave(string IDLIST, string approverId, string userId, string managerId, string status, string gmanagerId)
        {
            string result = "OK";
            try
            {
                string[] idlist = IDLIST.Split(';');
                string[] userIdList = userId.Split(';');
                string[] managerIdList = managerId.Split(';');
                string[] gmanagerIdList = gmanagerId.Split(';');
                for (int i = 0; i < idlist.Length; i++)
                {
                    Helper.UpdateXmlData(idlist[i], SiteMaster.leaveDB, "leaveList", "leave", "STATUS", status);
                    string approverIdOnLeave = Helper.GetXmlAttributeData(idlist[i], SiteMaster.leaveDB, "leaveList", "leave", "APPROVER");
                    Helper.UpdateXmlData(idlist[i], SiteMaster.leaveDB, "leaveList", "leave", "APPROVER", approverIdOnLeave != "" ? approverIdOnLeave + ";" + approverId : approverId);
                    string email = Regex.Replace(Helper.GetElementById(userIdList[i], SiteMaster.userDB, "userList", "user").Attribute("EMAIL").Value, "[`]", "@");
                    string escalationManagerMailStatus = Helper.SendMail(email, "Approval", idlist[i], userIdList[i]);
                    string escalationGManagerMailStatus = "";
                    if (escalationManagerMailStatus == "OK" && managerIdList.Length > 0)
                    {
                        string managerEmail = Regex.Replace(Helper.GetElementById(managerIdList[i], SiteMaster.userDB, "userList", "user").Attribute("EMAIL").Value, "[`]", "@");
                        escalationGManagerMailStatus = Helper.SendMail(managerEmail, "Escalate", idlist[i], managerIdList[i]);
                    }
                    if (escalationGManagerMailStatus == "OK" && gmanagerIdList.Length > 0)
                    {
                        string gmanagerEmail = Regex.Replace(Helper.GetElementById(gmanagerIdList[i], SiteMaster.userDB, "userList", "user").Attribute("EMAIL").Value, "[`]", "@");
                        result = Helper.SendMail(gmanagerEmail, "Escalate", idlist[i], gmanagerIdList[i]);
                    }
                }
            }
            catch (Exception e)
            {
                result = e.Message;
            }
            return result;
        }

        [WebMethod]
        public static string ExportCsv(string csvData)
        {
            return Helper.ExportToCsv(csvData);
        }
    }
}