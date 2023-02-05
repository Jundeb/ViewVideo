using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerUI;
using ViewVideoServer.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(swaggerGenOptions => 
{
    swaggerGenOptions.SwaggerDoc("v1", new OpenApiInfo{ Title = "ViewVideo ASP.NET", Version = "v1"});
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy", builder =>
    {
        builder
        .AllowAnyMethod()
        .AllowAnyHeader()
        .WithOrigins("http://localhost:3000", "https://proud-rock-03e39a603.2.azurestaticapps.net");
    });
});


var app = builder.Build();

//always launch Swagger
app.UseSwagger();
app.UseSwaggerUI(SwaggerUIOptions => 
{
    SwaggerUIOptions.DocumentTitle = "ASP.NET ViewVideo";
    SwaggerUIOptions.SwaggerEndpoint("/swagger/v1/swagger.json", "Web API serving User and License models.");
    SwaggerUIOptions.RoutePrefix = String.Empty;
});


app.UseHttpsRedirection();

app.UseCors("CORSPolicy");

//user endpoints

app.MapGet("/get-all-users", async () => await UsersRepository.GetUsersAsync())
    .WithTags("User Endpoints");

app.MapGet("/get-user/{name}", async (int userId) =>
{
    User userToReturn = await UsersRepository.GetUserByIdAsync(userId);

    if (userToReturn != null)
    {
        return Results.Ok(userToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("User Endpoints");

app.MapPost("/create-new-user", async (User newUser) =>
{
    string result = await UsersRepository.CreateNewUser(newUser);

    if (result == "New user created!")
    {
        return Results.Ok(result);
    }
    else
    {
        return Results.BadRequest(result);
    }
}).WithTags("User Endpoints");

app.MapPost("/login", async (User loginUser) =>
{
    User userToReturn = await UsersRepository.LoginUser(loginUser);

    if (userToReturn != null)
    {
        return Results.Ok(userToReturn);
    }
    else
    {
        return Results.BadRequest("Username or Password incorrect!");
    }
}).WithTags("User Endpoints");

app.MapPut("/update-user", async (User newUser) =>
{
    string result = await UsersRepository.UpdateUserAsync(newUser);

    if (result == "User updated!")
    {
        return Results.Ok(result);
    }
    else
    {
        return Results.BadRequest(result);
    }
}).WithTags("User Endpoints");

app.MapDelete("/delete-user", async (string name, string password) =>
{
    string result = await UsersRepository.DeleteUserAsync(name, password);

    if (result == "User deleted!")
    {
        return Results.Ok(result);
    }
    else
    {
        return Results.BadRequest(result);
    }
}).WithTags("User Endpoints");

app.MapPost("/renew-license", async (string name, int amount) =>
{
    string result = await UsersRepository.RenewLicenseAsync(name, amount);

    if (result.StartsWith("License renewed!"))
    {
        return Results.Ok(result);
    }
    else
    {
        return Results.BadRequest(result);
    }
}).WithTags("User Endpoints");

//License endpoints

app.MapGet("/get-all-licenses", async () => await LicensesRepository.GetLicensesAsync())
    .WithTags("License Endpoints");

app.MapGet("/get-license/{licenseId}", async (int licenseId) =>
{
    License licenseToReturn = await LicensesRepository.GetLicenseByIdAsync(licenseId);

    if (licenseToReturn != null)
    {
        return Results.Ok(licenseToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("License Endpoints");

app.MapGet("/get-license-byUserId/{userId}", async (int userId) =>
{
    License licensteToReturn = await LicensesRepository.GetLicenseByUserIdAsync(userId);

    if (licensteToReturn != null)
    {
        return Results.Ok(licensteToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("License Endpoints");

app.MapPost("/create-new-license", async (License newLicense) =>
{
    string result = await LicensesRepository.CreateNewLicenseAsync(newLicense);

    if (result == "New license created!")
    {
        return Results.Ok(result);
    }
    else
    {
        return Results.BadRequest(result);
    }
}).WithTags("License Endpoints");

app.MapPut("/update-license", async (License newLicense) =>
{
    string result = await LicensesRepository.UpdateLicenseAsync(newLicense);

    if (result == "License updated!")
    {
        return Results.Ok(result);
    }
    else
    {
        return Results.BadRequest(result);
    }
}).WithTags("License Endpoints");


app.MapDelete("/delete-license", async (int licenseId) =>
{
    string result = await LicensesRepository.DeleteLicenseAsync(licenseId);

    if (result == "License deleted!")
    {
        return Results.Ok(result);
    }
    else
    {
        return Results.BadRequest(result);
    }
}).WithTags("License Endpoints");


app.Run();
