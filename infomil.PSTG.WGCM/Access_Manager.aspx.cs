using infomil.PSTG.WGCM.Data_Model;
using System.Collections;
using System.Web.Services;

namespace infomil.PSTG.WGCM
{
    public partial class AccessManager : System.Web.UI.Page
    {
        [WebMethod]
        public static ArrayList GetAccesslist()
        {
            return Helper.GetAccesslist();
        }

        [WebMethod]
        public static string SetAccesslevel(string NAME, bool MANAGEUSER, bool MANAGELEAVES, bool MANAGEACCESS, bool VIEWREPORTS, bool ISAPPROVER)
        {
            return Helper.AddXmlData(SiteMaster.accessLvlDB, "accessLevel", "access", new AccessLevel(NAME, MANAGEUSER, MANAGELEAVES, MANAGEACCESS, VIEWREPORTS, ISAPPROVER));
        }

        [WebMethod]
        public static string DelAccesslevel(string ID)
        {
            return Helper.DelXmlData(ID, SiteMaster.accessLvlDB, "accessLevel", "access");
        }
    }
}