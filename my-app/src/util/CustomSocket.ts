import * as p from "phoenix";
const SOCKET_ENDPOINT =
  import.meta.env.SOCKET_ENDPOINT || "ws://localhost:4000/socket/websocket";
class CustomSocket extends p.Socket {
  endPointURL() {
    console.log("endpoint called");
    return SOCKET_ENDPOINT;
  }
}

export const elixirSocket = new CustomSocket("/socket");
