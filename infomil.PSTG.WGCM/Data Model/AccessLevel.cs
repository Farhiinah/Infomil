using System;
using System.Text.RegularExpressions;

namespace infomil.PSTG.WGCM.Data_Model
{
    public class AccessLevel
    {
        public string ID { get; set; }
        public string NAME { get; set; }
        public string MANAGEUSER { get; set; }
        public string MANAGELEAVES { get; set; }
        public string MANAGEACCESS { get; set; }
        public string VIEWREPORTS { get; set; }
        public string ISAPPROVER { get; set; }
        public string MANAGETEAMS { get; set; }
        public AccessLevel(string name, bool muser, bool mleaves, bool maccess, bool vreport, bool isapprover, bool mteams)
        {
            this.ID = Regex.Replace(Guid.NewGuid().ToString(), "[-]", "").Replace(" ", String.Empty);
            this.NAME = name;
            this.MANAGEUSER = muser.ToString().ToLower();
            this.MANAGELEAVES = mleaves.ToString().ToLower();
            this.MANAGEACCESS = maccess.ToString().ToLower();
            this.VIEWREPORTS = vreport.ToString().ToLower();
            this.ISAPPROVER = isapprover.ToString().ToLower();
            this.MANAGETEAMS = mteams.ToString().ToLower();
        }
    }
}