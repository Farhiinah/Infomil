using System;
using System.Text.RegularExpressions;

namespace infomil.PSTG.WGCM.Data_Model
{
    public class Leaves
    {
        public string ID { get; set; }
        public string LEAVETYPE { get; set; }
        public string COMMENT { get; set; }
        public string STATUS { get; set; }
        public string STARTDATE { get; set; }
        public string ENDDATE { get; set; }
        public string LEAVEAMOUNT { get; set; }
        public Leaves(string leaveType, string comment, string status, string startDate, string endDate, string leaveAmount)
        {
            this.ID = Regex.Replace(Guid.NewGuid().ToString(), "[-]", "").Replace(" ", String.Empty);
            this.LEAVETYPE = leaveType;
            this.COMMENT = comment;
            this.STATUS = status;
            this.STARTDATE = startDate;
            this.ENDDATE = endDate;
            this.LEAVEAMOUNT = leaveAmount;
        }
    }
}