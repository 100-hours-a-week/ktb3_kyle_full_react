import styled from "styled-components";

const Button = styled.button`
    width: 361px;
    height: 50px;
    background-color: ${props => {
        if (props.$disabled) return '#F7F7F7';
        return props.$variant === "top" ? '#FFC700' : '#FFFFFF';
    }};
    color: ${props => {
        if (props.$disabled) return '#B7B7B7';
        return props.$variant === "top" ? '#333333' : '#000000'
    }};
    cursor: ${props => (props.$disabled ? 'not-allowed' : 'pointer')};
    pointer-events: ${props => (props.$disabled ? 'none' : 'auto')};
    border: ${props => (props.$variant === "top" ? 'none' : '1px solid #E2E2E2')};
    border-radius: 12px;
    font-size: 15px;
    font-weight: 700;
    z-index: 3;
    &:active {
        background-color: ${props => (props.$variant === "top" ? '#ECAA00' : '#F7F7F7')};
    }
`

export const LargeButton = ({disabled = true, text, variant}) => {
    return (
        <>
            <Button $disabled={disabled} $variant={variant} disabled={disabled}>{text}</Button>
        </>
    )
}