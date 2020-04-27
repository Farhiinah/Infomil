using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace infomil.PSTG.WGCM.Data_Model
{
    [DataContract]
    public class User
    {
        private Guid ID = new Guid();

        [DataMember]
        private String FIRSTNAME { get; set; }

        [DataMember]
        private String LASTNAME { get; set; }

        [DataMember]
        private String USERNAME { get; set; }

        [DataMember]
        private String INITIALS { get; set; }

        [DataMember]
        private String PASSWORD { get; set; }

        [DataMember]
        private bool ISADMIN { get; set; }

        public User(String fname, String lname, String uname, String ini, String pswd, bool isAdmin)
        {
            this.FIRSTNAME = fname;
            this.LASTNAME = lname;
            this.USERNAME = uname;
            this.INITIALS = ini;
            this.PASSWORD = pswd;
            this.ISADMIN = isAdmin;
        }
    }
}