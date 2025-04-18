// Engagement.cs
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using _413Final.API.Data;               // 👈 add this if namespaces differ

namespace _413Final.API.Data            // 👈 make sure this matches Entertainer.cs
{
    public class Engagement
    {
        [Key] public int EngagementNumber { get; set; }

        public string? StartDate  { get; set; }
        public string? EndDate    { get; set; }
        public string? StartTime  { get; set; }
        public string? StopTime   { get; set; }
        public decimal? ContractPrice { get; set; }

        public int CustomerID  { get; set; }
        public int AgentID     { get; set; }

        /* Foreign key */
        public int EntertainerID { get; set; }

        /* Navigation property */
        [ForeignKey(nameof(EntertainerID))]
        public Entertainer? Entertainer { get; set; }
    }
}