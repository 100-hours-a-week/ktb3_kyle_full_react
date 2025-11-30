import { FormBox, FormTitle, InputWrapper } from "../../styles/form/style.jsx";
import { Input } from "../../components/Commmon/Input.jsx";
import { LargeButton } from "../../components/Commmon/LargeButton.jsx";
import { useEffect, useRef, useState } from "react";
import {
    emailValidation,
    nicknameValidation,
    passwordCheckValidation,
    passwordValidation
} from "../../utils/Validation.js";
import { Toast } from "../../components/Commmon/Toast.jsx";
import { api } from "../../utils/axios.js";

export const PasswordUpdate = () => {
    const validations = {
        password: passwordValidation,
        passwordCheck: (value) => passwordCheckValidation(value, passwordState.password),
    };
    const passwordCheckRef = useRef(null);
    const [passwordState, setPasswordState] = useState(
        { password: "", passwordCheck: "" }
    );
    const [validState, setValidState] = useState(
        { password: false, passwordCheck: false }
    );
    const [toastState, setToastState] = useState({
        show: false, message: "", error: true
    });

    useEffect(() => {
        passwordCheckRef.current.focus();
        passwordCheckRef.current.blur();
    }, [passwordState.password])

    const toastHandler = (message, error) => {
        console.log(message + " " + error);
        setToastState({ show: true, message: message, error: error });
        setTimeout(() => {
            setToastState(prev => ({
                ...prev, show: false
            }));
        }, 1500)
    }

    const validationEvent = async (e, target) => {
        const validation = validations[target];
        const value = e.target.value;
        const result = validation(value);

        setPasswordState(prev => ({
            ...prev, [target]: value,
        }));

        setValidState(prev => ({
            ...prev, [target]: result.pass
        }));

        return result;
    }

    const updatePassword = async () => {
        try {
            await api.patch(`/users/password`, {
                password: passwordState.password
            });
            toastHandler("비밀번호가 변경되었습니다.", false);
        } catch (err) {
            if (err.response?.status === 409) {
                toastHandler("현재 비밀번화와 동일합니다.", true);
            }
        }
    }

    return (
        <FormBox>
            <FormTitle>비밀번호 수정</FormTitle>
            <InputWrapper>
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
            </InputWrapper>
            <div style={{ position: "relative" }}>
                <LargeButton
                    text={"수정하기"}
                    variant={"top"}
                    disabled={!Object.values(validState).every(value => value === true)}
                    clickEvent={updatePassword}
                />
                <Toast show={toastState.show} message={toastState.message} isError={toastState.error}/>
            </div>
        </FormBox>
    )
}