﻿using System;
using System.Text.RegularExpressions;

namespace infomil.PSTG.WGCM.Data_Model
{
    public class User
    {
        public string ID { get; set; }
        public string FIRSTNAME { get; set; }
        public string LASTNAME { get; set; }
        public string USERNAME { get; set; }
        public string EMAIL { get; set; }
        public string INITIALS { get; set; }
        public string PASSWORD { get; set; }
        public string LVLOFACCESS { get; set; }
        public string ACTIVE { get; set; }
        public string PROFILEPIC { get; set; }
        public string SICK_LEAVE { get; set; }
        public string LOCAL_LEAVE { get; set; }
        public string ANNUAL_LEAVE { get; set; }
        public string LEAVELIST { get; set; }
        public User(string fname, string lname, string uname, string email, string ini,
            string pswd, string lvlOfAccess, bool active, string profPic,
            string sickLeave, string localLeave, string annualLeave, string leaveList)
        {
            this.ID = Regex.Replace(Guid.NewGuid().ToString(), "[-]", "").Replace(" ", String.Empty);
            this.FIRSTNAME = fname;
            this.LASTNAME = lname;
            this.USERNAME = uname;
            this.EMAIL = email;
            this.INITIALS = ini;
            this.PASSWORD = pswd;
            this.LVLOFACCESS = lvlOfAccess;
            this.ACTIVE = active.ToString().ToLower();
            this.PROFILEPIC = profPic;
            this.SICK_LEAVE = sickLeave;
            this.LOCAL_LEAVE = localLeave;
            this.ANNUAL_LEAVE = annualLeave;
            this.LEAVELIST = leaveList;
        }
    }
}