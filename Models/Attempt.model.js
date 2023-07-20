// Import the sql connection from the DBconfig module
import { sql } from "../Config/DBconfig";

// Class representing an 'Attempt' object
export class Attempt {
  constructor(attempt) {
    this.attempt = attempt;
  }

  // Method to create an 'Attempt' record in the database
  create = (cb) => {
    // Execute the SQL query to insert the 'Attempt' object into the 'Attempt' table
    sql.query("insert into Attempt set ?", [this.attempt], cb);
  };
}
