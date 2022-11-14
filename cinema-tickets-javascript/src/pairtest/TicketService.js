import TicketTypeRequest        from './lib/TicketTypeRequest.js';
import Order                    from './lib/Order.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import TicketPaymentService     from '../thirdparty/paymentgateway/TicketPaymentService.js';
import SeatReservationService   from '../thirdparty/seatbooking/SeatReservationService.js';

//_____________________________
export default class TicketService {

  #payService;
  #seatService;
  constructor() {
    this.#payService  = new TicketPaymentService();
    this.#seatService = new SeatReservationService();
  }

  purchaseTickets(accountId, ...ticketTypeRequests) {
    let order = new Order(accountId);
    ticketTypeRequests.forEach( r => order.addNoOfTickets(r.getTicketType(), r.getNoOfTickets()) );
    if(!order.isValid()) {
      throw new InvalidPurchaseException(order.getErr());
    }
    let seats = order.getSeats();
    let paym  = order.getTotal();
    this.#payService. makePayment(accountId, paym);
    this.#seatService.reserveSeat(accountId, seats);
    return order.transactionOk(paym, seats);
  }
}
