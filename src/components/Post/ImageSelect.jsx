import styled from "styled-components";
import { useEffect, useRef } from "react";
import { useImagePreview } from "../../hooks/useImagePreview.jsx";

const ImageSelectBox = styled.div`
    width: 600px;
`

const Label = styled.label`
    font-size: 16px;
    font-weight: 500;
    display: block;
    padding: 20px 10px;
`

const ImageWrapper = styled.div`
    display: flex;
    gap: 12px;
`

const InputImage = styled.div`
    width: 72px;
    height: 72px;
    border: 1px solid #E2E2E2;
    border-radius: 8px;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
    
    input[type = "file"] {
        position: absolute;
        width: 0;
        height: 0;
        padding: 0;
        overflow: hidden;
        border: 0;
    }
    
    &::before {
        content: "";
        display: inline-block;
        width: 40px;
        height: 40px;

        background: url("/src/assets/image-plus.svg") no-repeat center;

        margin-left: 7px;
        margin-bottom: 4px;
    }
`

const ImageList = styled.div`
    display: flex;
    gap: 12px;
`

const Image = styled.div`
    width: 72px;
    height: 72px;
    border: 1px solid #E2E2E2;
    border-radius: 8px;
    
    background-image: url("${props => props.$imageUrl}");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    position: relative;
`

const CancelButton = styled.div`
    display: inline-block;
    width: 20px;
    height: 20px;
    cursor: pointer;

    background: url("/src/assets/cancel.svg") no-repeat center;

    position: absolute;
    top: -6px;
    right: -6px;

    transition: transform 0.1s ease, box-shadow 0.1s ease;
    
    &:active {
        transform: scale(0.96);
    }
`

export const ImageSelect = () => {
    const imageInputRef = useRef(null);
    const { imageUrlList, showImagePreview, removeSelectedImage } = useImagePreview();

    return (
        <ImageSelectBox>
            <Label htmlFor={"wrapper"}>이미지</Label>
            <ImageWrapper id={"wrapper"}>
                <InputImage onClick={() => imageInputRef.current.click()}>
                    <input
                        ref={imageInputRef}
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        multiple={true}
                        onChange={(e) => showImagePreview(e)}
                    />
                </InputImage>
                <ImageList>
                    {imageUrlList.map((imageUrl, index) => (
                        <Image key={imageUrl} $imageUrl={imageUrl}>
                            <CancelButton onClick={() => removeSelectedImage(index)}/>
                        </Image>
                    ))}
                </ImageList>
            </ImageWrapper>
        </ImageSelectBox>
    )
}