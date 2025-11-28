import styled from "styled-components";

const HeaderContainer = styled.header`
    width: 100%;
    height: 104px;
    background-color: #FFC700;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #F7F7F7;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
`

const HeaderLogo = styled.div`
    width: 220px;
    height: 30px;
    background-color: #FFFFFF;
    mask: url("/src/assets/logo.svg") no-repeat center;
    mask-size: contain;
`

export const Header = ({isLogin}) => {
    return (
        <HeaderContainer>
            <HeaderLogo/>
        </HeaderContainer>
    )
}