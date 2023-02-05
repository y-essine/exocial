import { ref } from "vue";
import openSocket from "socket.io-client";
import { currentUrlWithPortNumber } from "../utils/url-manipulation.js";

export function useSocketIo(port) {
  return openSocket(currentUrlWithPortNumber(port));
}

export function useSocketName(socket) {
  const name = ref("");

  socket.on("name", serverName => {
    name.value = serverName;
  });

  function setDisplayName(value) {
    console.log(value);
    socket.emit("updateName", value);
    console.log(socket);
  }

  return [name, setDisplayName];
}