import Ticket            from './Ticket.js';
import TicketTypeRequest from './TicketTypeRequest.js';

export default class Utils {
    static plural(term, num) { return `${term}${ num > 1 ? 's' : ''}`}    // trivial but enough here
    static ticketRequestsList(str) {
        let requests = [];
        Array.from(str.matchAll(/(,([ACI]):(\d+))/gi)).
            forEach( v => requests.push(
                new TicketTypeRequest(Ticket.expandAlias(v[2]), parseInt(v[3])))
            );
        return requests;
    }
}
