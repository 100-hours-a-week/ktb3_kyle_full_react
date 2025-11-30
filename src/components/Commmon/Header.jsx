import styled from "styled-components";
import { useEffect, useState } from "react";
import { GOOGLE_CLOUD_STORAGE_URL } from "../../utils/Config.js";
import { api, clearCsrfToken } from "../../utils/axios.js";
import { useNavigate } from "react-router-dom";

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

const HeaderProfileContainer = styled.div`
    position: absolute;
    right: 40px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
`

const HeaderProfile = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid #ccc;
    background-image: url("${props => props.$imageUrl}");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 1;
`

const DropDown = styled.div`
    width: 115px;
    height: 105px;
    background-color: #FFF4CD;
    border: 1px solid #ECAA00;
    border-radius: 6px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 48px;       /* 프로필 이미지 아래로 */
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 10px;
    visibility: ${props => (props.$show ? 'visible' : 'hidden')};
    opacity: ${props => (props.$show ? 1 : 0)};
    transition: all 0.2s ease;
    
    button {
        background: none;
        border: none;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        text-align: left;
        padding: 4px 8px;
        
        &:hover {
            background-color: #FFC700;
            border-radius: 4px;
        }
    }
`

export const Header = ({ isLoggedIn }) => {
    const navigator = useNavigate();
    const [profileImageUrl, setProfileImageUrl] = useState();
    const [showDropDown, setShowDropDown] = useState(false);

    useEffect(() => {
        const getProfile = async () => {
            const { data } = await api.get("/users/profile");
            setProfileImageUrl(data.data.profileImage);
        }
        getProfile();
    }, []);

    const logout = async () => {
        api.post("/logout")
            .then(() => {
                clearCsrfToken();
                navigator("/login");
            });
    }

    return (
        <HeaderContainer>
            <HeaderLogo/>
            {isLoggedIn &&
                <HeaderProfileContainer>
                    <HeaderProfile
                        onClick={() => setShowDropDown(prev => !prev)}
                        $imageUrl={`${GOOGLE_CLOUD_STORAGE_URL}${profileImageUrl}`}
                    />
                    <DropDown $show={showDropDown}>
                        <button onClick={() => navigator("/login")}>회원정보수정</button>
                        <button onClick={() => navigator("/login")}>비밀번호수정</button>
                        <button onClick={() => logout()}>로그아웃</button>
                    </DropDown>
                </HeaderProfileContainer>
            }
        </HeaderContainer>
    )
}