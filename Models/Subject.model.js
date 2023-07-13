import { sql } from "../Config/DBconfig.js";

export class Subject {
  constructor(subject) {
    this.subject_id = subject.id;
    this.subject_name = subject.name;
  }
  create = (result) => {
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

  static getAll = (result) => {
    sql.query("Select subject_name From subject", (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found Teachers: ", res);
        result(null, { Found: true, ...res });
        return;
      }
      // not found Login with the id
      result(null, { Found: false, ...res });
    });
  };

  static Find_Teacher = (name, result) => {
    sql.query(
      "SELECT t1.teacher_name,t1.teacher_id, t1.subject__id, t2.subject_name FROM teacher t1 JOIN subject t2 ON t1.subject__id= t2.subject_id WHERE t2.subject_name = ?;",
      [name],
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (res.length) {
          console.log("found Teachers: ", res);
          result(null, { Found: true, ...res });
          return;
        }
        // not found Login with the id
        result(null, { Found: false, ...res });
      }
    );
  };
}

// Testing
// let ans = new answer({
//   answer_id: "1",
//   question_id: "1",
//   selected_answer: "1",
//   correct_answer: "2",
//   student__id: "1",
//   teacher__id: "5",
// });
// ans.create((err, res) => {
//   if (err) console.log(err);
//   else {
//     console.log(res);
//   }
// });
