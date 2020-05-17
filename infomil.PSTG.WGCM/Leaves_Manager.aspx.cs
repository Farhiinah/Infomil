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
        public static string CreateLeave(string userId, string LEAVETYPE, string COMMENT,
            string STATUS, string STARTDATE, string ENDDATE, string LEAVETAKING, string LEAVEREMAINING)
        {
            string result = "OK";
            try
            {
                if (Convert.ToInt32(LEAVEREMAINING) > 0)
                {
                    string currentLeaveList = Helper.GetXmlAttributeData(userId, SiteMaster.userDB, "userList", "user", "LEAVELIST").Replace(" ", String.Empty);
                    if (!Helper.DateOverlaps(DateTime.ParseExact(STARTDATE, "dd/MM/yyyy", null), DateTime.ParseExact(ENDDATE, "dd/MM/yyyy", null), currentLeaveList))
                    {
                        Leaves aLeave = new Leaves(LEAVETYPE, COMMENT, STATUS, STARTDATE, ENDDATE, LEAVETAKING);
                        string leaveStatus = Helper.AddXmlData(SiteMaster.leaveDB, "leaveList", "leave", aLeave);
                        if (leaveStatus == "OK" && LEAVEREMAINING != "404")
                        {
                            string userUpdateNumberOfLeaveStatus = Helper.UpdateXmlData(userId, SiteMaster.userDB, "userList", "user",
                                LEAVETYPE, LEAVEREMAINING);
                            if (userUpdateNumberOfLeaveStatus == "OK")
                            {
                                result = Helper.UpdateXmlData(userId, SiteMaster.userDB, "userList", "user", "LEAVELIST",
                                    !String.IsNullOrEmpty(currentLeaveList) ? currentLeaveList + ";" + aLeave.ID : aLeave.ID);
                            }
                        }
                    }
                    else
                    {
                        result = "Period overlaps with another leave.";
                    }
                }
                else
                {
                    result = "Number of leaves taking excess current available leaves.";
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