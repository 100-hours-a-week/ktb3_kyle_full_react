import styled, { css } from "styled-components";
import { useState } from "react";
import { GOOGLE_CLOUD_STORAGE_URL } from "../../utils/Config.js";

const SliderContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: 800px;
    height: 400px;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 16px;
`

const SliderButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(255, 255, 255, 0.6);
    border: none;
    font-size: 24px;
    padding: 6px 10px;
    cursor: pointer;
    border-radius: 50%;
    transition: background 0.2s;
    visibility: visible;
    z-index: 10;

    ${props => props.$right ? css`
        right: 10px;
    ` : css`
        left: 10px;
    `}
    
    &:hover {
        background-color: rgba(255, 255, 255, 0.9);
    }
    
    &::before {
        content: "";
        display: inline-block;
        width: 18px;
        height: 18px;

        background-color: black;
        mask: url("/src/assets/arrow.svg") no-repeat center;
        mask-size: contain;

        ${props => props.$right && css`
            transform: rotate(180deg);
            transform-origin: center;
        `}
    }
`

const ImageCounter = styled.div`
    position: absolute;
    top: 10px;
    right: 15px;
    padding: 4px 8px;
    font-size: 14px;
    font-weight: 500;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border-radius: 12px;
    z-index: 15;
`

const ImageTracker = styled.div`
    display: flex;
    height: 100%;
    transition: transform 0.4s ease-in-out;
    transform: translateX(${props => `-${props.$offset}%`});
`

const ImageWrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 16px;
`

const Image = styled.div`
    min-width: 100%;
    height: 100%;
    border-radius: 16px;
    background-image: url("${props => props.$imagePath}");
    background-size: cover;
    background-position: center;
`

export const ImageSlider = ({ postImages }) => {
    const [offset, setOffset] = useState(0);
    const [imageIndex, setImageIndex] = useState(0);

    const moveSlide = (index) => {
        let currentIndex = 0;
        const totalCount = postImages.length;

        if (index < 0) currentIndex = totalCount - 1;
        else if (index >= totalCount) currentIndex = 0;
        else currentIndex = index;

        setImageIndex(currentIndex);
        setOffset(currentIndex * 100);
    }

    return (
        <SliderContainer>
            <ImageCounter>{`${imageIndex + 1} / ${postImages.length}`}</ImageCounter>
            <SliderButton onClick={() => moveSlide(imageIndex - 1)}/>
            <ImageWrapper>
                <ImageTracker $offset={offset}>
                    {postImages.map(postImage => (
                        <Image key={postImage.postImageId} $imagePath={`${GOOGLE_CLOUD_STORAGE_URL}${postImage.postImagePath}`}></Image>
                    ))}
                </ImageTracker>
            </ImageWrapper>
            <SliderButton onClick={() => moveSlide(imageIndex + 1)} $right={true}/>
        </SliderContainer>
    )
}