import { sql } from "../Config/DBconfig.js";

// constructor
export class Student {
  constructor(login) {
    this.student_username = login.UserName;
    this.student_password = login.Password;
    this.student_dob = login.Dob;
    this.student_name = login.Name;
  }

  create = (result) => {
    sql.query(`INSERT INTO student SET ?`, [this], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created login: ", res);
      result(null, res);
    });
  };

  static findByEmail = (email, result) => {
    sql.query(
      `SELECT * FROM student WHERE student_email = ?`,
      [email],
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (res.length) {
          // console.log("found Login: ", res);
          result(null, { Found: true, ...res });
          return;
        }
        // not found Login with the id
        result(null, { Found: false, ...res });
      }
    );
  };

  static findById = (id, result) => {
    sql.query(
      "select * from student where student_id = ?",
      [id],
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (res.length) {
          console.log("found Student: ", res);
          result(null, { Found: true, ...res });
          return;
        }
        result(null, { Found: false, ...res });
      }
    );
  };

  static updateById = (id, values, result) => {
    sql.query(
      "UPDATE student SET ? WHERE student_id = ? ",
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

  static updateByEmail = (email, values, cb) => {
    sql.query(
      "UPDATE student SET ? WHERE student_email = ? ",
      [values, email],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          cb(err, null);
          return;
        }
        if (res.affectedRows == 0) {
          cb({ kind: "not_found" }, null);
          return;
        }
        console.log("updated Teacher: ", res);
        cb(null, res);
      }
    );
  };

  static Count_Students = () => {
    sql.query(
      "select count(student_id) as student_count from student;",
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (res.length) {
          result(null, { Found: true, ...res });
          return;
        }
        result(null, { Found: false, ...res });
      }
    );
  };

  static setDefaultPasswordStudent = (email, pass, cb) => {
    sql.query(
      "UPDATE student SET ? WHERE student_email = ?",
      [pass, email],
      (err, res) => {
        if (err) {
          cb(err, null);
          return;
        } else {
          cb(null, { res });
        }
      }
    );
  };

  static findDefaultPasswordStudent = (email, cb) => {
    sql.query(
      "select student_default_password from student where student_email = ?",
      [email],
      (err, res) => {
        if (err) {
          cb(err, null);
          return;
        } else {
          if (res.length) {
            console.log("found Student: ", res);
            cb(null, { Found: true, ...res });
            return;
          }
          cb(null, { Found: false, ...res });
        }
      }
    );
  };
  static total = (cb) => {
    sql.query("SELECT COUNT( student_id) AS total_students FROM student ;", cb);
  };

  static topNScorer = (n, cb) => {
    sql.query(
      "SELECT s.student_name, student_score FROM test join student s WHERE teacher_iid = 2 and s.student_id = student_iid ORDER BY student_score DESC LIMIT 3;",
      n,
      cb
    );
  };

  static AllSubjectMarks = (id, cb) => {
    sql.query(
      "SELECT s.student_id, s.student_name, sub.subject_id, sub.subject_name, AVG(t.test_result) AS average_marks FROM student s JOIN test t ON s.student_id = t.student_iid JOIN teacher te ON t.teacher_iid = te.teacher_id JOIN subject sub ON te.subject__id = sub.subject_id WHERE s.student_id = 2 GROUP BY s.student_id, s.student_name, sub.subject_id, sub.subject_name;",
      [id],
      cb
    );
  };
}

// {
//   student_id: 1,
//   student_name: 'Waiz Bin Qasim',
//   student_dob: 2010-10-20T06:00:08.000Z,
//   student_username: 'waiz',
//   student_password: '0123456'
// }
// let test = {
//     Name: 'Waiz Bin Qasim',
//     Dob: '2010-10-20T06:00:08.000Z',
//     UserName: 'waiz3',
//     Password: '0123456'
// };
// let st = new Student(test)

// st.create((err,res)=>{
//   if(err)console.log(err);
//   else console.log(res);
// })
