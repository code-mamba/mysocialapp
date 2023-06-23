const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const mongoose = require("mongoose");
const Post = require("../Backend/models/Post");

mongoose
  .connect("mongodb://localhost:27017/myFb_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.error("failed to connect Mongodb", error);
  });

let users = [];
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};
// This method is to remove the user id from the user array when he disconnect
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (myId) => {
  return users.find((user) => user.userId === myId);
};

io.on("connection", (socket) => {
  // when connect
  console.log("a user connected");
  io.emit("welcome", "hello this is socket server!");
  // take userId and socketId from user and store it in user array using the addUser method
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
  // send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    if (user) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    } else {
      console.log("User Not found");
    }
  });
  // when disconnect
  socket.on("disconnect", () => {
    console.log("user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
