const fs = require('fs');

class Ticket {
    constructor(numero,escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        let data = require('../data/data.json');
        this.tickets = [];
        this.ultimosCuatro = [];
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimosCuatro = data.ultimosCuatro;
        } else {
            this.reiniciarConteo();
        }
    }
    siguiente() {
        this.ultimo = this.ultimo + 1;
        let ticket = new Ticket(this.ultimo,null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;
    }
    getUltimoTicket(){
        return `Ticket ${this.ultimo}`;
    }
    getUltimos4(){
        return this.ultimosCuatro;
    }
    atenderTicket(escritorio){
        if(this.tickets.length === 0){
            return 'No hay tickets por atender';
        }
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();
        let atenderTicket = new Ticket(numeroTicket,escritorio);
        this.ultimosCuatro.unshift(atenderTicket);

        if(this.ultimosCuatro.length > 4){
            this.ultimosCuatro.splice(-1,1); //Borra el ultimo 
        }
        console.log('Ultimos 4');
        console.log(this.ultimosCuatro);
        this.grabarArchivo();
        return atenderTicket;

    }
    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimosCuatro = [];
        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();
    }
    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            ultimosCuatro: this.ultimosCuatro, 
            tickets: this.tickets
        }
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }
}

module.exports = {
    TicketControl
}