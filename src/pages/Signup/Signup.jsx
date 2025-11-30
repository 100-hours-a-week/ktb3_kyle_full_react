import { FormBox, FormTitle, InputWrapper } from "../../styles/form/style.jsx";
import { Input } from "../../components/Commmon/Input.jsx";
import { LargeButton } from "../../components/Commmon/LargeButton.jsx";
import {
    emailValidation, loginEmailValidation,
    nicknameValidation,
    passwordCheckValidation,
    passwordValidation
} from "../../utils/Validation.js";
import { useEffect, useReducer, useRef, useState } from "react";
import { ProfileImage } from "../../components/Commmon/ProfileImage.jsx";
import { useImagePreview } from "../../hooks/useImagePreview.jsx";
import { api } from "../../utils/axios.js";
import { useNavigate } from "react-router-dom";

function signupReducer(state, action) {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                values: { ...state.values, [action.target]: action.value },
                valid: { ...state.valid, [action.target]: action.pass }
            };
        case "SUBMIT":
            return { ...state, submitting: true };
        case "FAIL":
            return { ...state, submitting: false };
        default:
            return state;
    }
}

const initialState = {
    values: { email: "", password: "", passwordCheck: "", nickname: "" },
    valid: { email: false, password: false, passwordCheck: false, nickname: false },
    submitting: false
};

export default function Signup() {
    const navigator = useNavigate();
    const [state, dispatch] = useReducer(signupReducer, initialState);
    const validations = {
        email: emailValidation,
        password: passwordValidation,
        passwordCheck: (value) => passwordCheckValidation(value, state.values.password),
        nickname: nicknameValidation
    };
    const passwordCheckRef = useRef(null);
    const imagePreview = useImagePreview();

    useEffect(() => {
        passwordCheckRef.current.focus();
        passwordCheckRef.current.blur();
    }, [state.values.password])

    const validationEvent = async (e, target) => {
        const value = e.target.value;
        const maybePromise = validations[target](value);
        const result = maybePromise instanceof Promise ? await maybePromise : maybePromise;

        dispatch({ type: "CHANGE", target: target, value: value, pass: result.pass });
        return result;
    }

    const createUser = async () => {
        dispatch({ type: "SUBMIT" });
        const formData = new FormData();
        formData.append(
            "request",
            new Blob([JSON.stringify({
                email: state.values.email,
                password: state.values.password,
                nickname: state.values.nickname,
            })], { type: "application/json" })
        );
        formData.append("image", imagePreview.imageFiles?.at(0));

        const { data } = await api.postForm(`/users`, formData);
        if (data.success) {
            navigator(`/login`);
        } else {
            dispatch({ type: "FAIL" });
        }
    }

    return (
        <FormBox>
            <FormTitle>회원가입</FormTitle>
            <InputWrapper>
                <ProfileImage length={"140px"} imagePreview={imagePreview}/>
                <Input
                    label={"이메일"}
                    target={"email"}
                    type={"text"}
                    helper={"이메일을 입력해주세요."}
                    placeholder={"이메일을 입력해주세요."}
                    validation={validationEvent}
                />
                <Input
                    label={"비밀번호"}
                    target={"password"}
                    type={"password"}
                    helper={"비밀번호를 입력해주세요."}
                    placeholder={"비밀번호를 입력해주세요."}
                    validation={validationEvent}
                />
                <Input
                    ref={passwordCheckRef}
                    label={"비밀번호 확인"}
                    target={"passwordCheck"}
                    type={"password"}
                    helper={"비밀번호 한번 더 입력해주세요."}
                    placeholder={"비밀번호 한번 더 입력해주세요."}
                    validation={validationEvent}
                />
                <Input
                    label={"닉네임"}
                    target={"nickname"}
                    type={"text"}
                    helper={"닉네임을 입력해주세요."}
                    placeholder={"닉네임을 입력해주세요."}
                    validation={validationEvent}
                />
            </InputWrapper>
            <LargeButton
                text={"회원가입"}
                variant={"top"}
                disabled={!Object.values(state.valid).every(value => value === true) || state.submitting}
                clickEvent={createUser}
            />
            <LargeButton
                text={"로그인 하러가기"}
                variant={"bottom"}
                disabled={false}
                clickEvent={() => navigator(`/login`)}
            />
        </FormBox>
    )
}