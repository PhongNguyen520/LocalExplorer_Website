import * as signalR from "@microsoft/signalr";

let connection = null;

export const startNotificationHub = (accessToken, onReceiveNotification) => {
  var url = "https://localexplorerapi-fcfza8hhgjgwd7df.australiaeast-01.azurewebsites.net";
  
  connection = new signalR.HubConnectionBuilder()
    .withUrl(`${url}/notificationHub`, {
      accessTokenFactory: () => accessToken,
    })
    .withAutomaticReconnect()
    .build();

  connection.on("ReceiveNotification", (message) => {
    if (onReceiveNotification) {
      onReceiveNotification(message);
    }
  });

  connection.start()
    .then()
    .catch(err => console.error("❌ Hub connection error: ", err));
};

export const stopNotificationHub = () => {
  if (connection) {
    connection.stop()
      .then()
      .catch(err => console.error("❌ Error disconnecting from hub: ", err));
  }
}; 