function initSocket(io){
    io.on("connection", (socket) => {
        console.log("user Connected"+socket.id);
        socket.on('join', ({userId})=>{
            socket.join(userId);
            console.log("user joined room"+userId);
        });
        socket.on('send-message', (data)=>{
            const {to, message} = data;
            io.to(to).emit('receive-message', message);
        });
        socket.on('typing', ({ to })=>{
            io.to(to).emit("typing", {});
        });
        socket.on('read-message', ({messageId, to})=>{
            io.to(to).emit("message-read", {messageId});
        }); 
        socket.on("disconnect", () => {
            console.log("User disconnected!");
        });
    });
}
module.exports  = {initSocket, ioInstance}