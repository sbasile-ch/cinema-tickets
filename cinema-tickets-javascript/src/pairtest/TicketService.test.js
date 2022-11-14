import Utils                    from './lib/Utils.js';
import TicketService            from './TicketService.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';

const tService = new TicketService();
var   accountId = 82965471;
var   t = 1;

const ticketsList = (A, C, I) => {return `(ADULT:${A}, CHILD:${C}, INFANT:${I})`};
const expectedOk = (acc, pay, seats, A, C, I) =>
{return `Transaction Successful: account: ${acc}, payed: £${pay}, seats: ${seats} ${ticketsList(A, C, I)}`};

const expectedNokTot = (acc, tickets, exceed, max, A, C, I) =>
{return `(account:${acc}): ${tickets} tickets are ${exceed} more than the ${max} max allowed ${ticketsList(A, C, I)}`};

const expectedNokAdult = (acc, tickets, A, C, I) =>
{return `(account:${acc}): Without an adult the ordered ${tickets} tickets cannot be sold ${ticketsList(A, C, I)}`};

const expectedNokInfant = (acc, A, C, I) =>
{return `(account:${acc}): Each infant must be accompanied by an adult ${ticketsList(A, C, I)}`};

const testCore = (input, output) => {
  console.log(`${input} --> ${output}`);
  const requests = Utils.ticketRequestsList(input);
  return tService.purchaseTickets(accountId,...requests);
};

test(`test ${t++} - purchaseTickets()`, () => {
  const input = `${accountId},A:3,C:2,A:2,I:8,A:2,A:0,A:3`;
  const output = expectedOk(accountId, 220, 12, 10, 2, 8);
  expect(testCore(input, output)).toBe(output);
});

test(`test ${t++} - purchaseTickets()`, () => {
  const input = `${accountId},A:1,C:2,A:2,I:5,A:2,A:3,A:1`;
  const output = expectedOk(accountId, 200, 11, 9, 2, 5);
  expect(testCore(input, output)).toBe(output);
});

test(`test ${t++} - purchaseTickets()`, () => {
  const input = `${accountId},A:1,C:2,A:2,I:6,A:2,A:0,A:1`;
  const output = expectedOk(accountId, 140, 8, 6, 2, 6);
  expect(testCore(input, output)).toBe(output);
});

test(`test ${t++} - purchaseTickets()`, () => {
  const input = `${accountId},A:3,C:10,A:2,I:7,A:2,A:0,A:3`;
  const output = expectedNokTot(accountId, 27, 7, 20, 10, 10, 7);
  expect(() => {testCore(input, output)}).toThrow(InvalidPurchaseException);
  expect(() => {testCore(input, output)}).toThrow(output);
});

test(`test ${t++} - purchaseTickets()`, () => {
  const input = `${accountId},A:3,C:0,C:2,A:2,I:11,A:2,A:0,A:3`;
  const output = `\t${expectedNokTot(accountId, 23, 3, 20, 10, 2, 11)}\n\t${expectedNokInfant(accountId, 10, 2, 11)}`;
  expect(() => {testCore(input, output)}).toThrow(InvalidPurchaseException);
  expect(() => {testCore(input, output)}).toThrow(output);
});

test(`test ${t++} - purchaseTickets()`, () => {
  const input = `${accountId},I:3,C:0,C:2,I:2,I:5,C:2,I:0,C:3`;
  const output = `\t${expectedNokInfant(accountId, 0, 7, 10)}\n\t${expectedNokAdult(accountId, 17, 0, 7, 10)}`;
  expect(() => {testCore(input, output)}).toThrow(InvalidPurchaseException);
  expect(() => {testCore(input, output)}).toThrow(output);
});
