import { styled, css } from "styled-components";

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    pointer-events: auto;
`

const ModalBox = styled.div`
    width: 408px;
    height: 242px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
`

const ModalTitle = styled.h3`
    font-size: 24px;
    font-weight: 700;
    margin: 0;
    text-align: center;
`

const ModalText = styled.p`
    font-size: 20px;
    font-weight: 400;
    margin: 0;
    text-align: center;
`

const ModalButtonBox = styled.div`
    display: flex;
    justify-content: center;
    gap: 16px;
`

const ModalButton = styled.button`
    width: 127px;
    height: 40px;
    border-radius: 10px;
    font-size: 20px;
    font-weight: 400;
    line-height: 100%;
    cursor: pointer;
    border: none;
    transition: background-color 0.2s ease, transform 0.1s ease;
    
    ${({ $variant }) =>
            $variant === "cancel"
                    ? css`
                        background-color: #ffffff;
                        color: #525252;
                        border: 1px solid #e2e2e2;

                        &:active {
                            background-color: #f7f7f7;
                        }
                    `
                    : css`
                        background-color: #ffc700;
                        color: #333333;

                        &:active {
                            background-color: #ecaa00;
                        }
                    `}
`

function Modal({ title, text, confirmAction, cancelAction }) {
    return (
        <ModalContainer>
            <ModalBox>
                <img src={"/src/assets/warning-fill.svg"} alt={"warning"}/>
                <ModalTitle>{title}</ModalTitle>
                <ModalText>{text}</ModalText>
                <ModalButtonBox>
                    <ModalButton $variant={"cancel"} onClick={cancelAction}>취소</ModalButton>
                    <ModalButton $variant={"confirm"} onClick={confirmAction}>확인</ModalButton>
                </ModalButtonBox>
            </ModalBox>

        </ModalContainer>
    )
}

export default Modal;