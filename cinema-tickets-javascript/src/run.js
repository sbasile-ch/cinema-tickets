import Utils             from './pairtest/lib/Utils.js';
import TicketService     from './pairtest/TicketService.js';
import * as readline     from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const GREEN = "\x1b[32m";
const END   = "\x1b[0m";
const rl    = readline.createInterface({ input, output, terminal: false });
const tService = new TicketService();

//_____________________________
async function run (col=GREEN){

  rl.on('line', l => {
    try {
      l = l.replace(/\s+/g, '');
      let results = l.match(/^(\d+)(.+)/);
      if (results != null) {
        let accountId = parseInt(results[1]);
        l = results[2];
        let requests = Utils.ticketRequestsList(l);
        console.log(`${col}${tService.purchaseTickets(accountId,...requests)}${END}`);
      }
    }
    catch(err) { console.log(err.message);}
  });
  rl.once('close', () => {rl.close();});
}

run();