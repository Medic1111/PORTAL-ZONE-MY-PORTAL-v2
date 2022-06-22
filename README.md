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

[STATUS_ACCOMPLISHED:SOLUTION]:

- Login form opens when link in Root is created. Option in form to login as mentor or student.

- Validation takes lace both front-end and back-end

- Server send the user info which is stored in currentUser reducer

- Student has its main page, teachers as well, render according to the 'role' included in the server response object, also a reducer

- On the aside(used for both types of user but with different actions accordingly), the teacher has the option to add a class, and student has the option to enroll into a class

- A secret key is generated on the server, and attached to the classInfo stored in DB

- The student may, if teacher email and secretKey available, enroll in that class.

# KEY/ENROLLMENT

[1] Server creates key code and stores in databse
[2] Server sends code to teacher front-end
[3] Teacher has the option to share code with student so student can enroll
[4]- Student attempts to enroll and a pending request is sent to teacher
[5]- Teacher accepts student and connection between student and teacher is created
[6]- Student is added to teacher's class roster
[7]- If clicking on a specific class (aside component), details of the class will show on the teacher side, get request will be sent on students side to gather latest assignments posted

[ACCOMPLISHED_BUT]:

- RETHINKING DATABASE MODELING.
- ADDED A MODEL MAP
- WILL RECREATE AND SEE HOW IT WORKS
- IF SUCCESSFULL, THAT WILL BE THE NEW MODELING

# REBUILDING ALL REQUESTS AND HOW RECEIVED DATA CAUSES REACTIONS ON FRONT-END

[CREDENTIALFORM]

- CredentialForm will read is registering true of false and render either a Register or Login component

[REGISTER]

[_POST_]

- Besides validations, send post request according to isTeacher reducer (set when mentoring or learning button is pressed at ROOT/HERO)

- URL is dynamic

- Info Passed is:

  fName: "",
  lName: "",
  email: "",
  password: "",

- SETS CURRENT USER AS THE RESPONSE FROM SERVER

_SERVER_: Generates the \_id object, must generate role and classes per new modeling which it already does for both STUDENT AND TEACHER

[LOGIN]:

[_POST_]

- Adds validations, handlers modal toggles, sets url according to role, and send post request with form info

_SERVER_: Searches for user in database by email, matches passowor with bcrypt, returns the user obj to frontend which sets it as currentUser on reducer

[UserMainAside]

[TEACHER_POST_ADD_CLASS]:

- Sends request with posted user (currentUser set at login), and class name; Now, sends user, class name, AND teacherID for findMany operation

_SERVER_:

Receives the requests and creates a new class with all info received, sends back the new class info (NOT USED IN THE FRONT END ANYMORE)

_FRONTEND_: UseEffect will send a request to get all classes via teacherId. Sends back and is stored currentUser classes reducer that will be used to render the list. Added counter reducer as dependency to useEffect everytime a class is added.

[satisfied]: TRUE

[STUDENT_POST_ADD_CLASS]:

- Currently sends secretKey, user, and teacherEmail. Will need only user and secretKey. User will be added to the class roster that will be found via secretKey

- UseEffect will also get all classes student is enrolled and assign to reducer that will be listed, also relies on requestCounter dependency

[satisfied]: TRUE

# STEP 3 - CLASSES SPECIFICS

[1]- Cliking on a class renders the specifics of it
[2]- It will be a section next to aside
[3]- Teacher will be given different info compared to student
[4]- Teacher will have access to roster with students info, className, classKey, assignments, consider pendingAssignments and graded assignments, message box
[5]- Student will have access to className, assignments, some of teacher's info, consider completed assignments, and grade (consider on teacher side too), as well as message box
[6]- There will be an "Edit" box for each type of user. For teachers it will allow operations related to elements being shown described on 5, same for student
[7]- In addition, teacher will have the option to delete the class altogether, and student will have the option to drop out of class

[STATUS:ALMOST_THERE]:

- DONT FORGET LOADING SPINNER

- A Main section component was created, it contains 3 nested components, first, second and third.

- All three are being used dynamically according to role

- When clicking on a class, specifics of the class show up

- Teacher: Sees the class name, secret key, roster list, assignments list, chat link, and has two Buttons one for adding assignments and one for deleting the class

