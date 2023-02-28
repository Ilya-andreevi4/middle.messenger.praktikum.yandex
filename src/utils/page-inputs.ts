import NamePages from "./routes";
const { login, profile, registration } = NamePages;

const REGULAR_EXPRESSON = {
  EMAIL: /^(.+)@(.+){2,}\.(.+){2,}$/,
  LOGIN: /^[A-Za-z1-9\-_]{2,16}$/,
  NAME: /^[A-ZА-Я]{1}[a-zа-я\-ъ]$/,
  PHONE:
    /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&_\-]{6,}$/,
};

const REGEX_ERRORS = {
  EMAIL: "E-mail введен не корректно",
  LOGIN:
    "Допускаются только латинские буквы, цифры, знаки - и _ (от 2 до 16 символов).",
  NAME: "Допускаются только буквы, цифры, знак -.",
  PHONE: "Введите корректный номер телефона",
  PASSWORD:
    "Минимум 6 символов. Введите хотя бы одну заглавную букву, одну строчную букву и цифру",
};

const EMAIL = {
  name: "email",
  label: "Email",
  require: true,
  regex: REGULAR_EXPRESSON.EMAIL,
};

const LOGIN = {
  name: "login",
  label: "Логин",
  require: true,
  regex: REGULAR_EXPRESSON.LOGIN,
  error_text: REGEX_ERRORS.LOGIN,
};

const DISPLAY_NAME = {
  name: "display_name",
  label: "Имя в чате",
  regex: REGULAR_EXPRESSON.LOGIN,
  error_text: REGEX_ERRORS.LOGIN,
};

const FIRST_NAME = {
  name: "first_name",
  label: "Имя",
  regex: REGULAR_EXPRESSON.NAME,
  error_text: REGEX_ERRORS.NAME,
};

const SECOND_NAME = {
  name: "second_name",
  label: "Фамилия",
  regex: REGULAR_EXPRESSON.NAME,
  error_text: REGEX_ERRORS.NAME,
};

const PHONE = {
  name: "phone",
  label: "Телефон",
  regex: REGULAR_EXPRESSON.PHONE,
  error_text: REGEX_ERRORS.PHONE,
};

const PASSWORD = {
  name: "password",
  type: "password",
  label: "Пароль",
  require: true,
  regex: REGULAR_EXPRESSON.PASSWORD,
  error_text: REGEX_ERRORS.PASSWORD,
};

const OLD_PASSWORD = {
  name: "oldPassword",
  type: "password",
  label: "Старый пароль",
  require: true,
  regex: REGULAR_EXPRESSON.PASSWORD,
  error_text: REGEX_ERRORS.PASSWORD,
};

const NEW_PASSWORD = {
  name: "newPassword",
  type: "password",
  label: "Новый пароль",
  require: true,
  regex: REGULAR_EXPRESSON.PASSWORD,
  error_text: REGEX_ERRORS.PASSWORD,
};

const REPEAT_PASSWORD = {
  name: "repeatPassword",
  type: "password",
  label: "Повторите пароль",
  require: true,
  regex: REGULAR_EXPRESSON.PASSWORD,
  error_text: REGEX_ERRORS.PASSWORD,
};

const PAGE_INPUTS = {
  [login]: [LOGIN, PASSWORD],
  [registration]: [
    EMAIL,
    LOGIN,
    FIRST_NAME,
    SECOND_NAME,
    PHONE,
    PASSWORD,
    REPEAT_PASSWORD,
  ],
  [profile]: [
    EMAIL,
    LOGIN,
    DISPLAY_NAME,
    FIRST_NAME,
    SECOND_NAME,
    PHONE,
    OLD_PASSWORD,
    NEW_PASSWORD,
    REPEAT_PASSWORD,
  ],
};

export default PAGE_INPUTS;
