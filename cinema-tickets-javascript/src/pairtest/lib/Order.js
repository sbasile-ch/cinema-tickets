import Ticket            from './Ticket.js';
import Utils             from './Utils.js';
import TicketTypeRequest from './TicketTypeRequest.js';
import PriceService      from '../../thirdparty/priceservice/PriceService.js';


const MAX_TICKETS_PER_ORDER = 20;

//_____________________________
class OrderValidation {
  static check(order){}
}
//_____________________________
class ValidateMaxNumberTickets extends  OrderValidation {
  static check(order) {
    let tot = order.getTotNoOfTickets();
    let exceed = tot -  MAX_TICKETS_PER_ORDER;
    if (exceed > 0) {
      order.addErr(`${tot} tickets are ${exceed} more than the ${MAX_TICKETS_PER_ORDER} max allowed (${order.getTicketsList()})`);
    }
  }
}
//_____________________________
class ValidateAdultPresent extends  OrderValidation {
  static check(order) {
    let minors = order.getNoOfTickets('CHILD') + order.getNoOfTickets('INFANT');
    if (order.getNoOfTickets('ADULT') === 0 && minors > 0) {
      order.addErr(`Without an adult the ordered ${minors} ${Utils.plural('ticket',minors)} cannot be sold (${order.getTicketsList()})`);
    }
  }
}
//_____________________________
class ValidateSeats extends  OrderValidation {
  static check(order) {
    if (order.getNoOfTickets('INFANT') > order.getNoOfTickets('ADULT')) {
      order.addErr(`Each infant must be accompanied by an adult (${order.getTicketsList()})`);
    }
  }
}
//_____________________________
export default class Order {
  #accountId;
  #Requests = {};
  #priceService;
  #Err = {};  // hash{} instead of array[] to avoid duplicates. Map() would overkill here
  #validators = [ValidateMaxNumberTickets, ValidateAdultPresent, ValidateSeats];

  constructor(accountId) {
    this.#accountId = accountId;
    for (const t of  Ticket.getTypes()){
      this.#Requests[t] = new TicketTypeRequest(t,0);
    }
    this.#priceService = new PriceService();
  }

  addErr(err) { this.#Err[err] = undefined;}

  getErr() {
    let prepend = `\t(account:${this.#accountId}): `;
    return `${prepend}${Object.keys(this.#Err).sort().join(`\n${prepend}`)}`;
  }  // sort is only to have tests immutable

  isValid() {
    this.#validators.forEach( v => v.check(this));
    return Object.keys(this.#Err).length === 0;
  }

  getNoOfTickets(type) {
    return this.#Requests[type].getNoOfTickets();
  }

  addNoOfTickets(type, n) {
    this.#Requests[type].setNoOfTickets(this.#Requests[type].getNoOfTickets() + n);
  }

  getTotNoOfTickets(type) {
    let n = 0;
    for (const val of Object.values(this.#Requests)) {
      n += val.getNoOfTickets();
    }
    return n;
  }

  getTotal() {
    let priceTotal = 0;
    for (const [key, val] of Object.entries(this.#Requests)) {
      priceTotal += val.getNoOfTickets() * this.#priceService.getPrice(key);
    }
    return priceTotal;
  }

  getTicketsList() {return Object.entries(this.#Requests).map(([key, val]) => `${key}:${val.getNoOfTickets()}`).join(', ');}

  getSeats() {return this.getNoOfTickets('ADULT') + this.getNoOfTickets('CHILD');}

  transactionOk(paym, seats) {
    return `Transaction Successful: account: ${this.#accountId}, payed: £${paym}, ${Utils.plural('seat',seats)}: ${seats} (${this.getTicketsList()})`;
  }
}