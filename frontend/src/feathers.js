import io from "socket.io-client";
import feathers from "@feathersjs/client";

const app = feathers();
const socket = io("http://localhost:3030");
app.configure(feathers.socketio(socket));

export default app;
