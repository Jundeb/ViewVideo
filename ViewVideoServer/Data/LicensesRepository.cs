using Microsoft.EntityFrameworkCore;

namespace ViewVideoServer.Data
{
    internal static class LicensesRepository
    {
        internal async static Task<List<License>> GetLicensesAsync()
        {
            using (var db = new AppDBContext())
            {
                return await db.Licenses.ToListAsync();
            }
        }

        internal async static Task<License> GetLicenseByIdAsync(int licenseId)
        {
            using (var db = new AppDBContext())
            {
                return await db.Licenses.FirstOrDefaultAsync(license => license.LicenseId == licenseId);
            }
        }

        internal async static Task<License> GetLicenseByUserIdAsync(int userId)
        {
            using (var db = new AppDBContext())
            {
                return await db.Licenses.FirstOrDefaultAsync(license => license.UserId == userId);
            }
        }

        internal async static Task<string> CreateNewLicenseAsync(License newLicense)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    await db.Licenses.AddAsync(newLicense);

                    var saveWasSuccesfull = await db.SaveChangesAsync();

                    if (saveWasSuccesfull >= 1)
                    {
                        return "New license created!";
                    }
                    else
                    {
                        return "Problem while saving to database!";
                    }
                }
                catch (Exception)
                {
                    return "Problem occurred while creating a license.";
                }
            }
        }

        internal async static Task<string> UpdateLicenseAsync(License newLicense)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    db.Licenses.Update(newLicense);

                    var saveWasSuccesfull = await db.SaveChangesAsync();

                    if (saveWasSuccesfull >= 1)
                    {
                        return "License updated!";
                    }
                    else
                    {
                        return "Problem while saving to database!";
                    }
                }
                catch (Exception)
                {
                    return "Problem occurred while updating a license.";
                }
            }
        }

        internal async static Task<string> DeleteLicenseAsync(int licenseId)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    License licenseToBeDeleted = await GetLicenseByIdAsync(licenseId);

                    db.Remove(licenseToBeDeleted);

                    var saveWasSuccesfull = await db.SaveChangesAsync();

                    if (saveWasSuccesfull >= 1)
                    {
                        return "License deleted!";
                    }
                    else
                    {
                        return "Problem while saving to database!";
                    }
                }
                catch (Exception)
                {
                    return "Problem occurred while deleting a license.";
                }
            }
        }
    }
}
