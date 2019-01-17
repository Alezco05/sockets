var socket = io();
        //Esuchar sucesos
        socket.on('connect', function () {
            console.log('Conectado al servidor');
        });
        socket.on('disconnect', function () {
            console.log('Desconectado del servidor');
        });
        //Enviar informacion
        socket.emit('enviarMensaje', {
            usuario: 'Jhon',
            mensaje: 'Hola Mundo'
        }, function (resp) {
            console.log('Respuesta Server:  ', resp);
        });

        //Escuchar informacion
        socket.on('enviarMensaje', function (mensaje) {
            console.log('Servidor: ', mensaje);

        })