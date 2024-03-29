# PORTAL-ZONE

[Live here](https://portal-zone.onrender.com/)

### PROJECT:

Academic platform where a signed in mentor can create a class, for which a secret key is generate. A student with access to that key may enroll in a particular class. From there, a mentor-student relationship begins.

The mentor can have multiple classes, check the roster for each, assign task, and communicate real-time via the class integrated chat-room

The student has reading access to the assignments, and may also participate in the chat

![Intro Page to Portal-Zone](./client//public//zone.png)

![Chatroom of Portal-Zone](./client//public//zone2.png)

### INSTRUCTIONS:

1. Download the repo and run: `npm install`
   then `node server/app.js`
   - Alternatively, if you have nodemon installed in your machine, run: nodemon server/index.js
2. Run: `cd client`
3. Run: `npm install` then `npm start`

### TEST CREDENTIALS:

1. Teacher:

   - PREFILLED LOGIN FORM, Just click login.

2. Student:
   - email: student@student.com
   - password: student
   - role: learning

### TECH:

1. FRONTEND:

   - React

2. BACKEND:

   - Node.js
   - Express

3. DATABASE:

   - MongoDB

4. APIs:

   - Socket.IO

5. EXTRAS:
   - mongoose
   - MongoDB Atlas
   - Axios
   - bcrypt
   - inspirational-quotes npm

### FEATURES:

- Dark/Light mode
- CRUD
- Data persists
- Real-time chat
- Random quote generation
- Registration with hashed and salted password

> STATUS:

> Development: Currently MVP

### COMINGUP:

- [ ] Subscription, with integration of Stripe API for payment

### COMPROMISES:

> The current focus is to ensure all features are working properly, allowing little room to focus on design, particularly mobile
