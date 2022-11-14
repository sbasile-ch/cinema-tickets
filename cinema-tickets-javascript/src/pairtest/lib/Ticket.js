export default class Ticket {

  static #Types = ['ADULT', 'CHILD', 'INFANT'];

  static getTypes () {return this.#Types;}

  static expandAlias(alias) {
    for (const t of this.#Types){
      if (alias == Array.from(t)[0]) {alias = t; break;};
    }
    return alias;
  }
}