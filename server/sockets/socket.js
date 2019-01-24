const {io} = require('../server');
const {TicketControl} = require('../classes/ticket-control');

const tickeControl = new TicketControl();
io.on('connection', (client) => {
   client.on('siguienteTicket',(data,callback)=>{
       let siguente = tickeControl.siguiente();
       callback(siguente);
   });
   client.emit('estadoActual',{
       actual:tickeControl.getUltimoTicket(),
       ultimos4: tickeControl.getUltimos4()
   });
   client.on('atenderTicket',(data,callback)=>{
       if(!data.escritorio){
           return callback({
               err:true,
               mensaje: 'Escritorio necesario'
           })
       }
       let atenderTicket = tickeControl.atenderTicket(data.escritorio);
       callback(atenderTicket);
       client.broadcast.emit('ultimos4',{
           ultimos4: tickeControl.getUltimos4()
       });
       //actualizar // notificar cambios en los ULTIMOS 4
       
   })
});

module.exports = io;