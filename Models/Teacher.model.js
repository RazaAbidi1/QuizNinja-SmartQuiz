import { sql } from "../Config/DBconfig.js";

export class Teacher {
  constructor(teacher) {
    this.teacher_name = teacher.teacher_name;
    this.teacher_username = teacher.teacher_username;
    this.teacher_password = teacher.teacher_password;
    this.subject__id = teacher.subject__id;
  }

  create = (result) => {
    sql.query("INSERT INTO teacher SET ?", [this], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Created Teacher: ", { id: res.insertId, ...res });
      result(null, { id: res.insertId, ...res });
    });
  };

  static findByUserName = (UserName, result) => {
    sql.query(
      `SELECT * FROM Teacher WHERE teacher_username = ?`,
      [UserName],
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (res.length) {
          console.log("found Login: ", res);
          result(null, { Found: true, ...res });
          return;
        }
        // not found Login with the userName
        result(null, { Found: false, ...res });
      }
    );
  };

  static findById = (id, result) => {
    sql.query(
      "select * from teacher where teacher_id = ?",
      [id],
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (res.length) {
          console.log("found Record: ", res);
          result(null, { Found: true, ...res });
          return;
        }
        result(null, { Found: false, ...res });
      }
    );
  };

  static Find_Subject = (id, result) => {
    sql.query(
      "SELECT t1.teacher_name, t1.subject__id, t2.subject_id,t2.subject_name FROM teacher t1 JOIN subject t2 ON t1.subject__id= t2.subject_id WHERE t1.teacher_id = ?;",
      [id],
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (res.length) {
          console.log("found subject name: ", res);
          result(null, { Found: true, ...res });
          return;
        }
        result(null, { Found: false, ...res });
      }
    );
  };

  static updateById = (id, values, result) => {
    sql.query(
      "UPDATE teacher SET ? WHERE teacher_id = ? ",
      [values, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        if (res.affectedRows == 0) {
          // not found Question with the id
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("updated Teacher: ", res);
        result(null, res);
      }
    );
  };
}

// let test = {
//   teacher_name: "raza",
//   teacher_username: "Raza2",
//   teacher_password: "0123456",
//   subject__id: '1',
// };

// let teacher = new Teacher(test);
// teacher.create((err, res) => {
//   if (err) console.log(err);
//   else console.log(res);
// });
