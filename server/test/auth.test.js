const app = require("../index");
const request = require("supertest");
jest.setTimeout(20000);

let randomUser = {
  fName: `TestingInPlace${Math.floor(Math.random() * 1000) + 1}`,
  lName: "Still testing",
  email: `testinginplace@${Math.floor(Math.random() * 1000) + 1}.com`,
  password: `${Math.floor(Math.random() * 1000) + 1}blahblah`,
};

let improper = {
  fName: `TestingInPlace${Math.floor(Math.random() * 1000) + 1}`,
  lName: "Still testing",
  email: "",
  password: "",
};

// TEST REGISTER TEACHER

describe("TESTING TEACHER REGISTER ROUTES TO CHECK IF", () => {
  test("proper credentials renders succesfully", async () => {
    await request(app)
      .post("/api/register/teacher")
      .send(randomUser)
      .expect(200)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.objectContaining({ role: expect.any(String) })
        );
        expect(serverRes.body).toEqual(
          expect.objectContaining({ classes: expect.any(Array) })
        );
      })
      .catch((err) => console.log(err));
  });

  test("missing or no credentials renders unsuccesful", async () => {
    await request(app)
      .post("/api/register/teacher")
      .send(improper)
      .expect(500)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.objectContaining({ message: expect.any(String) })
        );
        expect(serverRes.body).toEqual(
          expect.objectContaining({ message: "Could not register the teacher" })
        );
      })
      .catch((err) => console.log(err));
  });
});

// TEST REGISTER STUDENT

describe("TESTING STUDENT REGISTER ROUTES TO CHECK IF", () => {
  test("proper credentials renders succesfully", async () => {
    await request(app)
      .post("/api/register/student")
      .send(randomUser)
      .expect(200)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.objectContaining({ role: expect.any(String) })
        );
        expect(serverRes.body).toEqual(
          expect.objectContaining({ classes: expect.any(Array) })
        );
      })
      .catch((err) => console.log(err));
  });

  test("missing or no credentials renders unsuccesful", async () => {
    await request(app)
      .post("/api/register/student")
      .send(improper)
      .expect(500)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.objectContaining({ message: expect.any(String) })
        );
        expect(serverRes.body).toEqual(
          expect.objectContaining({ message: "Could not register student" })
        );
      })
      .catch((err) => console.log(err));
  });
});

// TEST LOGIN STUDENT

describe("TESTING STUDENT LOGIN ROUTES TO CHECK IF", () => {
  test("ATTEMPT TO LOGIN WITH PROPER CREDENTIALS RENDERS SUCCESS", async () => {
    await request(app)
      .get("/api/login/student?email=student%40student.com&password=student")
      .expect(200)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Array));
        expect(serverRes.body).toEqual(
          expect.arrayContaining([expect.any(Object)])
        );
        expect(serverRes.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ role: expect.any(String) }),
          ])
        );
      })
      .catch((err) => {
        console.log(err);
      });
  });

  test("ATTEMPT TO LOGIN WHILE NOT REGISTERED RENDERS UNSUCC", async () => {
    await request(app)
      .get("/api/login/student?email=student%40dent.com&password=student")
      .expect(404)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.objectContaining({ message: expect.any(String) })
        );
        expect(serverRes.body).toEqual(
          expect.objectContaining({ message: "User Not Registered" })
        );
      })
      .catch((err) => console.log(err));
  });

  test("ATTEMPT TO LOGIN WITH WRONG PASS RENDERS UNSUCC", async () => {
    await request(app)
      .get("/api/login/student?email=student%40student.com&password=studkolt")
      .expect(401)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.objectContaining({ message: expect.any(String) })
        );
        expect(serverRes.body).toEqual(
          expect.objectContaining({ message: "Not authorized" })
        );
      })
      .catch((err) => console.log(err));
  });
});

// TEST LOGIN TEACHER

describe("TESTING TEACHER LOGIN ROUTES TO CHECK IF", () => {
  test("ATTEMPT TO LOGIN WITH PROPER CREDENTIALS RENDERS SUCCESS", async () => {
    await request(app)
      .get("/api/login/teacher?email=teacher%40teacher.com&password=teacher")
      .expect(200)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        console.log(serverRes.body);
        expect(serverRes.body).toEqual(expect.any(Array));
        expect(serverRes.body).toEqual(
          expect.arrayContaining([expect.any(Object)])
        );
        expect(serverRes.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ role: expect.any(String) }),
          ])
        );
      })
      .catch((err) => {
        console.log(err);
      });
  });

  test("ATTEMPT TO LOGIN WHILE NOT REGISTERED RENDERS UNSUCC", async () => {
    await request(app)
      .get("/api/login/teacher?email=teacher%40tehkoer.com&password=teacher")
      .expect(404)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.objectContaining({ message: expect.any(String) })
        );
        expect(serverRes.body).toEqual(
          expect.objectContaining({ message: "User Not Registered" })
        );
      })
      .catch((err) => console.log(err));
  });

  test("ATTEMPT TO LOGIN WITH WRONG PASS RENDERS UNSUCC", async () => {
    await request(app)
      .get("/api/login/teacher?email=teacher%40teacher.com&password=teafaskoer")
      .expect(401)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        console.log(serverRes.body);
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.objectContaining({ message: expect.any(String) })
        );
        expect(serverRes.body).toEqual(
          expect.objectContaining({ message: "Not authorized" })
        );
      })
      .catch((err) => console.log(err));
  });
});
