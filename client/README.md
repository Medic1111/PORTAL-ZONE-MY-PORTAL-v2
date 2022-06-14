background-color: #f7f7f73d;
background-color: #b01ccd7e;
background-color: #1cb3cd;

# FEATURES:

[1]-[DARK_LIGHT_MODE]:

- Implemented a reducer in store for it

- Passes through App and components who need it uses via props

[UTILITIES]:

- Reusable BTN
- Reusable LINK
- Reusable PORTAL
- One Modal for Login and Register Forms
- Dynamic Register FORM
- Login FORM

  [COMPONENTS_MAP]:

[1]: APP

- Header
- Hero
- Modal via portal conditionally with ctx
- Footer

[2]: HEADER

- Link

[3]: FOOTER
[4]: HERO

- Link
- Button

[5]: REGISTER_MODAL

- Renders CredentialsForm

[6]: CREDENTIALS_FORM

- Renders register if, else login
- Determiners if its a teacher or student
- Passes that info as props to the register and login dynamic forms

[7]: REGISTER_FORM

- Assess if its a teacher or student
- Registers accordingly
- Cancels register process and toggle modal back to root
