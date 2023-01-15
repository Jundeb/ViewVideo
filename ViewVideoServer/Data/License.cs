using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace ViewVideoServer.Data
{
    internal sealed class License
    {
        [Key]
        public int LicenseId { get; set; }

        [Required]
        public DateTime creationTime { get; set; } = DateTime.Now;

        [Required]
        public DateTime expirationDate { get; set; }

        [ForeignKey(nameof(User))]
        public int? UserId { get; set; }
    }
}
