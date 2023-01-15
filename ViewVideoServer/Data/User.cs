using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace ViewVideoServer.Data
{
    internal sealed class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        [MaxLength(50)]
        public string? Name { get; set; }

        [Required]
        [MaxLength(50)]
        public string? Password { get; set; }

        [Required]

        public int Balance { get; set; } = 10;

        [ForeignKey(nameof(License))]
        public int? LicenseId { get; set; }
    }
}
