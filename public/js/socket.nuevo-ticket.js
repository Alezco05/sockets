//// Comando para establecer la conexión
var socket = io();
var label = $('#lblNuevoTicket');
socket.on('connect',function(client){
    console.log('Usuario Conectado');
    
});

socket.on('disconnect',function(client){
    console.log('Desconectado del servidor');
});

socket.on('estadoActual',function(resp){
    label.text(resp.actual);
})

$('button').on('click',function(){
    socket.emit('siguienteTicket',null,function(siguienteTicket){
        label.text(siguienteTicket);
    });
});