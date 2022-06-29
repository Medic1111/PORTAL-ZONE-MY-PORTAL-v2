# PORTAL-ZONE

[PROJECT]:

- Academic platform where a signed in mentor can create a class, for which a secret key is generate. A student with access to that key may enroll in a particular class. From there, a mentor-student relationship begins.

- The mentor can have multiple classes, check the roster for each, assign task, and communicate real-time via the class integrated chat-room

- The student has reading access to the assignments, and may also participate in the chat

[INSTRUCTIONS]:

[1]: Download the repo and run: node server/index.js

- Alternatively, if you have nodemon installed in your machine, run: nodemon server/index.js

[2]: Run: cd client

[3]: Run npm start

[TEST_CREDENTIALS]:

[1]: Teacher

PREFILLED LOGIN FORM, Just click login.

[2]: Student

email: student@student.com
password: student
role: learning

[TECH]:

_FRONTEND_: React

_BACKEND_: Node.js, Express

_DATABASE_: MongoDB

_APIs_: Socket.IO

_EXTRAS_: mongoose, MongoDB Atlas, Axios, bcrypt, inspirational-quotes npm

[FEATURES]:

- Dark/Light mode
- CRUD
- Data persists
- Real-time chat
- Random quote generation
- Registration with hashed and salted password

[STATUS]:

- Development. Currently MVP

[COMING_UP]:

- Subscription, with integration of Stripe API for payment

[COMPROMISES]:

- The current focus is to ensure all features are working properly, allowing little room to focus on design, particularly mobile