- Students: See teachers basic info, class name, current grade, chat link, assignments, and have the option of dropping outta class

- Refined models on backend for consistency accross data

- Provided initial state to currentStateSlicer to contain keys needed on three nested components and avoid undefined

- Logging out currently resets currentClass to initial state

[CLASSES_SPECIFICS_USER]:

[student]: FEATURES

- Currently only option is the drop outta class and open chat box

- Work on both features

[teacher]: FEATURES

- Shares chat box features {COMPLETED}

- Add assignments {COMPLETED}

- Deletes assignments

- Check roster getting specifics of a user

- Delete class

[FEATURES_ADDRESSING]:

[1]: CHAT

- Integrated SOCKET IO for real time chatting

- Connection starts at root.

- Socket is passed as props

- Joing a room happens when the link to CHAT in first main component (utilities) is clicked

- The chat will pop taking over the rendering of the 3 components in the main section, conditionally, with a button to close, and a form to type messages and send

- The chat autoscrolls to the bottom always showing latest message

- Leaving a room happens when user closes the chat as well as click on a different class from the class list located on the main aside component

- When leaving the chat, all listeners get removed to avoid multiple messages

- On the back end, all messages being exchanged gets stored in the Classes DB message array, it is rendered when user opens the chat

[2]: ROSTER

- When clicking on roster, a new component is rendered and a list of students in the roster appears (REMOVED SELECT AND OPTION)

- When clicking on a student, the students information shows

- There's a button that allows closing the modal

- Not closing the modal and clicking on a different class, will show that particular class's roster, and identifier

[3]: ADDING_ASSIGNMENTS

- When add assignment is cliked, a component gets rendered with a form and two buttons

- Once cancels and closes that component

- The other sends the request to the server to add that entry to the database

[MISSING_FEATURES]:

- drop out
- delete class
- delete assignment
  _consider_ _grade_
  _RESOLVE_ _WRAPPERDISPATCH_

[ANNOYING_DETAILS_TO_CHECK]:

- Mobile is absolute trash...
- Come up with solution for mobile
- If author is writing msg, differentiate somehow from other msgs
- Add date and remove $ from the msgs info

_NEXT_

[2]: DROP FROM CLASS

- Easy enough, lets get it out of the way
- Student click drop class and a pop up confirm appear. Cancel returns, confirm will send a put request to backend
- Server will receive the current class info, and update the roster from db sending back a confirmation response
- Loading spinner will be active

_STUDENT_ _WILL_ _BE_ _COMPLETE_

[STATUS:COMPLETED]:

[ANNOYING_DETAILS_TO_CHECK]:

- Loading Spinner
- Ensure loading spinner on add class is fixed to entire page?
- Must figure wrapper reducer minification

[satisfied]: TRUE

_STUDENT_ _IS_ _BE_ _COMPLETE_

[3]: DELETE CLASS

- Easy enough, lets get it out of the way
- Teacher click drop class and a pop up confirm appear. Cancel returns, confirm will send a delete request to backend
- Server will receive the current class info, and delete from db sending back a confirmation response
- Loading spinner will be active

{from there, roster, add class modal, remove or edit assignment, grade within the roster check}

[STATUS:COMPLETED]:

[ANNOYING_DETAILS_TO_CHECK]:

- Loading Spinner
- CHAT CURRENT SESSION UPDATE
- ASSIGNMENTS CURRENT SESSION UPDATE

[satisfied]: TRUE

{from there: remove or edit assignments, consider grade}

[CURRENT_PRIORITIES]:

- CHAT CURRENT SESSION UPDATE
- ASSIGNMENT CURRENT SESSION
- CHECK ON ALL CATCH BLOCKS AND ENSURE FRONT END HANDLES IT
- CHECK ALL SPINNERS SHOW APPROPRIATELY
- CLEAN UP
- COMPRESS!!!!

[LEAST_PRIORITIES]:

- FOCUS ON DESIGN
- RESPONSIVE DESIGN
- ALLOWING STUDENTS LOTS OF ACTIONS

[FURTHER_IDEAS]: Intend to limit amount of classes a teacher can add without submitting a payment. Perhaps implement some private, some paid for the student... developing the idea still, but hoping to be able to integrate stripe for payments.
