const {io} = require('../server');
io.on('connection', (client) => {
    console.log('Usuario conectado');
    client.emit('enviarMensaje', {
        usuario: 'Admin',
        mensaje: 'Bienvenido Admin'
    })
    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
    //Escuchar el client
    client.on('enviarMensaje', (data, callback) => {
         console.log(data);
         client.broadcast.emit('enviarMensaje',data);
        /* if (mensaje.usuario) {
            callback({
                resp: 'Todo Salio Bien'
            });
        }
        else {
            callback({
                resp: 'Algo salio mal'
            });
        } */
    })
});

module.exports = io;