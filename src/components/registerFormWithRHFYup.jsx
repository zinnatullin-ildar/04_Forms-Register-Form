import { useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./registerForm.module.css";
import { sendFormData } from "../common/sendFormData";
import { fieldsScheme } from "../validator/fieldsScheme";

export const RegisterFormWithRHFYup = () => {
    const submitButtonRef = useRef(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm({
        defaultValues: {
            email: "",
            login: "",
            password: "",
            confirmPassword: "",
        },
        resolver: yupResolver(fieldsScheme),
    });

    const emailErrors = errors.email?.message;
    const loginErrors = errors.login?.message;
    const passwordErrors = errors.login?.message;
    const confirmPasswordErrors = errors.confirmPassword?.message;

    const setFocus = () => {
        const values = getValues();
        const isValid = Object.values(values).every(
            (value) => value.length > 0,
        );

        if (isValid) {
            submitButtonRef.current.focus();
        }
    };

    return (
        <div className={styles.app}>
            <form
                className={styles.form}
                onSubmit={handleSubmit(sendFormData)}
            >
                <h1>Регистрация</h1>
                <input
                    className={styles.input}
                    name="email"
                    type="email"
                    placeholder="Введите почтовый адрес"
                    {...register("email", { onBlur: setFocus })}
                />
                <input
                    className={styles.input}
                    name="login"
                    type="text"
                    placeholder="Введите логин"
                    {...register("login", { onBlur: setFocus })}
                />
                <input
                    className={styles.input}
                    name="password"
                    type="password"
                    placeholder="Введите пароль"
                    {...register("password", { onBlur: setFocus })}
                />
                <input
                    className={styles.input}
                    name="confirmPassword"
                    type="password"
                    placeholder="Подтвердите пароль"
                    {...register("confirmPassword", { onBlur: setFocus })}
                />
                {errors !== null && (
                    <div className={styles.error}>
                        {emailErrors ||
                            loginErrors ||
                            passwordErrors ||
                            confirmPasswordErrors}
                    </div>
                )}
                <button
                    className={styles.submitButton}
                    ref={submitButtonRef}
                    type="submit"
                >
                    Зарегистрироваться
                </button>
            </form>
        </div>
    );
};
