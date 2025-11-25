import { useState } from "react";
import { InputWrapper, LoginBox, LoginTitle } from "./style.js";
import { Input } from "../../components/Input.jsx";
import { emailValidation, passwordValidation } from "../../utils/Validation.js";
import { LargeButton } from "../../components/LargeButton.jsx";
import { Toast } from "../../components/Toast.jsx";

export default function Login() {
    const validations = {
        email: emailValidation,
        password: passwordValidation
    };
    const [loginState, setLoginState] = useState(
        { email: "", password: "" }
    );
    const [loginDisabled, setLoginDisabled] = useState(true);
    const [toastShow, setToastShow] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const checkEnableLogin = () => {
        const available = Object.values(loginState).every(value => value !== "");
        if (available) {
            setLoginDisabled(false);
        }
    }

    function toastHandler(message) {
        setToastMessage(message);
        setToastShow(true);
        setTimeout(() => {
            setToastShow(false);
        }, 1500);
    }

    const validationEvent = (e, target) => {
        const validation = validations[target];
        const result = validation(e.target.value);
        const value = result.pass ? e.target.value : "";

        setLoginState(prev => ({
            ...prev, [target]: value,
        }));

        if (!result.pass) {
            setLoginDisabled(true);
            toastHandler(result.message);
            return;
        }

        checkEnableLogin();
    }

    return (
        <LoginBox>
            <LoginTitle>로그인</LoginTitle>
            <InputWrapper>
                <Input
                    label={"이메일"}
                    target={"email"}
                    type={"text"}
                    placeholder={"이메일을 입력해주세요."}
                    blurEvent={validationEvent}
                />
                <Input
                    label={"비밀번호"}
                    target={"password"}
                    type={"password"}
                    placeholder={"비밀번호를 입력해주세요."}
                    blurEvent={validationEvent}
                />
            </InputWrapper>
            <div style={{ position: "relative" }}>
                <LargeButton text={"로그인"} variant={"top"} disabled={loginDisabled}/>
                <Toast show={toastShow} message={toastMessage}/>
            </div>
            <LargeButton text={"회원가입"} disabled={false} variant={"bottom"}/>
        </LoginBox>
    )
}