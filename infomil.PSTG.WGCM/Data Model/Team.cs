using System;
using System.Collections;
using System.Text.RegularExpressions;

namespace infomil.PSTG.WGCM.Data_Model
{
    public class Team
    {
        public string ID { get; set; }
        public string NAME { get; set; }
        public string LEAD { get; set; }
        public string MEMBERS { get; set; }

        public Team(string name, string lead, string members)
        {
            this.ID = Regex.Replace(Guid.NewGuid().ToString(), "[-]", "").Replace(" ", String.Empty);
            this.NAME = name;
            this.LEAD = lead;
            this.MEMBERS = members;
        }
    }
}