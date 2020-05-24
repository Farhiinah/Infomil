using infomil.PSTG.WGCM.Data_Model;
using System.Web.Services;
using System.Collections;
using System;

namespace infomil.PSTG.WGCM
{
    public partial class Requests_Manager : System.Web.UI.Page
    {
        [WebMethod]
        public static string ApproveLeave(string IDLIST, string approverId)
        {
            string result = "OK";
            try
            {
                string[] idlist = IDLIST.Split(';');
                for (int i = 0; i < idlist.Length; i++)
                {
                    Helper.UpdateXmlData(idlist[i], SiteMaster.leaveDB, "leaveList", "leave", "STATUS", "Approved");
                    Helper.UpdateXmlData(idlist[i], SiteMaster.leaveDB, "leaveList", "leave", "APPROVER", approverId);
                }
            }
            catch(Exception e)
            {
                result = e.Message;
            }
            return result;
        }

        [WebMethod]
        public static string RejectLeave(string IDLIST, string approverId)
        {
            string result = "OK";
            try
            {
                string[] idlist = IDLIST.Split(';');
                for (int i = 0; i < idlist.Length; i++)
                {
                    Helper.UpdateXmlData(idlist[i], SiteMaster.leaveDB, "leaveList", "leave", "STATUS", "Rejected");
                    Helper.UpdateXmlData(idlist[i], SiteMaster.leaveDB, "leaveList", "leave", "APPROVER", approverId);
                }
            }
            catch (Exception e)
            {
                result = e.Message;
            }
            return result;
        }

        [WebMethod]
        public static string EscalateLeave(string IDLIST, string approverId)
        {
            string result = "OK";
            try
            {
                string[] idlist = IDLIST.Split(';');
                for (int i = 0; i < idlist.Length; i++)
                {
                    Helper.UpdateXmlData(idlist[i], SiteMaster.leaveDB, "leaveList", "leave", "STATUS", "Escalated");
                    Helper.UpdateXmlData(idlist[i], SiteMaster.leaveDB, "leaveList", "leave", "APPROVER", approverId);
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