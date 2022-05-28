using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace ServerApp
{
    public static class Handlers
    {
        // Default request handler - sends index.html to client
        public static async Task DefaultGet (HttpContext context) 
        {
            await context.Response.SendFileAsync("./wwwroot/index.html");
        }
    }
}