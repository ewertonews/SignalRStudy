using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SignalRStudy.Hubs
{
    public class ChatHub : Hub
    {
        //Chamado pelo connection.invoke no arquito chat.js
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}
