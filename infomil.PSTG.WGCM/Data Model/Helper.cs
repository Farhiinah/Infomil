using Newtonsoft.Json;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Script.Serialization;
using System.Xml;
using System.Collections;
using System.Xml.Linq;
using System;
using System.Reflection;
using System.Drawing;
using System.IO;

namespace infomil.PSTG.WGCM.Data_Model
{
    public class Helper
    {
        public static string ReadXmlFileToJsonString(string filePath)
        {
            XmlDocument doc = new XmlDocument();
            XmlTextReader reader = new XmlTextReader(HttpContext.Current.Server.MapPath(filePath))
            {
                WhitespaceHandling = WhitespaceHandling.None
            };
            reader.MoveToContent();
            reader.Read();
            doc.Load(reader);
            reader.Close();
            return JsonConvert.SerializeXmlNode(doc);
        }

        public static ArrayList GetUserlist()
        {
            Dictionary<string, object> myUser = (Dictionary<string, object>)new JavaScriptSerializer().DeserializeObject(Regex.Replace(Regex.Replace(ReadXmlFileToJsonString(SiteMaster.userDB), "[@]", ""), "[`]", "@"));
            dynamic userList = myUser["userList"];
            dynamic users = userList["user"];
            ArrayList userls = new ArrayList();
            if (users.GetType().IsArray)
            {
                foreach (object user in users)
                {
                    userls.Add(user);
                }
            }
            else
            {
                userls.Add(users);
            }
            return userls;
        }

        public static bool UserExist(string email)
        {
            ArrayList userList = GetUserlist();
            bool hasUser = false;
            foreach(dynamic user in userList)
            {
                if (user["EMAIL"] == email)
                {
                    hasUser = true;
                }
            }
            return hasUser;
        }

        public static ArrayList GetAccesslist()
        {
            Dictionary<string, object> myAccess = (Dictionary<string, object>)new JavaScriptSerializer().DeserializeObject(Regex.Replace(ReadXmlFileToJsonString(SiteMaster.accessLvlDB), "[@]", ""));
            dynamic accessList = myAccess["accessLevel"];
            dynamic access = accessList["access"];
            ArrayList accessls = new ArrayList();
            if (access.GetType().IsArray)
            {
                foreach (object user in access)
                {
                    accessls.Add(user);
                }
            }
            else
            {
                accessls.Add(access);
            }
            return accessls;
        }

        public static ArrayList GetTeamlist()
        {
            Dictionary<string, object> myTeam = (Dictionary<string, object>)new JavaScriptSerializer().DeserializeObject(Regex.Replace(ReadXmlFileToJsonString(SiteMaster.teamDB), "[@]", ""));
            dynamic teamList = myTeam["teamList"];
            dynamic teams = teamList["team"];
            ArrayList teamsls = new ArrayList();
            if (teams.GetType().IsArray)
            {
                foreach (object team in teams)
                {
                    teamsls.Add(team);
                }
            }
            else
            {
                teamsls.Add(teams);
            }
            return teamsls;
        }

        public static bool TeamExist(string teamName)
        {
            ArrayList teamList = GetTeamlist();
            bool hasTeam = false;
            foreach (dynamic team in teamList)
            {
                if (team["NAME"] == teamName)
                {
                    hasTeam = true;
                }
            }
            return hasTeam;
        }

        public static string AddXmlData(string db, string rootElement, string tableName, object obj)
        {
            string status = "OK";
            try
            {
                string path = HttpContext.Current.Server.MapPath(db);
                XDocument xdoc = XDocument.Load(path);
                XElement table = new XElement(tableName);
                Type objType = obj.GetType();
                IList<PropertyInfo> props = new List<PropertyInfo>(objType.GetProperties());
                foreach (PropertyInfo prop in props)
                {
                    table.Add(new XAttribute(prop.ToString().Split(' ')[1], prop.GetValue(obj, null).ToString()));
                }
                xdoc.Element("root").Element(rootElement).Add(table);
                xdoc.Save(path);
            }
            catch (Exception e)
            {
                status = e.Message;
            }
            return status;
        }

        public static string UpdateXmlData(string id, string db, string rootElement, string tableName, string attributeToUpdate, string attributeVal)
        {
            string status = "OK";
            try
            {
                string path = HttpContext.Current.Server.MapPath(db);
                XDocument xdoc = XDocument.Load(path);
                var ls = xdoc.Element("root").Element(rootElement).Elements(tableName);
                foreach (var element in ls)
                {
                    if (element.Attribute("ID").Value == id)
                    {
                        element.Attribute(attributeToUpdate).Value = attributeVal;
                    }
                }
                xdoc.Save(path);
            }
            catch(Exception e)
            {
                status = e.Message;
            }
            return status;
        }

        public static string DelXmlData(string id, string db, string rootElement, string tableName)
        {
            string status = "OK";
            try
            {
                string path = HttpContext.Current.Server.MapPath(db);
                XDocument xdoc = XDocument.Load(path);
                var ls = xdoc.Element("root").Element(rootElement).Elements(tableName);
                foreach (var element in ls)
                {
                    if(element.Attribute("ID").Value == id)
                    {
                        element.Remove();
                    }
                }
                xdoc.Save(path);
            }
            catch (Exception e)
            {
                status = e.Message;
            }
            return status;
        }
    }
}