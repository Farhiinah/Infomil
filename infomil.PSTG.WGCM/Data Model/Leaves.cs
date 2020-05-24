using System;
using System.Text.RegularExpressions;

namespace infomil.PSTG.WGCM.Data_Model
{
    public class Leaves
    {
        public string ID { get; set; }
        public string STARTDATE { get; set; }
        public string ENDDATE { get; set; }
        public string LEAVEAMOUNT { get; set; }
        public string NUMBEROFHOURS { get; set; }
        public string SICK_LEAVE { get; set; }
        public string LOCAL_LEAVE { get; set; }
        public string ANNUAL_LEAVE { get; set; }
        public string UNPAID_LEAVE { get; set; }
        public string COMMENT { get; set; }
        public string STATUS { get; set; }

        public string APPROVER { get; set; }

        public Leaves(string startDate, string endDate, string leaveAmount, string numberOfHours, 
            string sickLeave, string localLeave, string annualLeave, string unpaidLeave, string comment, string status)
        {
            this.ID = Regex.Replace(Guid.NewGuid().ToString(), "[-]", "").Replace(" ", String.Empty);
            this.STARTDATE = startDate;
            this.ENDDATE = endDate;
            this.LEAVEAMOUNT = leaveAmount;
            this.NUMBEROFHOURS = numberOfHours;
            this.SICK_LEAVE = sickLeave;
            this.LOCAL_LEAVE = localLeave;
            this.ANNUAL_LEAVE = annualLeave;
            this.UNPAID_LEAVE = unpaidLeave;
            this.COMMENT = comment;
            this.STATUS = status;
            this.APPROVER = "";
        }
    }
}