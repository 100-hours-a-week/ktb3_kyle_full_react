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

export default function Signup() {
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

    useEffect(() => {
        const available = Object.values(validState).every(value => value === true);
        setSignupDisabled(!available);
    }, [validState]);

    useEffect(() => {
        passwordCheckRef.current.focus();
        passwordCheckRef.current.blur();
    }, [signupState.password])

    const validationEvent = (e, target) => {
        const validation = validations[target];
        const value = e.target.value;
        const result = validation(value);

        setSignupState(prev => ({
            ...prev, [target]: value,
        }));

        setValidState(prev => ({
            ...prev, [target]: result.pass
        }));

        return result;
    }

    return (
        <FormBox>
            <FormTitle>회원가입</FormTitle>
            <InputWrapper>
                <ProfileImage length={"140px"}/>
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
            <LargeButton text={"회원가입"} variant={"top"} disabled={signupDisabled}/>
            <LargeButton text={"로그인"} variant={"bottom"} disabled={false}/>
        </FormBox>
    )
}