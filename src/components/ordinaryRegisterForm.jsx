// 1. Реализовать приложение на базе Create React App — страницу регистрации нового пользователя:
// должно быть 3 поля: email, пароль, повтор пароля;
// должна быть кнопка «Зарегистрироваться»;
// продумать и реализовать валидацию полей;
// выводить информацию об ошибках валидации;
// блокировать кнопку «Зарегистрироваться», если форма не валидна (есть хоть одно поле с невалидными данными);
// после успешного заполнения всех полей формы фокус должен автоматически перемещаться на кнопку «Зарегистрироваться»;
// после нажатия на кнопку «Зарегистрироваться» выводить данные формы в консоль;
// дизайн на усмотрение разработчика.
// 2. Сделать аналогичное приложение, используя React Hook Form и Yup.

import { useState, useRef } from "react";
import styles from "./registerForm.module.css";
import { sendFormData } from "../common/sendFormData";
import { EmailRegExp, LoginRegExp } from "../regExp";

export const OrdinaryRegisterForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        login: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState(null);
    const submitButtonRef = useRef(null);
    const { email, login, password, confirmPassword } = formData;

    const setFocus = () => {
        const isValid = Object.values(formData).every(
            (value) => value.length > 0,
        );

        if (isValid) {
            submitButtonRef.current.focus();
        }
    };

    const onChangeEmail = ({ target }) => {
        setFormData({ ...formData, email: target.value });
    };

    const onBlurEmail = () => {
        if (!EmailRegExp.test(email)) {
            setError("Введен некорректный почтовый адрес");
        } else {
            setError(null);
            setFocus();
        }
    };

    const onChangeLogin = ({ target }) => {
        setFormData({ ...formData, login: target.value });
    };

    const onBlurLogin = () => {
        if (!LoginRegExp.test(login)) {
            setError(
                "Неверный логин: допускаются только буквы, цифры и нижнее подчеркивание",
            );
        } else if (login.length < 8 || login.length > 20) {
            setError("Логин должен быть не менее 3 и не более 20 символов");
        } else {
            setError(null);
            setFocus();
        }
    };

    const onChangePassword = ({ target }) => {
        setFormData({ ...formData, password: target.value });

        if (password.length > 20) {
            setError("Пароль должен быть не более 20 символов");
        }
    };

    const onBlurPassword = () => {
        if (password.length < 3) {
            setError("Пароль должен быть не менее 3 символов");
        } else if (password !== confirmPassword) {
            setError("Пароли не совпадают");
        } else {
            setError(null);
            setFocus();
        }
    };

    const onChangeConfirmPassword = ({ target }) => {
        setFormData({ ...formData, confirmPassword: target.value });
    };

    const onBlurConfirmPassword = () => {
        if (password !== confirmPassword) {
            setError("Пароли не совпадают");
        } else {
            setError(null);
            setFocus();
        }
    };

    const onSubmitForm = (event) => {
        event.preventDefault();

        if (!error && email && login && password && confirmPassword) {
            sendFormData(formData);
            setFormData({
                email: "",
                login: "",
                password: "",
                confirmPassword: "",
            });
        } else if (
            email === "" ||
            login === "" ||
            password === "" ||
            confirmPassword === ""
        ) {
            setError("Поле не заполнено");
        }
    };

    return (
        <div className={styles.app}>
            <form
                className={styles.form}
                onSubmit={onSubmitForm}
            >
                <h1>Регистрация</h1>
                <input
                    className={styles.input}
                    name="email"
                    type="email"
                    value={email}
                    placeholder="Введите почтовый адрес"
                    onChange={onChangeEmail}
                    onBlur={onBlurEmail}
                />
                <input
                    className={styles.input}
                    name="login"
                    type="text"
                    value={login}
                    placeholder="Введите логин"
                    onChange={onChangeLogin}
                    onBlur={onBlurLogin}
                />
                <input
                    className={styles.input}
                    name="password"
                    type="password"
                    value={password}
                    placeholder="Введите пароль"
                    onChange={onChangePassword}
                    onBlur={onBlurPassword}
                />
                <input
                    className={styles.input}
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    placeholder="Подтвердите пароль"
                    onChange={onChangeConfirmPassword}
                    onBlur={onBlurConfirmPassword}
                />
                {error && <div className={styles.error}>{error}</div>}
                <button
                    className={styles.submitButton}
                    ref={submitButtonRef}
                    type="submit"
                    disabled={!!error}
                >
                    Зарегистрироваться
                </button>
            </form>
        </div>
    );
};
