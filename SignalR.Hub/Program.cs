using SignalR.HubServer.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();
builder.Services.AddCors(options => 
    {
        options.AddPolicy("ClientPolicy", policy =>
        {
         policy
        .WithOrigins("https://localhost:7002")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
        });
    });
var app = builder.Build();

    app.UseHttpsRedirection();
    app.UseRouting();
    app.UseCors("ClientPolicy");
    app.MapHub<ChatHub>("/chatHub");
    app.Run();
