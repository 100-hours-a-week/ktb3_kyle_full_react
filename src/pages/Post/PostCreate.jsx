import styled from "styled-components";
import PostWrite from "../../components/Post/PostWrite.jsx";
import { LargeButton } from "../../components/Commmon/LargeButton.jsx";
import { ImageSelect } from "../../components/Post/ImageSelect.jsx";

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
    return (
        <WriteContainer>
            <PostWrite/>
            <ImageSelect/>
            <LargeButton text={"작성 완료"} variant={"top"}/>
        </WriteContainer>
    )
}