using Microsoft.EntityFrameworkCore;
using React_AspNetCore_server.Context;
using React_AspNetCore_server.Models;

namespace React_AspNetCore_server.Data
{
    public static class PostRepository
    {
        public static async Task<List<Post>> GetPostsAsync()
        {
            using var db = new PostContext();

            return await db.Posts.ToListAsync();
        }

        public static async Task<Post> GetPostByIdAsync(int id)
        {
            using var db = new PostContext();

            return await db.Posts.FirstOrDefaultAsync(x => x.PostId == id);
        }

        public static async Task<bool> CreatePostAsync(Post newPost)
        {
            using var db = new PostContext();

            try
            {
                await db.Posts.AddAsync(newPost);

                var result = await db.SaveChangesAsync();

                return result > 0;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public static async Task<bool> UpdatePostAsync(Post updPost)
        {
            using var db = new PostContext();

            try
            {
                db.Posts.Update(updPost);

                return await db.SaveChangesAsync() > 0;
            }
            catch(Exception ex)
            {
                return false;
            }
        }

        public static async Task<bool> DeletePostAsync(int id)
        {
            using var db = new PostContext();

            try
            {
                var post = await GetPostByIdAsync(id);
                db.Posts.Remove(post);
                return await db.SaveChangesAsync() > 0;
            }
            catch(Exception ex)
            {
                return false;
            }
        }
    }
}
