using Microsoft.AspNetCore.SignalR;

using System.Threading.Tasks;
namespace SignalRWebPack.Hubs
{
    public class ChatHub : Hub
    {
        public async Task NewMessage(string username, string message, string color)
        {
            await Clients.All.SendAsync("messageReceived", username, message, color);
        }
    }
}