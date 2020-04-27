using Newtonsoft.Json;
using System;
using System.Web;
using System.Web.Services;
using System.Xml;

namespace infomil.PSTG.WGCM
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
        }

        [WebMethod]
        public static String GetUserList()
        {
            XmlDocument doc = new XmlDocument();
            XmlTextReader reader = new XmlTextReader(HttpContext.Current.Server.MapPath("Data/user.xml"))
            {
                WhitespaceHandling = WhitespaceHandling.None
            };
            reader.MoveToContent();
            reader.Read();
            doc.Load(reader);
            String user = JsonConvert.SerializeXmlNode(doc);
            return user;
        }
    }
}