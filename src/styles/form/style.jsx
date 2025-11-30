import styled from "styled-components";

export const FormBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
`

export const InputWrapper = styled.div`
    width: 392px;
    border-radius: 6px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding-left: 20px;

    label {
        font-size: 14px;
        font-weight: 700;
        margin-top: 15px;
    }
`

export const FormTitle = styled.h2`
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 10px;
`