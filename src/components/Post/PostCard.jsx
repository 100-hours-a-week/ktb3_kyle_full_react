import styled from "styled-components";
import { formatDate, formatNumber } from "/src/utils/Formatter.js"
import Author from "./Author.jsx";

const Post = styled.div`
    width: 592px;
    min-height: 120px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    
    &:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
`

const PostTitle = styled.div`
    padding-left: 20px;
    padding-right: 20px;
    
    div {
        font-size: 18px;
        font-weight: 700;
        padding: 5px 0;
        line-height: 24px;
    }
`



const PostBottom = styled.div`
    display: flex;
    flex-direction: column;
`

const PostCountBar = styled.div`
    font-size: 12px;
    color: #555;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 8px;
    display: flex;
    
    span {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 3px;
        margin-right: 12px;
    }
`

function PostCard(
    { id, title, authorNickname, authorProfileImage, likeCount, viewCount, commentCount, createdAt, clickEvent }
) {
    return (
        <Post onClick={clickEvent}>
            <Author
                length={"28px"}
                authorNickname={authorNickname}
                authorProfileImage={authorProfileImage}
                createdAt={createdAt}
            />
            <PostBottom>
                <PostTitle>
                    <div>{title}</div>
                </PostTitle>
                <PostCountBar>
                    <span><img src="/src/assets/heart.svg" alt="heart"/>{formatNumber(likeCount)}</span>
                    <span><img src="/src/assets/comment.svg" alt="comment"/>{formatNumber(commentCount)}</span>
                    <span><img src="/src/assets/view.svg" alt="view"/>{formatNumber(viewCount)}</span>
                </PostCountBar>
            </PostBottom>
        </Post>
    )
}

export default PostCard;