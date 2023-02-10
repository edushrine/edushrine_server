let io;

module.exports =  {

    init: httpServer =>{

        io = require('socket.io')(httpServer, {
            pingTimeout:600000,
              cors: {
                origin: '*',
                credentials: true,
                methods: ["GET", "POST","PUT","DELETE"]
              },
            })

        return io
    },

    getIO: () =>{

        if(!io) {

            throw new Error('socket io not intialized!');

        }

        return io
    }

}