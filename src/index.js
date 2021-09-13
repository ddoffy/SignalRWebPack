"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./css/main.css");
var signalR = require("@microsoft/signalr");
var divMessage = document.querySelector("#divMessages");
var tbMessage = document.querySelector("#tbMessage");
var btnSend = document.querySelector("#btnSend");
var username = Date.now().toString();
var randomColor = '';
window.onload = function () {
    username = window.prompt("What's your name?");
    var colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
        '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
        '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
        '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
        '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
        '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
        '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
        '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
        '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
    var random_color = colors[Math.floor(Math.random() * colors.length)];
    randomColor = random_color;
};
var connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();
connection.on("messageReceived", function (username, message, color) {
    var m = document.createElement("div");
    if (username == global.username) {
        m.style.float = "right";
    }
    m.innerHTML = "<div class=\"message-author\" style=\"color:" + color + "\">" + username + "</div><div>" + message + "</div>";
    divMessage.appendChild(m);
    divMessage.scrollTop = divMessage.scrollHeight;
});
connection.start().catch(function (err) { return document.write(err); });
tbMessage.addEventListener("keyup", function (e) {
    if (e.key == "Enter") {
        send();
    }
});
btnSend.addEventListener("click", send);
function send() {
    connection.send("newMessage", username, tbMessage.value, randomColor)
        .then(function () { return tbMessage.value = ""; });
}
