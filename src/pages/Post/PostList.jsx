import styled from "styled-components";
import PostCard from "../../components/Post/PostCard.jsx";
import { RoundButton } from "../../components/Commmon/RoundButton.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { api } from "../../utils/axios.js";
import { Observer } from "../../components/Commmon/Observer.jsx";

const ButtonBox = styled.div`
    //position: fixed;
    //left: 50%;
    //transform: translateX(calc(360px + 20px));
    width: 100%;
    display: flex;
    justify-content: flex-end; /* 오른쪽 정렬 */
    margin-bottom: 10px;
`

const BoardTitle = styled.p`
    font-size: 20px;
    font-weight: 400;
    text-align: center;
    line-height: 1.4;
    margin-bottom: 20px;

    strong {
        font-weight: 700;
    }
`

export const PostList = () => {
    const POST_MAX_LIMIT = 10;
    const navigator = useNavigate();
    const [posts, setPosts] = useState([]);

    const createPostFetcher = () => {
        let lastPostId = null;

        return async () => {
            const path = lastPostId === null ?
                `/posts?limit=${POST_MAX_LIMIT}` :
                `/posts?limit=${POST_MAX_LIMIT}&lastPostId=${lastPostId}`;

            const { data } = await api.get(path);
            const nextPosts = data.data;

            if (nextPosts.length <= 0) {
                return;
            }

            lastPostId = nextPosts?.at(-1).id;
            setPosts(prev => [...prev, ...nextPosts]);
        }
    }

    return (
        <>
            <BoardTitle>
                안녕하세요, 강아지를 소개하며 소통하는<br/>
                <strong>PUPPYNESS 게시판</strong> 입니다.
            </BoardTitle>
            <ButtonBox>
                <RoundButton
                    text={"게시글 작성"}
                    icon={"write.svg"}
                    iconColor={"#FFFFFF"}
                />
            </ButtonBox>
            {posts.map(post => (
                <PostCard
                    id={post.id}
                    key={post.id}
                    title={post.title}
                    authorNickname={post.authorNickname}
                    authorProfileImage={post.authorProfileImage}
                    createdAt={post.createdAt}
                    likeCount={post.likeCount}
                    viewCount={post.viewCount}
                    commentCount={post.commentCount}
                    clickEvent={() => navigator(`/posts/${post.id}`)}
                />
            ))}
            <Observer getNextItems={createPostFetcher}/>
        </>
    )
}