const RED = "\x1b[31m";
const END = "\x1b[0m";
const EXCEP_COL = RED;
export default class InvalidPurchaseException extends Error {
    constructor(str) {
        super(`${EXCEP_COL}${str}${END}`);
        this.name = this.constructor.name;
        this.stack = '';
    }
}
