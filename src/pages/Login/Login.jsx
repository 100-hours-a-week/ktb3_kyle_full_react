import { useEffect, useReducer, useState } from "react";
import { Input } from "../../components/Commmon/Input.jsx";
import { emailValidation, loginEmailValidation, passwordValidation } from "../../utils/Validation.js";
import { LargeButton } from "../../components/Commmon/LargeButton.jsx";
import { Toast } from "../../components/Commmon/Toast.jsx";
import { FormBox, FormTitle, InputWrapper } from "../../styles/form/style.jsx";
import { api } from "../../utils/axios.js";
import { useNavigate } from "react-router-dom";

function loginReducer(state, action) {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                values: { ...state.values, [action.target]: action.value },
                valid: { ...state.valid, [action.target]: action.pass }
            };
        case "SHOW_TOAST":
            return {
                ...state,
                toast: { show: true, message: action.message }
            }
        case "HIDE_TOAST":
            return {
                ...state,
                toast: { ...state.toast, show: false }
            }
        default:
            return state;
    }
}

const initialState = {
    values: { email: "", password: "" },
    valid: { email: false, password: false },
    toast: { show: false, message: "" },
    validations: {
        email: loginEmailValidation,
        password: passwordValidation
    }
};

export default function Login() {
    const navigator = useNavigate();
    const [loginState, dispatch] = useReducer(loginReducer, initialState);

    function toastHandler(message) {
        dispatch({ type: "SHOW_TOAST", message: message });
        setTimeout(() => {
            dispatch({ type: "HIDE_TOAST" });
        }, 1500);
    }

    const validationEvent = (e, target) => {
        const value = e.target.value;
        const result = loginState.validations[target](value);
        dispatch({ type: "CHANGE", target: target, value: value, pass: result.pass });

        if (!result.pass) {
            toastHandler(result.message);
        }
    }

    const authenticate = async () => {
        const res = await api.post("/auth/sessions", {
            email: loginState.values.email,
            password: loginState.values.password
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
                <LargeButton
                    clickEvent={authenticate}
                    text={"로그인"}
                    variant={"top"}
                    disabled={!Object.values(loginState.valid).every(value => value === true)}/>
                <Toast show={loginState.toast.show} message={loginState.toast.message}/>
            </div>
            <LargeButton text={"회원가입"} disabled={false} variant={"bottom"} clickEvent={() => navigator(`/signup`)}/>
        </FormBox>
    )
}