import { formatDate } from "../../utils/Formatter.js";
import styled from "styled-components";
import { GOOGLE_CLOUD_STORAGE_URL } from "../../utils/Config.js";

const AuthorInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: ${props => (props.$isDetail ? "0" : "10px 20px")};
    
    span {
        color: #707070;
        font-size: 14px;
        font-weight: 500;
    }
`

const AuthorProfile = styled.div`
    width: ${props => props.$length};
    height: ${props => props.$length};
    border-radius: 50%;
    background-image: url(${props => (props.$imageUrl ? `${GOOGLE_CLOUD_STORAGE_URL}${props.$imageUrl}` : "/src/assets/profile.svg")});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`

function Author({length, authorNickname, authorProfileImage, createdAt, isDetail = false}) {
    return (
        <AuthorInfo $isDetail={isDetail}>
            <AuthorProfile $imageUrl={authorProfileImage} $length={length}/>
            <span>{authorNickname}</span>
            <img src="/src/assets/dot.svg" alt="dot"/>
            <span>{formatDate(createdAt)}</span>
        </AuthorInfo>
    )
}

export default Author;