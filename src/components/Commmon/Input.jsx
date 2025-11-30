import React, { useEffect, useState } from "react";
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
    font-size: 14px;
    padding: 5px 0;
    
    overflow: visible;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${props => (props.$pass ? '#2B75CB' : '#CB3D0B')};

    display: flex;
    align-items: center;
    gap: 4px;
    
    &::before {
        content: "";
        flex-shrink: 0;
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-bottom: 3px;

        background-image: url(${props => (props.$pass ? "/src/assets/check.svg" : "/src/assets/warning-fill.svg")});
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        vertical-align: middle;
    }
`

export const Input = ({ target, type, placeholder, label, helper, validation, isLogin = false, ref = null }) => {
    const [pass, setPass] = useState(false);
    const [focused, setFocused] = useState(false);
    const [helperText, setHelperText] = useState(helper);

    const blurEventHandler = async (e) => {
        const result = await validation(e, target);
        // TODO: Reducer 적용 고민
        if (!isLogin) {
            setPass(result.pass);
            setHelperText(result.message);
        }
        setFocused(false);
    }

    return (
        <>
            <label htmlFor={target}>{label}</label>
            <InputBox $focused={focused}>
                <input
                    ref={ref}
                    type={type}
                    id={target}
                    placeholder={placeholder}
                    onFocus={() => setFocused(true)}
                    onBlur={(e) => blurEventHandler(e)}
                />
                {!isLogin && <Helper $pass={pass}>{helperText}</Helper>}
            </InputBox>
        </>
    )
}
