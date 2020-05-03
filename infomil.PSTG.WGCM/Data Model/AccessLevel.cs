using System;
using System.Text.RegularExpressions;

namespace infomil.PSTG.WGCM.Data_Model
{
    public class AccessLevel
    {
        public string ID { get; set; }
        public string NAME { get; set; }
        public bool MANAGEUSER { get; set; }
        public bool MANAGELEAVES { get; set; }
        public bool MANAGEACCESS { get; set; }
        public bool VIEWREPORTS { get; set; }
        public bool ISAPPROVER { get; set; }
        public bool MANAGETEAMS { get; set; }
        public AccessLevel(string name, bool muser, bool mleaves, bool maccess, bool vreport, bool isapprover, bool mteams)
        {
            this.ID = Regex.Replace(Guid.NewGuid().ToString(), "[-]", "").Replace(" ", String.Empty);
            this.NAME = name;
            this.MANAGEUSER = muser;
            this.MANAGELEAVES = mleaves;
            this.MANAGEACCESS = maccess;
            this.VIEWREPORTS = vreport;
            this.ISAPPROVER = isapprover;
            this.MANAGETEAMS = mteams;
        }
    }
}