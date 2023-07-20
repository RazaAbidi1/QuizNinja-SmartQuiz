// Import the sql connection from the DBconfig module
import { sql } from "../Config/DBconfig.js";

// Class representing a 'Subject' object
export class Subject {
  constructor(subject) {
    // Initialize properties of the 'Subject' object based on the provided data
    this.subject_id = subject.id;
    this.subject_name = subject.name;
  }

  // Method to create a 'Subject' record in the database
  create = (result) => {
    // Execute the SQL query to insert the 'Subject' object into the 'subject' table
    sql.query("INSERT INTO subject SET ?", [this], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Created subject: ", res);
      result(null, res);
    });
  };

  // Static method to get all subjects from the 'subject' table
  static getAll = (result) => {
    // Execute the SQL query to retrieve all subjects from the 'subject' table
    sql.query("SELECT subject_name FROM subject", (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("Found Subjects: ", res);
        result(null, { Found: true, ...res });
        return;
      }
      // No subjects found in the 'subject' table
      result(null, { Found: false, ...res });
    });
  };

  // Static method to find teachers associated with a specific subject
  static Find_Teacher = (name, result) => {
    // Execute the SQL query to retrieve teachers associated with the provided subject name
    sql.query(
      "SELECT t1.teacher_name, t1.teacher_id, t1.subject__id, t2.subject_name FROM teacher t1 JOIN subject t2 ON t1.subject__id = t2.subject_id WHERE t2.subject_name = ?;",
      [name],
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (res.length) {
          console.log("Found Teachers: ", res);
          result(null, { Found: true, ...res });
          return;
        }
        // No teachers found associated with the provided subject name
        result(null, { Found: false, ...res });
      }
    );
  };
}

