"use strict";
    const connection =
    new signalR.HubConnectionBuilder()
        .withUrl("https://signalrhub20261031193909-fve5f3bghjduhwat.canadacentral-01.azurewebsites.net/chatHub")
        .withAutomaticReconnect()
        .build();

    const sendButton =
    document.getElementById("sendButton");
    const status =
    document.getElementById("status");
    const messagesList =
    document.getElementById("messagesList");

    connection.on("ReceiveMessage", (message) => {
    const item = document.createElement("li");
    item.textContent =
        `${message.user}: ${message.message}`;
    messagesList.appendChild(item);
    });

    connection.onreconnected(() => {
    status.textContent = "Conectado";
    sendButton.disabled = false;
    });

    async function startConnection() {
     try {
        await connection.start();
        status.textContent = "Conectado";
        sendButton.disabled = false;
        } catch (error) {
        status.textContent = "Error de conexión";
        console.error(error);
    }
}
    sendButton.addEventListener("click", async () => {
        const user = document
        .getElementById("userInput").value.trim();
        const message = document
            .getElementById("messageInput").value.trim();

        if (!user || !message) {
            alert("Completa el usuario y el mensaje.");
            return;
        }
    
        if (connection.state !==
            signalR.HubConnectionState.Connected) {
            alert("No existe una conexión activa.");
            return;
        }

        try {
            await connection.invoke(
                "SendMessage", user, message);
            document.getElementById("messageInput")
                .value = "";
        } catch (error) {
            console.error(
                "No se pudo enviar el mensaje:", error);
        }
    });
startConnection();