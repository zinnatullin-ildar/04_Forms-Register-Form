import * as yup from "yup";
import { EmailRegExp, LoginRegExp } from "../regExp";

export const fieldsScheme = yup.object().shape({
    email: yup
        .string()
        .matches(EmailRegExp, "Введен некорректный почтовый адрес"),
    login: yup
        .string()
        .matches(
            LoginRegExp,
            "Неверный логин: допускаются только буквы, цифры и нижнее подчеркивание",
        )
        .min(3, "Логин должен быть больше 8 символов")
        .max(20, "Логин должен быть меньше 20 символов"),
    password: yup
        .string()
        .min(3, "Пароль должен быть больше 3 символов")
        .max(20, "Пароль должен быть меньше 20 символов"),
    confirmPassword: yup
        .string()
        .min(3, "Пароль должен быть больше 3 символов")
        .max(20, "Пароль должен быть меньше 20 символов")
        .oneOf([yup.ref("password"), null], "Пароли должны совпадать"),
});
