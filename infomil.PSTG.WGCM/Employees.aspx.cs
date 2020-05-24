using infomil.PSTG.WGCM.Data_Model;
using System;
using System.Collections;
using System.IO;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Services;

namespace infomil.PSTG.WGCM
{
    public partial class Employees : System.Web.UI.Page
    {
        [WebMethod]
        public static ArrayList GetUserList()
        {
            return Helper.GetUserlist();
        }

        [WebMethod]
        public static string CreateUser(string FIRSTNAME, string LASTNAME, string USERNAME, string EMAILADDRESS, string INITIALS, string PASSWORD, string LVLOFACCESS, string PROFILEPIC, string fileExtension, string SICKLEAVE, string LOCALLEAVE, string ANNUALLEAVE)
        {
            string result = "OK";
            try
            {
                if (!Helper.UserExist(EMAILADDRESS))
                {
                    string filePath = "assets/img/profiles/img-6.jpg";
                    if (PROFILEPIC != null)
                    {
                        filePath = "assets/img/profiles/profilePic_" + USERNAME + "." + fileExtension;
                    }
                    string saveUserResponse = Helper.AddXmlData(SiteMaster.userDB, "userList", "user", new User(FIRSTNAME, LASTNAME, USERNAME, Regex.Replace(EMAILADDRESS, "[@]", "`"), INITIALS, PASSWORD, LVLOFACCESS, true, filePath, SICKLEAVE, LOCALLEAVE, ANNUALLEAVE, ""));
                    if (saveUserResponse == "OK" && PROFILEPIC != null)
                    {
                        File.WriteAllBytes(HttpContext.Current.Server.MapPath(filePath), Convert.FromBase64String(PROFILEPIC));
                    }
                    else
                    {
                        result = saveUserResponse;
                    }
                }
                else
                {
                    result = "User already exists.";
                }
            }
            catch(Exception e)
            {
                result = e.Message;
            }
            return result;
        }

        [WebMethod]
        public static string ActivateUser(string ID)
        {
            return Helper.UpdateXmlData(ID, SiteMaster.userDB, "userList", "user", "ACTIVE", "true");
        }

        [WebMethod]
        public static string DeactivateUser(string ID)
        {
            return Helper.UpdateXmlData(ID, SiteMaster.userDB, "userList", "user", "ACTIVE", "false");
        }

        [WebMethod]
        public static string DelUser(string ID)
        {
            return Helper.DelXmlData(ID, SiteMaster.userDB, "userList", "user");
        }

        [WebMethod]
        public static ArrayList GetTeamlist()
        {
            return Helper.GetTeamlist();
        }

        [WebMethod]
        public static string CreateTeam(string TEAMNAME, string TEAMLEAD, string TEAMMANAGER, string TEAMMEMBERS)
        {
            string result = "OK";
            try
            {
                if (!Helper.TeamExist(TEAMNAME))
                {
                    Helper.AddXmlData(SiteMaster.teamDB, "teamList", "team", new Team(TEAMNAME, TEAMLEAD, TEAMMANAGER, TEAMMEMBERS));
                }
                else
                {
                    result = "Team already exists.";
                }
            }
            catch (Exception e)
            {
                result = e.Message;
            }
            return result;
        }

        [WebMethod]
        public static string DeleteTeam(string ID)
        {
            return Helper.DelXmlData(ID, SiteMaster.teamDB, "teamList", "team");
        }
    }
}