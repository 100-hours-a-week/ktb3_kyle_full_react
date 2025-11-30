import styled from "styled-components";

const Button = styled.button`
    width: 138px;
    height: 39px;
    align-self: flex-end;
    color: ${props => (props.$active ? "#000000" : "#B7B7B7")};
    background-color: ${props => (props.$active ? "#FFC700" : "#F7F7F7")};
    border: none;
    border-radius: 14px;
    cursor: pointer;
    font-weight: 700;
    line-height: 24px;

    display: flex; /* flex 컨테이너 */
    align-items: center; /* 세로 중앙 정렬 */
    justify-content: center; /* 가로 중앙 정렬 */
    gap: 8px; /* 아이콘과 텍스트 사이 간격 */
    
    &:active {
        background-color: #ECAA00;
    }

    &::before {
        content: "";
        display: inline-block;
        width: 22px;
        height: 22px;

        background-color: ${props => props.$iconColor};
        mask: url("/src/assets/${props => props.$icon}") no-repeat center;
        mask-size: contain;
    }
`
export const RoundButton = ({ text, icon, iconColor, active = true, clickEvent }) => {
    return (
        <Button $icon={icon} $iconColor={iconColor} $active={active} onClick={clickEvent}>{text}</Button>
    )
}