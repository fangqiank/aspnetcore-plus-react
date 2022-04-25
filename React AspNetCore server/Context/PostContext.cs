using Microsoft.EntityFrameworkCore;
using React_AspNetCore_server.Models;

namespace React_AspNetCore_server.Context
{
    public class PostContext: DbContext
    {
        public DbSet<Post> Posts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=./Data/PostDB.db");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            Post[] postsToSeed = new Post[6];

            for (int i = 1; i <= 6; i++)
            {
                postsToSeed[i - 1] = new Post
                {
                    PostId = i,
                    Title = $"Post {i}",
                    UpdatedAt = DateTime.Now,
                    Content = $"This is post {i} and it has some very " +
                    $"interesting content. I have also liked the video and subscribed."
                };
            }

            modelBuilder.Entity<Post>().HasData(postsToSeed);
        }
    }
}
