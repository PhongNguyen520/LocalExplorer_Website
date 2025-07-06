import * as signalR from "@microsoft/signalr";

let connection = null;

export const startNotificationHub = (accessToken, onReceiveNotification) => {
  var url = process.env.REACT_APP_URL_API;
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
    .then(() => console.log("✅ Connected to notification hub"))
    .catch(err => console.error("❌ Hub connection error: ", err));
};

export const stopNotificationHub = () => {
  if (connection) {
    connection.stop()
      .then(() => console.log("✅ Disconnected from notification hub"))
      .catch(err => console.error("❌ Error disconnecting from hub: ", err));
  }
}; 