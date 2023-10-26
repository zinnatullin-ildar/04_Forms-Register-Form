import styles from "./App.module.css";
// import { OrdinaryRegisterForm } from "./components/ordinaryRegisterForm";
import { RegisterFormWithRHFYup } from "./components/registerFormWithRHFYup";

export const App = () => {
    return (
        <div className={styles.app}>
            {/* <OrdinaryRegisterForm /> */}
            <RegisterFormWithRHFYup />
        </div>
    );
};
