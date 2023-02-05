using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace ViewVideoServer.Data
{
    internal static class UsersRepository
    {
        static string HashPassword(string password)
        {
            SHA256 hash = SHA256.Create();

            var passwordBytes = Encoding.Default.GetBytes(password);

            var hashedPassword = hash.ComputeHash(passwordBytes);

            return Convert.ToHexString(hashedPassword);
        }

        internal async static Task<List<User>> GetUsersAsync()
        {
            //use db context
            using (var db = new AppDBContext())
            {
                return await db.Users.ToListAsync();
            }
        }

        internal async static Task<User> GetUserByIdAsync(int userId)
        {
            using (var db = new AppDBContext())
            {
                return await db.Users.FirstOrDefaultAsync(user => user.UserId == userId);
            }
        }

        internal async static Task<string> CreateNewUser(User newUser)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    var foundUser = await db.Users.FirstOrDefaultAsync(user => user.Name == newUser.Name);

                    if (foundUser == null)
                    {
                        newUser.Password = HashPassword(newUser.Password);

                        await db.Users.AddAsync(newUser);

                        var saveWasSuccesfull = await db.SaveChangesAsync();

                        if (saveWasSuccesfull >= 1)
                        {
                            return "New user created!";
                        }
                        else
                        {
                            return "Problem while saving to database!";
                        }
                    }
                    else
                    {
                        return "User already exists!";
                    }
                }
                catch (Exception e)
                {
                    return "Problem occurred while creating user.";
                }
            }
        }

        internal async static Task<User> LoginUser(User loginUser)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    var foundUser = await db.Users.FirstOrDefaultAsync(user => user.Name == loginUser.Name);

                    if (foundUser != null)
                    {
                        if (HashPassword(loginUser.Password) == foundUser.Password)
                        {
                            return foundUser;
                        }
                    }
                    return null;
                }
                catch (Exception e)
                {
                    return null;
                }
            }
        }

        internal async static Task<string> UpdateUserAsync(User user)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    var foundUser = await db.Users.FirstOrDefaultAsync(user => user == user);

                    if (foundUser != null)
                    {
                        user.Password = HashPassword(user.Password);

                        db.Users.Update(user);

                        var saveWasSuccesfull = await db.SaveChangesAsync();

                        if (saveWasSuccesfull >= 1)
                        {
                            return "User updated!";
                        }
                        else
                        {
                            return "Problem while saving to database!";
                        }
                    }
                    return "User not found.";

                }
                catch (Exception e)
                {
                    return "Problem occurred while updating user.";
                }
            }
        }

        internal async static Task<string> DeleteUserAsync(string name, string password)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    var foundUser = await db.Users.FirstOrDefaultAsync(user => user.Name == name);

                    if (foundUser != null)
                    {
                        if (HashPassword(password) == foundUser.Password)
                        {
                            db.Remove(foundUser);

                            var saveWasSuccesfull = await db.SaveChangesAsync();

                            if (saveWasSuccesfull >= 1)
                            {
                                return "User deleted!";
                            }
                            else
                            {
                                return "Problem while saving to database!";
                            }
                        }
                        else
                        {
                            return "Password incorrect.";
                        }
                    }
                    return "User not found.";

                }
                catch (Exception e)
                {
                    return "Problem occurred while deleting user.";
                }
            }
        }

        internal async static Task<string> RenewLicenseAsync(string name, int amount)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    var foundUser = await db.Users.FirstOrDefaultAsync(user => user.Name == name);

                    if (foundUser != null)
                    {
                        var foundLicense = await db.Licenses.FirstOrDefaultAsync(license => license.UserId == foundUser.UserId);

                        DateTime currentTime = DateTime.UtcNow;
                        currentTime = currentTime.AddHours(2);

                        if (foundLicense != null && DateTime.Compare(foundLicense.expirationDate, currentTime) == -1)
                        {
                            db.Remove(foundLicense);
                        }
                        else if (foundLicense != null && DateTime.Compare(foundLicense.expirationDate, currentTime) == 1)
                        {
                            return "License still active.";
                        }

                        //user has enough "money"
                        if (foundUser.Balance >= amount)
                        {
                            foundUser.Balance = foundUser.Balance - amount;

                            DateTime expirationTime = DateTime.UtcNow;
                            expirationTime = expirationTime.AddHours(2);
                            expirationTime= expirationTime.AddMinutes(amount);

                            License newLicense = new License
                            {
                                creationTime=currentTime,
                                expirationDate =expirationTime,
                                UserId = foundUser.UserId
                            };

                            await db.Licenses.AddAsync(newLicense);

                            await db.SaveChangesAsync();

                            foundLicense = await db.Licenses.FirstOrDefaultAsync(license => license.UserId == foundUser.UserId);

                            foundUser.LicenseId = foundLicense.LicenseId;

                            db.Users.Update(foundUser);

                            var saveWasSuccesfull = await db.SaveChangesAsync();

                            if (saveWasSuccesfull >= 1)
                            {
                                return "License renewed!";
                            }
                            else
                            {
                                return "Problem while saving to database!";
                            }

                        }
                        else
                        {
                            return "Not enough balance.";
                        }
                    }

                    return "User not found.";

                }
                catch (Exception e)
                {
                    return "Problem occurred while renewing License.";
                }
            }
        }
    }
}
