using System;
using System.Text.RegularExpressions;

namespace infomil.PSTG.WGCM.Data_Model
{
    public class User { 
        public string ID { get; set; }
        public string FIRSTNAME { get; set; }
        public string LASTNAME { get; set; }
        public string USERNAME { get; set; }
        public string EMAIL { get; set; }
        public string INITIALS { get; set; }
        public string PASSWORD { get; set; }
        public string LVLOFACCESS { get; set; }
        public bool ACTIVE { get; set; }
        public string PROFILEPIC { get; set; }

        public User(string fname, string lname, string uname, string email, string ini, string pswd, string lvlOfAccess, bool active, string profPic)
        {
            this.ID = Regex.Replace(Guid.NewGuid().ToString(), "[-]", "").Replace(" ", String.Empty);
            this.FIRSTNAME = fname;
            this.LASTNAME = lname;
            this.USERNAME = uname;
            this.EMAIL = email;
            this.INITIALS = ini;
            this.PASSWORD = pswd;
            this.LVLOFACCESS = lvlOfAccess;
            this.ACTIVE = active;
            this.PROFILEPIC = profPic;
        }
    }
}