import { Server } from 'socket.io'
let io: Server
module.exports = {
  init: (server: Server) => {
    io = require('socket.io')(server)
    return io
  },
  getIO: () => {
    if (!io) {
      throw new Error('Socket.io is not initialized')
    }
    return io
  },
}
