/**
 * Immutable Object.
 */
import Ticket from './Ticket.js';

export default class TicketTypeRequest {
  #type;
  #noOfTickets;

  constructor(type, noOfTickets) {
    if (!this.#Type.includes(type)) {
      throw new TypeError(`type must be ${this.#Type.slice(0, -1).join(', ')}, or ${this.#Type.slice(-1)}`);
    }

    if (!Number.isInteger(noOfTickets)) {
      throw new TypeError('noOfTickets must be an integer');
    }

    this.#type = type;
    this.#noOfTickets = noOfTickets;
  }

  getNoOfTickets() {
    return this.#noOfTickets;
  }

  setNoOfTickets(noOfTickets) {
    if (!Number.isInteger(noOfTickets)) {
      throw new TypeError('noOfTickets must be an integer');
    }
    this.#noOfTickets = noOfTickets;
  }

  getTicketType() {
    return this.#type;
  }

  #Type = Ticket.getTypes();
}
