import { FormBox, FormTitle, InputWrapper } from "../../styles/form/style.jsx";
import { Input } from "../../components/Commmon/Input.jsx";
import { LargeButton } from "../../components/Commmon/LargeButton.jsx";
import {
    emailValidation,
    nicknameValidation,
    passwordCheckValidation,
    passwordValidation
} from "../../utils/Validation.js";
import { useEffect, useRef, useState } from "react";
import { ProfileImage } from "../../components/Commmon/ProfileImage.jsx";
import { useImagePreview } from "../../hooks/useImagePreview.jsx";
import { api } from "../../utils/axios.js";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigator = useNavigate();
    const validations = {
        email: emailValidation,
        password: passwordValidation,
        passwordCheck: (value) => passwordCheckValidation(value, signupState.password),
        nickname: nicknameValidation
    };
    const [signupState, setSignupState] = useState(
        { email: "", password: "", passwordCheck: "", nickname: "" }
    );
    const [validState, setValidState] = useState(
        { email: false, password: false, passwordCheck: false, nickname: false }
    );
    const [signupDisabled, setSignupDisabled] = useState(true);
    const passwordCheckRef = useRef(null);
    const imagePreview = useImagePreview();

    useEffect(() => {
        const available = Object.values(validState).every(value => value === true);
        setSignupDisabled(!available);
    }, [validState]);

    useEffect(() => {
        passwordCheckRef.current.focus();
        passwordCheckRef.current.blur();
    }, [signupState.password])

    const validationEvent = async (e, target) => {
        const validation = validations[target];
        const value = e.target.value;
        const maybePromise = validation(value);
        const result = maybePromise instanceof Promise ? await maybePromise : maybePromise;

        setSignupState(prev => ({
            ...prev, [target]: value,
        }));

        setValidState(prev => ({
            ...prev, [target]: result.pass
        }));

        return result;
    }

    const createUser = async () => {
        const formData = new FormData();
        formData.append(
            "request",
            new Blob([JSON.stringify({
                email: signupState.email,
                password: signupState.password,
                nickname: signupState.nickname,
            })], { type: "application/json" })
        );
        formData.append("image", imagePreview.imageFiles?.at(0));

        const { data } = await api.postForm(`/users`, formData);
        if (data.success) {
            navigator(`/login`);
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
            <LargeButton text={"회원가입"} variant={"top"} disabled={signupDisabled} clickEvent={createUser}/>
            <LargeButton text={"로그인"} variant={"bottom"} disabled={false} clickEvent={() => navigator(`/login`)}/>
        </FormBox>
    )
}