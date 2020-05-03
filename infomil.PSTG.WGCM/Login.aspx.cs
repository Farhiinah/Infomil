using infomil.PSTG.WGCM.Data_Model;
using System;
using System.Collections;
using System.Web.Services;

namespace infomil.PSTG.WGCM
{
    public partial class Login : System.Web.UI.Page
    {
        [WebMethod]
        public static ArrayList GetUserList()
        {
            return Helper.GetUserlist();
        }
    }
}