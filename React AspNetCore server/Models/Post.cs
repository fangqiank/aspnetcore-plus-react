using System.ComponentModel.DataAnnotations;

namespace React_AspNetCore_server.Models
{
    public class Post
    {
        [Key]
        public int PostId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(100000)]
        public string Content { get; set; } = string.Empty;

        [Required]
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
