import styled from "styled-components";
import PostWrite from "../../components/Post/PostWrite.jsx";
import { LargeButton } from "../../components/Commmon/LargeButton.jsx";
import { ImageSelect } from "../../components/Post/ImageSelect.jsx";
import { useImagePreview } from "../../hooks/useImagePreview.jsx";
import { useState } from "react";
import { api } from "../../utils/axios.js";
import { useNavigate } from "react-router-dom";

const WriteContainer = styled.div`
    width: 600px;
    margin: 0 auto;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
`

export const PostCreate = () => {
    const navigator = useNavigate();
    const imagePreview = useImagePreview();
    const [postState, setPostState] = useState({
        title: "", content: ""
    });

    const blurEvent = (e, target) => {
        const value = e.target.value;
        setPostState(prev => ({
            ...prev, [target]: value
        }));
    }

    const createPost = async () => {
        const formData = new FormData();
        formData.append(
            "request",
            new Blob([JSON.stringify({
                title: postState.title,
                content: postState.content
            })], { type: "application/json" })
        );

        if (imagePreview.imageFiles != null) {
            Object.values(imagePreview.imageFiles)
                .forEach(image =>
                    formData.append("images", image)
                );
        }

        const { data } = await api.postForm(`/posts`, formData);
        if (data.success) {
            navigator(`/posts/${data.data.id}`);
        }
    }

    return (
        <WriteContainer>
            <PostWrite blurEvent={blurEvent}/>
            <ImageSelect imagePreview={imagePreview}/>
            <LargeButton
                text={"작성 완료"}
                variant={"top"}
                disabled={!Object.values(postState).every(value => value.length > 0)}
                clickEvent={createPost}
            />
        </WriteContainer>
    )
}