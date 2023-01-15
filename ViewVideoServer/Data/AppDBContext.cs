using Microsoft.EntityFrameworkCore;

namespace ViewVideoServer.Data
{
    internal sealed class AppDBContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<License> Licenses { get; set; }  

        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) => dbContextOptionsBuilder.UseSqlite("Data source=./Data/AppDB.db");

        //add one test user
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            User[] userToSeed = new User[2];

            for (int i = 1; i <= 2; i++) 
            {
                userToSeed[i - 1] = new User
                {
                    UserId = i,
                    Name = $"TestUser{i}",
                    Password = $"Test123",
                    Balance = 10,
                    LicenseId = null
                };
            }

            modelBuilder.Entity<User>().HasData(userToSeed);
        }
    }
}
