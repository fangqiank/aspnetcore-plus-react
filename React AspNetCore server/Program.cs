using Microsoft.OpenApi.Models;
using React_AspNetCore_server.Data;
using React_AspNetCore_server.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(option =>
{
    option.AddPolicy("Policy", builder =>
    {
        builder.AllowAnyOrigin();
        builder.AllowAnyHeader();
        builder.AllowAnyMethod();
    });
});
//builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(opt =>
{
    opt.SwaggerDoc("v1", new OpenApiInfo { Title = "Asp.net Core and React"});
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    //app.UseSwaggerUI();
    app.UseSwaggerUI(opt =>
    {
        opt.DocumentTitle = "The App presented by Asp.net core and React";
        opt.SwaggerEndpoint("/swagger/v1/swagger.json", "Web Api");
        opt.RoutePrefix = String.Empty;
    });
}

app.UseHttpsRedirection();

app.UseCors("policy");

//app.UseAuthorization();

//app.MapControllers();

app.MapGet("/get-all-posts", async () => await PostRepository.GetPostsAsync())
    .WithTags("Posts Endpoints");

app.MapGet("/get-post-by-id", async (int id) =>
{
    var post = await PostRepository.GetPostByIdAsync(id);

    if(post is null)
        return Results.NotFound();
    
    return Results.Ok(post);
})
    .WithTags("Posts Endpoints"); 


app.MapPost("/create-post", async (Post newPost) =>
{
    bool result = await PostRepository.CreatePostAsync(newPost);

    if(result)
        return Results.Ok(newPost);
    else
        return Results.BadRequest();
})
    .WithTags("Posts Endpoints");


app.MapPut("/update-post", async (Post updPost) =>
{
    bool result = await PostRepository.UpdatePostAsync(updPost);

    if (result)
        return Results.Ok("Update Successfully");
    else
        return Results.BadRequest();

})
    .WithTags("Posts Endpoints");

app.MapDelete("/remove-post/{id}", async (int id) =>
{
    bool result = await PostRepository.DeletePostAsync(id);

    if (result)
        return Results.Ok("Delete Successfully");
    else
        return Results.BadRequest();
})
    .WithTags("Posts Endpoints"); ;

app.Run();
