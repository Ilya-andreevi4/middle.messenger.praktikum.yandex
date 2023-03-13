import NamePages from "./routes";
const { main, login, profile, registration, changePassword, changeProfile } = NamePages;

const REGULAR_EXPRESSON = {
  EMAIL: /^(.+)@(.+){2,}\.(.+){2,}$/,
  // EMAIL: /^\S+@\S+$/,
  LOGIN: /^[A-Za-z1-9\-_]{2,16}$/,
  NAME: /^[A-ZА-Я]{1}[a-zа-я\-ъ]+$/,
  PHONE: /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
  // PHONE: /^((8|+7)[- ]?)?((?\d{3})?[- ]?)?[\d- ]{7,10}$/,
  PASSWORD: /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)[A-Za-zА-Яа-я\d@$!%*?&_\-]{6,}$/,
  MESSAGE: /^[\w\W]*$/,
};

const REGEX_ERRORS = {
  EMAIL: "E-mail введен не корректно",
  LOGIN: "Допускаются только латинские буквы, цифры, знаки - и _ (от 2 до 16 символов).",
  NAME: "Первая буква- заглавная остальные строчные. Допускаются только буквы.",
  PHONE: "Введите корректный номер телефона",
  PASSWORD: "Минимум 6 символов. Введите хотя бы одну заглавную букву, одну строчную букву и цифру",
  MESSAGE: "Это поле не должно быть пустым...",
};

const MESSAGE = {
  id: "message",
  label: "Text",
  type: "message",
  name: "message",
  regex: REGULAR_EXPRESSON.MESSAGE,
  errorText: REGEX_ERRORS.MESSAGE,
};

const EMAIL = {
  id: "email",
  label: "Email",
  type: "email",
  name: "email",
  regex: REGULAR_EXPRESSON.EMAIL,
  errorText: REGEX_ERRORS.EMAIL,
};

const LOGIN = {
  id: "login",
  label: "Login",
  type: "text",
  name: "login",
  regex: REGULAR_EXPRESSON.LOGIN,
  errorText: REGEX_ERRORS.LOGIN,
};

const DISPLAY_NAME = {
  id: "display_name",
  label: "Chat Name",
  type: "text",
  name: "display_name",
  regex: REGULAR_EXPRESSON.LOGIN,
  errorText: REGEX_ERRORS.LOGIN,
};

const FIRST_NAME = {
  id: "first_name",
  type: "text",
  label: "First Name",
  name: "first_name",
  regex: REGULAR_EXPRESSON.NAME,
  errorText: REGEX_ERRORS.NAME,
};

const SECOND_NAME = {
  id: "second_name",
  type: "text",
  label: "Second Name",
  name: "second_name",
  regex: REGULAR_EXPRESSON.NAME,
  errorText: REGEX_ERRORS.NAME,
};

const PHONE = {
  id: "phone",
  type: "tel",
  label: "Phone",
  name: "phone",
  regex: REGULAR_EXPRESSON.PHONE,
  errorText: REGEX_ERRORS.PHONE,
};

const PASSWORD = {
  id: "password",
  type: "password",
  label: "Password",
  name: "password",
  regex: REGULAR_EXPRESSON.PASSWORD,
  errorText: REGEX_ERRORS.PASSWORD,
};

const OLD_PASSWORD = {
  id: "old_password",
  type: "password",
  label: "Old password",
  name: "old_password",
  regex: REGULAR_EXPRESSON.PASSWORD,
  errorText: REGEX_ERRORS.PASSWORD,
};

const NEW_PASSWORD = {
  id: "new_password",
  type: "password",
  label: "New password",
  name: "new_password",
  regex: REGULAR_EXPRESSON.PASSWORD,
  errorText: REGEX_ERRORS.PASSWORD,
};

const REPEAT_PASSWORD = {
  id: "confirm_new_password",
  type: "password",
  label: "Repeate new password",
  name: "confirm_new_password",
  regex: REGULAR_EXPRESSON.PASSWORD,
  errorText: REGEX_ERRORS.PASSWORD,
};

const PAGE_FIELDS = {
  [main]: [MESSAGE],
  [login]: [LOGIN, PASSWORD],
  [registration]: [FIRST_NAME, SECOND_NAME, LOGIN, EMAIL, PHONE, PASSWORD, REPEAT_PASSWORD],
  [profile]: [EMAIL, LOGIN, DISPLAY_NAME, FIRST_NAME, SECOND_NAME, PHONE],
  [changePassword]: [OLD_PASSWORD, NEW_PASSWORD, REPEAT_PASSWORD],
  [changeProfile]: [EMAIL, LOGIN, DISPLAY_NAME, FIRST_NAME, SECOND_NAME, PHONE],
};

export default PAGE_FIELDS;
