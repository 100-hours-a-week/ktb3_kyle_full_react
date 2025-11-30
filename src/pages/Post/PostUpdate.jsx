import { useNavigate, useParams } from "react-router-dom";
import PostWrite from "../../components/Post/PostWrite.jsx";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { api } from "../../utils/axios.js";
import { LargeButton } from "../../components/Commmon/LargeButton.jsx";

const WriteContainer = styled.div`
    width: 600px;
    margin: 0 auto;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
`

export const PostUpdate = () => {
    const navigator = useNavigate();
    const { postId } = useParams();
    const [postState, setPostState] = useState({
        title: "", content: ""
    });
    const titleRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const getPostDetail = async () => {
            const { data } = await api.get(`/posts/${postId}`);
            const title = data.data.title;
            const content = data.data.content;

            titleRef.current.value = title;
            contentRef.current.value = content;

            setPostState({
                title: title, content: content
            });
        }
        getPostDetail();
    }, []);

    const blurEvent = (e, target) => {
        const value = e.target.value;
        setPostState(prev => ({
            ...prev, [target]: value
        }));
    }

    const updatePost = async () => {
        const { data } = await api.patch(`/posts/${postId}`, {
            title: postState.title,
            content: postState.content
        });
        if (data.success) {
            navigator(`/posts/${postId}`);
        }
    }

    return (
        <WriteContainer>
            <PostWrite
                page={"게시글 수정"}
                titleRef={titleRef}
                contentRef={contentRef}
                blurEvent={blurEvent}
            />
            <LargeButton
                text={"수정 완료"}
                variant={"top"}
                disabled={!Object.values(postState).every(value => value.length > 0)}
                clickEvent={updatePost}
            />
        </WriteContainer>
    )
}