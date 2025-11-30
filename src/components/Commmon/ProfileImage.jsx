import styled from "styled-components";
import { useRef, useState } from "react";
import { useImagePreview } from "../../hooks/useImagePreview.jsx";

const ImageWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ImageCircle = styled.div`
    width: ${props => props.$length};
    height: ${props => props.$length};
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border: none;
    background-image: url(${props => (props.$imageUrl ? props.$imageUrl : "/src/assets/profile.svg")});
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: relative;
`

export const ProfileImage = ({ length, imageUrl = null, isUpload = true }) => {
    const inputRef = useRef(null);
    const imagePreview = useImagePreview(imageUrl);

    // TODO: API 제작

    return (
        <>
            <label htmlFor={"image"}>프로필 사진</label>
            <ImageWrapper>
                <ImageCircle
                    $length={length}
                    $imageUrl={imagePreview.imageUrlList[0]}
                    onClick={() => inputRef.current.click()}
                >
                    {isUpload &&
                        <input
                            id={"image"}
                            ref={inputRef}
                            type={"file"}
                            accept={"image/*"}
                            hidden={true}
                            onChange={(e) => imagePreview.showImagePreview(e)}
                        />
                    }
                </ImageCircle>
            </ImageWrapper>
        </>
    )
}