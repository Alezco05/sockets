var socket = io();

var searchParams = new URLSearchParams(window.location.search);
var escritorio = searchParams.get('escritorio');
console.log(searchParams.has('escritorio'));
if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es ');
}

var label = $('small');
$('h1').text('Escritorio ' + escritorio);

$('button').on('click',function(){
    socket.emit('atenderTicket',{escritorio: escritorio},function(resp){
        if(resp === 'No hay tickets por atender'){
        label.text(resp);
            alert(resp);
            return;
        }
        label.text('Ticket ' + resp.numero);
    });
});