import { sql } from "../Config/DBconfig";
export class Attempt {
  constructor(attempt) {
    this.attempt = attempt;
  }
  create = (cb) => {
    sql.query("insert into Attempt set ?", [this.attempt], cb);
  };
}
