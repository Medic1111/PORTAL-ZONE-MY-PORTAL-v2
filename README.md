# STRUCTURE OF DATABASE

[ACCESS]

- A teacher creates a class for which a code is generated. Access to class depends on this overall 'KEY'

- Both mentors and students will need the key in order to enroll/assign

- The correct key must be unique

- Students will be created and added TO THAT CLASS database

- Once enrolled, students will have access to assignments and grade posted by the teacher, Queries will come from this unique key

[PRIORITIES]

[1]- KEY

[2]- Class stays in teachers database

[4]- ALL STUDENT QUERIES WILL HAPPEN AT TEACHER'S DATABASE

[5]- ALL TEACHERS QUERIES WILL hAPPEN AT TEACHER's DATABASE

[6]- The student obj will be complex, basic info, credentials, classes, assignments, grades, submitted, pending, messages

[7]- The teacher's obj will be even more complex: basic info, classes created and keys, student roster, assignments for each class, grades for each class, graded list, pending list, message list for each class, and student information

[SPLIT-CONCERNS]:

- A student is a user with a certain schema

- A mentor is another user with a certain schema

- Two collections

- Cross-access based on the KEY

[MENTOR]

- Creates an account with username and hashed password

- Sets up basic info available to the students, such as email or contact phone number

- Has the opportunity to create a 'class'

- Each class generates a unique code

- When accessing that class, he can post new assignments

- He will have a roster

- He will have a list of turned in assignments pending for grade

- He will have a list of graded assignments

- He will be able to send a message to the student

[STUDENT]

- Creates account with username and hashed password

- Has the opportunity to sign up for classes with the code provided

- Has access to assignments posted by mentor

- Has the change to submit for grading

- Has a list of completed assignments

- Has a grade

- Has a list of graded assignments

- Has the chance to message the teacher

- Has basic teacher's info available

# ROOT/REGISTER/LOGIN

# STEP_ONE

[1]- Create home page with login/register
[2]- must have option for student/mentor
[3]- Will add the schema to db in case of register, will verify in case of login.

[STATUS_ACCOMPLISHED:SOLUTION]:

- App renders a header (which allow for dark/light mode feature), footer, and a components named HERO which renders the message seen at ROOT access, along with the:

[1]: Button to sign up as mentor;
[2]: Button to sign up as learner;
[3]: Link to Login instead

- Button to sign up has 3 main functions: It toggle the Modal (inserted in a portal), It sets whether the user is a teacher or student (redux reducer IsTeacher), and it sets the 'registering' to true (redux reducer IsRegistering)

- The two last datas set by the Button, is accessed on the modal it opens, which NESTS CredentialsForm component

-CredentialsForm renders:

[1]: Register form component if IsRegister is true
[2]: Login otherwise.

- If IsTeacher and IsRegistering is true, it will use the info by passing to the Register component which will set some dynamic txt on it, and more importantly the API ROUTE which the post request must be sent to (Whether to teacher route or student route)

- The Register component will read the userInput via useState() and pass it as the value to be posted on the server to the route determined. It also renders a Button allow the user to cancel the registering process and close the Modal, returning to the ROOT

- If !IsRegister, the Login Component will be rendered instead. It contains the form, a Button to cancel operation and return to ROOT, a two other Buttons allowign to login as mentor, or as student. UserInfo will be passed to the route in the server that matches User choice of buttons.

- Once logged in or Registered(and logged in), Modal will toggle close and Main user Page will be rendered on the Modal instead of Credentials page, conditially with UserIsLoggedIn

# ENSURE VALID CREDENTIALS AND ONE ACCOUNT PER EMAIL

# STEP_TWO

[1] Provide a loading Spinner
[2] Give <p> to address incomplete fields or invalid
[3] Show warning in case of server-side error
[4] On server, limit registering to one account per email
[5] Use espress-session to generate session and cookie expiry
[6] Allow login if credentials match hashed db stored data

[STATUS_ACCOMPLISHED:SOLUTION]:

- Created a loading spinner components that gets triggered while awaiting response from server at each request

- Created validation warnings and server side err warnings on front end

- Server will do look up for user info prior to allowing to insert data in database.

- Express session has been implemented on back-end with cookie expiry set

- Logging in takes place auto if registering is successful

# LOGIN

[1] Create a login form to be opened in link on ROOT is selected
[2] Single form for both teachers and students with Buttons that will select to login as one or another
[3] Validation takes place
[4] Server does lookup and sends response accordingly
[5] If success, main User Page will be render dynamically on whether the user is a teacher or student
[6] Two separate components, one home for student, one home for teacher
[7] Teacher will have the option to add a class
[8] Student will have the option to enroll in class

# KEY/ENROLLMENT

[1] Server creates key code and stores in databse
[2] Server sends code to teacher front-end
[3] Teacher has the option to share code with student so student can enroll
[4]- Student attempts to enroll and a pending request is sent to teacher
[5]- Teacher accepts student and connection between student and teacher is created

# STEP_THREE

# CREATE CLASS

[1]- Give ability to create class
[2]- Gather class name
[3]- Add to db
[4]- Returns a secret key

# STUDENT

[1]- Creates an account/ save to DB
[2]- Acces student portal
[3]- Has the ability to sign up for a class using the secret code
[4]- Send in info in schema and stores to DB

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
