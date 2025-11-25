import { useState } from "react";
import styled from "styled-components";

const InputBox = styled.div`
    width: 355px;
    height: 45px;
    margin-bottom: 10px;
    border-bottom: 2px solid;
    transition: border-color 0.3s;
    border-color: ${props => (props.$focused ? '#ECAA00' : '#E2E2E2')};

    input {
        width: 355px;
        height: 33px;
        border: none;
        margin-top: 10px;
        outline: none;
        font-weight: 600;
        font-size: 15px;
        line-height: 24px;

        ::placeholder {
            color: #B7B7B7;
        }
    }
`

const Helper = styled.div`
    font-size: 12px;
    padding-top: 4px;
    //margin-top: 4px; /* 거의 붙도록 최소 간격 */
    //margin-bottom: 15px; /* 다음 요소와는 간격 확보 */
    overflow: visible;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${props => (props.$valid ? 'green' : '#FF0000')};
`

export const Input = ({ target, type, placeholder, label, helper, blurEvent }) => {
    const [valid, setValid] = useState(false);
    const [focused, setFocused] = useState(false);
    const [helperText, setHelperText] = useState(helper);

    const blurEventHandler = (e) => {
        blurEvent(e, target);
        setFocused(false);
    }

    return (
        <>
            <label htmlFor={target}>{label}</label>
            <InputBox $focused={focused}>
                <input
                    type={type}
                    id={target}
                    placeholder={placeholder}
                    onFocus={() => setFocused(true)}
                    onBlur={(e) => blurEventHandler(e)}
                />
                <Helper $valid={valid}>{helperText}</Helper>
            </InputBox>
        </>
    )
}
