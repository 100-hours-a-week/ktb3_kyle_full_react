import styled, { css, keyframes } from "styled-components";

const vibrate = keyframes`
    0%, 100% {
        transform: translateX(0);
    }
    20% {
        transform: translateX(-2px);
    }
    40% {
        transform: translateX(2px);
    }
    60% {
        transform: translateX(-2px);
    }
    80% {
        transform: translateX(2px);
    }
`;

const ToastBox = styled.div`
    width: 361px;
    height: 50px;
    font-size: 16px;
    line-height: 24px;
    border-radius: 12px;
    color: ${props => (props.$isError ? '#CB3D0B' : '#2B75CB')};
    background-color: ${props => (props.$isError ? '#FCEDE8' : '#2B75CB33')};
    z-index: 5;

    position: absolute;
    margin: 0 auto;


    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    pointer-events: none;
    transition: top 0.5s ease, opacity 0.5s ease;
    ${props => props.$show ? css`
        opacity: 1;
        top: 62px;
        animation: ${vibrate} 0.5s ease-in-out;
    ` : css`
        opacity: 0;
        top: 0;
    `}

    img {
        width: 24px;
        height: 24px;
        margin-right: 10px;
    }
`;

export const Toast = ({ show = false, isError = true, message }) => {
    const icon = isError ? "/src/assets/warning-fill.svg" : "/src/assets/check.svg";

    return (
        <ToastBox $show={show} $isError={isError}>
            <img src={icon} alt="toast"/>
            <span>{message}</span>
        </ToastBox>
    )
}
