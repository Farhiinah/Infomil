using infomil.PSTG.WGCM.Data_Model;
using System;
using System.Collections;
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
            string LOCAL_LEAVE, string SICK_LEAVE, string remainingSick, string remainingLocal, string remainingAnnual, string currentLeaveList)
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
                        result = Helper.UpdateXmlData(userId, SiteMaster.userDB, "userList", "user", "LEAVELIST",
                    !String.IsNullOrEmpty(currentLeaveList) ? currentLeaveList + ";" + myLeave.ID : myLeave.ID);
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
    }
}