// MAP OUT JSON FOR DB

// app.get("/api/teacher/json", (req, res) => {
// console.log("get request in");
// res.json({
// fName: "The",
// lName: "mentor",
// email: "teacher",
// password: "xxxx",
// role: "teacher",
// classes: [
// {
// name: "math",
// key: "Secret",
// assignments: ["assignment one", "assignment two"],
// roster: [
// {
// student: {
// studentId: "yuhki",
// name: "student one",
// currentGrade: "a",
// pending: [],
// graded: [],
// messages: [],
// },
// },
// ],
// },
// ],
// });
// });

<!-- STUDENT -->

app.get("/api/student/json", (req, res) => {
console.log("get request in");
res.json({
name: "The student",

    credentials: {
      username: "student",
      password: "xxxx",
      studentId: "blahblah",
    },
    role: "student",
    classes: [
      {
        name: "math",
        key: "Secret",
        teacher: {
          name: "yuhki",
          email: "student@one.com",
          messages: [],
        },
      },
    ],

});
});
