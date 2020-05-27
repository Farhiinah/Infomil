using infomil.PSTG.WGCM.Data_Model;
using System;
using System.Collections;
using System.Text.RegularExpressions;
using System.Web.Services;

namespace infomil.PSTG.WGCM
{

    public partial class Leaves_Manager : System.Web.UI.Page
    {
        [WebMethod]
        public static ArrayList GetLeavelist()
        {
            return Helper.GetLeavelist();
        }

        [WebMethod]
        public static string CreateLeave(string userId, string sDate, string eDate,
            string STATUS, string COMMENT, string NUMOFHOURS, string LEAVEAMOUNT, string UNPAID_LEAVE, string ANNUAL_LEAVE,
            string LOCAL_LEAVE, string SICK_LEAVE, string remainingSick, string remainingLocal, string remainingAnnual, string currentLeaveList, string email)
        {
            string result = "OK";
            try
            {
                Leaves myLeave = new Leaves(sDate, eDate, LEAVEAMOUNT, NUMOFHOURS, SICK_LEAVE,
                                            LOCAL_LEAVE, ANNUAL_LEAVE, UNPAID_LEAVE, COMMENT, STATUS
                                           );
                string leaveStatus = Helper.AddXmlData(SiteMaster.leaveDB, "leaveList", "leave", myLeave);
                if (leaveStatus == "OK")
                {
                    string updateUserSickLeaves = Helper.UpdateXmlData(userId, SiteMaster.userDB, "userList", "user", "SICK_LEAVE", remainingSick);
                    string updateUserLocalLeaves = Helper.UpdateXmlData(userId, SiteMaster.userDB, "userList", "user", "LOCAL_LEAVE", remainingLocal);
                    string updateUserAnnualLeaves = Helper.UpdateXmlData(userId, SiteMaster.userDB, "userList", "user", "ANNUAL_LEAVE", remainingAnnual);
                    if (updateUserSickLeaves == "OK" && updateUserLocalLeaves == "OK" && updateUserAnnualLeaves == "OK")
                    {
                        string updateUserLeaveList = Helper.UpdateXmlData(userId, SiteMaster.userDB, "userList", "user", "LEAVELIST",
                    !String.IsNullOrEmpty(currentLeaveList) ? currentLeaveList + ";" + myLeave.ID : myLeave.ID);
                        if (updateUserLeaveList == "OK")
                        {
                            result = Helper.SendMail(email, "Approval", myLeave.ID, userId);
                        }
                        else
                        {
                            result = "Failed to update user leave list.";
                        }
                    }
                    else
                    {
                        result = "Update user failed.";
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
        public static string CancelLeave(string IDLIST, string emailIdList, string userIdList)
        {
            string result = "OK";
            try
            {
                string[] idlist = IDLIST.Split(';');
                string[] userIdLists = userIdList.Split(';');
                string[] emailIdLists = emailIdList.Split(';');
                for (int i = 0; i < idlist.Length; i++)
                {
                    Helper.UpdateXmlData(idlist[i], SiteMaster.leaveDB, "leaveList", "leave", "STATUS", "Cancelled");
                    Helper.UpdateXmlData(idlist[i], SiteMaster.leaveDB, "leaveList", "leave", "APPROVER", "");

                    string email = Regex.Replace(Helper.GetElementById(userIdLists[i], SiteMaster.userDB, "userList", "user").Attribute("EMAIL").Value, "[`]", "@");
                    string cancelMailStatus = Helper.SendMail(email, "Cancel", idlist[i], userIdLists[i]);
                    if (cancelMailStatus == "OK")
                    {
                        string approverEmail = Regex.Replace(Helper.GetElementById(i < emailIdLists.Length ? emailIdLists[i] : emailIdLists[i - 1], SiteMaster.userDB, "userList", "user").Attribute("EMAIL").Value, "[`]", "@");
                        string approverEmailStatus = Helper.SendMail(approverEmail, "Cancel_Approver", idlist[i], i < emailIdLists.Length ? emailIdLists[i] : emailIdLists[i - 1]);
                        if (approverEmailStatus == "OK")
                        {
                            result = Helper.RefillLeave(userIdLists[i], idlist[i]);
                        }
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