import { useEffect, useState } from "react";
import { Input } from "../../components/Commmon/Input.jsx";
import { emailValidation, loginEmailValidation, passwordValidation } from "../../utils/Validation.js";
import { LargeButton } from "../../components/Commmon/LargeButton.jsx";
import { Toast } from "../../components/Commmon/Toast.jsx";
import { FormBox, FormTitle, InputWrapper } from "../../styles/form/style.jsx";
import { api } from "../../utils/axios.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigator = useNavigate();
    const validations = {
        email: loginEmailValidation,
        password: passwordValidation
    };
    const [loginState, setLoginState] = useState(
        { email: "", password: "" }
    );
    const [validState, setValidState] = useState(
        { email: false, password: false }
    );
    const [loginDisabled, setLoginDisabled] = useState(true);
    const [toastShow, setToastShow] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    useEffect(() => {
        const available = Object.values(validState).every(value => value === true);
        setLoginDisabled(!available);
    }, [validState]);

    function toastHandler(message) {
        setToastMessage(message);
        setToastShow(true);
        setTimeout(() => {
            setToastShow(false);
        }, 1500);
    }

    const validationEvent = (e, target) => {
        const validation = validations[target];
        const value = e.target.value;
        const result = validation(value);

        setLoginState(prev => ({
            ...prev, [target]: value,
        }));

        setValidState(prev => ({
            ...prev, [target]: result.pass
        }));

        if (!result.pass) {
            setLoginDisabled(true);
            toastHandler(result.message);
        }

        return result;
    }

    const authenticate = async () => {
        const res = await api.post("/auth/sessions", {
            email: loginState.email,
            password: loginState.password
        })
            .then((res) => navigator("/posts"))
            .catch((error) => {
                if (error.status === 401) {
                    toastHandler("아이디 또는 비밀번호를 확인해주세요")
                }
            });
    }

    return (
        <FormBox>
            <FormTitle>로그인</FormTitle>
            <InputWrapper>
                <Input
                    isLogin={true}
                    label={"이메일"}
                    target={"email"}
                    type={"text"}
                    placeholder={"이메일을 입력해주세요."}
                    validation={validationEvent}
                />
                <Input
                    isLogin={true}
                    label={"비밀번호"}
                    target={"password"}
                    type={"password"}
                    placeholder={"비밀번호를 입력해주세요."}
                    validation={validationEvent}
                />
            </InputWrapper>
            <div style={{ position: "relative" }}>
                <LargeButton clickEvent={authenticate} text={"로그인"} variant={"top"} disabled={loginDisabled} />
                <Toast show={toastShow} message={toastMessage}/>
            </div>
            <LargeButton text={"회원가입"} disabled={false} variant={"bottom"} clickEvent={() => navigator(`/signup`)}/>
        </FormBox>
    )
}