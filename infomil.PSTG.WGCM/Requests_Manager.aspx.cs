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
        public static string ApproveLeave(string IDLIST, string approverId, string userId)
        {
            string result = "OK";
            try
            {
                string[] idlist = IDLIST.Split(';');
                string[] userIdList = userId.Split(';');
                for (int i = 0; i < idlist.Length; i++)
                {
                    Helper.UpdateXmlData(idlist[i], SiteMaster.leaveDB, "leaveList", "leave", "STATUS", "Approved");
                    Helper.UpdateXmlData(idlist[i], SiteMaster.leaveDB, "leaveList", "leave", "APPROVER", approverId);
                    string email = Regex.Replace(Helper.GetElementById(userIdList[i], SiteMaster.userDB, "userList", "user").Attribute("EMAIL").Value, "[`]", "@");
                    result = Helper.SendMail(email, "Approve", idlist[i], approverId);
                }
            }
            catch(Exception e)
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
                for (int i = 0; i < idlist.Length; i++)
                {
                    Helper.UpdateXmlData(idlist[i], SiteMaster.leaveDB, "leaveList", "leave", "STATUS", "Rejected");
                    Helper.UpdateXmlData(idlist[i], SiteMaster.leaveDB, "leaveList", "leave", "APPROVER", approverId);
                    string refillLeaveStatus = Helper.RefillLeave(userIdList[i], idlist[i]);
                    if(refillLeaveStatus == "OK")
                    {
                        string email = Regex.Replace(Helper.GetElementById(userIdList[i], SiteMaster.userDB, "userList", "user").Attribute("EMAIL").Value, "[`]", "@");
                        result = Helper.SendMail(email, "Reject", idlist[i], approverId);
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
        public static string EscalateLeave(string IDLIST, string approverId, string userId, string managerId)
        {
            string result = "OK";
            try
            {
                string[] idlist = IDLIST.Split(';');
                string[] userIdList = userId.Split(';');
                string[] managerIdList = managerId.Split(';');
                for (int i = 0; i < idlist.Length; i++)
                {
                    Helper.UpdateXmlData(idlist[i], SiteMaster.leaveDB, "leaveList", "leave", "STATUS", "Escalated");
                    Helper.UpdateXmlData(idlist[i], SiteMaster.leaveDB, "leaveList", "leave", "APPROVER", approverId);
                    string email = Regex.Replace(Helper.GetElementById(userIdList[i], SiteMaster.userDB, "userList", "user").Attribute("EMAIL").Value, "[`]", "@");
                    string escalationMailStatus = Helper.SendMail(email, "Approval", idlist[i], userIdList[i]);
                    if(escalationMailStatus == "OK")
                    {
                        string managerEmail = Regex.Replace(Helper.GetElementById(managerId, SiteMaster.userDB, "userList", "user").Attribute("EMAIL").Value, "[`]", "@");
                        result = Helper.SendMail(managerEmail, "Escalate", idlist[i], managerIdList[i]);
                    }
                }
            }
            catch (Exception e)
            {
                result = e.Message;
            }
            return result;
        }
    }
}