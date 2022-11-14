/* eslint-disable */

export default class PriceService {

  constructor() {
      //<...> likely a DB connection here
  }

  getPrice(ticketType) {
    let price = 0;
    switch(ticketType){
      case 'ADULT': price = 20;  break;
      case 'CHILD': price = 10;  break;
      case 'INFANT': break;
      default: throw new TypeError(`No price set for ticket: ${ticketType}`);
    }
    return price;
  }
}
