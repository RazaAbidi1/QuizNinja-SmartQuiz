import Jwt from "jsonwebtoken";
import { Questions } from "../Models/Question.model.js";
import { shuffleArray } from "../Helper/ShuffleArray.js";

export const testSocket = (socket) => {
  console.log("New client connected");

  socket.on("getQuestion", (obj) => {
    // Simulate authentication logic
    const { token, teacher_id } = obj;
    if (token) {
      Jwt.verify(token, process.env.PrivateKey, function (err, decoded) {
        if (err) {
          console.log("Authentication failed");
          socket.disconnect(true);
        } else {
          if (decoded.Type === "Start Test") {
            console.log(decoded.id);
            req.body.id = decoded.id;
            req.body.Type = decoded.Type;
            console.log("Client authenticated successfully");
            Questions.findById(teacher_id, (err, res) => {
              if (err) {
                socket.emit("data", err);
              } else {
                shuffleArray(res);
                socket.emit("data", res);
                socket.disconnect();
              }
            });
          } else {
            console.log("Authentication failed");
            socket.disconnect(true);
          }
        }
      });
    } else {
      console.log("Authentication failed");
      socket.disconnect(true);
    }
  });

  //for getting answers
  socket.on("sendAnswers", (obj) => {});

  // Event handler for disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
};
