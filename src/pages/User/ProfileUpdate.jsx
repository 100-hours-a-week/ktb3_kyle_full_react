import { FormBox, FormTitle, InputWrapper } from "../../styles/form/style.jsx";
import { ProfileImage } from "../../components/Commmon/ProfileImage.jsx";
import { useImagePreview } from "../../hooks/useImagePreview.jsx";
import { Input } from "../../components/Commmon/Input.jsx";
import { nicknameValidation } from "../../utils/Validation.js";
import { useEffect, useRef, useState } from "react";
import { api } from "../../utils/axios.js";
import { LargeButton } from "../../components/Commmon/LargeButton.jsx";
import styled from "styled-components";
import { GOOGLE_CLOUD_STORAGE_URL } from "../../utils/Config.js";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../hooks/useModal.jsx";
import Modal from "../../components/Commmon/Modal.jsx";

const EmailBox = styled.div`
    font-size: 14px;
    font-weight: 400;
    margin: 16px 0 16px 0;
`

export const ProfileUpdate = () => {
    const navigator = useNavigate();
    const modal = useModal();
    const imagePreview = useImagePreview();
    const nicknameRef = useRef(null);
    const [nickname, setNickname] = useState("");
    const [validState, setValidState] = useState(false);
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const getUserProfile = async () => {
            const { data } = await api.get(`/users/profile`);
            setUserProfile(data.data);
            imagePreview.setImageUrlList([`${GOOGLE_CLOUD_STORAGE_URL}${data.data.profileImage}`]);
            nicknameRef.current.value = data.data.nickname;
        }
        getUserProfile();
    }, []);

    const validationEvent = async (e, target) => {
        const value = e.target.value;
        const result = await nicknameValidation(value);

        setNickname(value);
        setValidState(result.pass);
        return result;
    }

    const updateProfile = async () => {
        const formData = new FormData();
        formData.append(
            "request",
            new Blob([JSON.stringify({
                nickname: nickname,
            })], { type: "application/json" })
        )
        formData.append("image", imagePreview.imageFiles?.at(0));

        const { data } = await api.patch(`/users/profile`, formData);
        if (data.success) {
            navigator(`/posts`);
        }
    }

    const withdraw = async () => {
        try {
            await api.delete(`/users`);
            navigator(`/login`);
        } catch (err) {

        }
    }

    const handleWithdraw = () => {
        modal.showModal(
            {
                title: "회원탈퇴 하시겠습니까?",
                text: "작성된 게시글과 댓글은 삭제됩니다.",
            },
            async () => {
                await withdraw();
                modal.closeModal();
            }
        );
    }

    return (
        <FormBox>
            {modal.open && <Modal
                title={modal.content.title}
                text={modal.content.text}
                confirmAction={modal.confirmAction}
                cancelAction={modal.closeModal}/>
            }
            <FormTitle>회원정보수정</FormTitle>
            <InputWrapper>
                <ProfileImage length={"140px"} imagePreview={imagePreview}/>
                <label htmlFor={"email"}>이메일</label>
                <EmailBox id={"email"}>{userProfile?.email}</EmailBox>
                <Input
                    ref={nicknameRef}
                    label={"닉네임"}
                    target={"nickname"}
                    type={"text"}
                    helper={"닉네임을 입력해주세요."}
                    placeholder={"닉네임을 입력해주세요."}
                    validation={validationEvent}
                />
            </InputWrapper>
            <LargeButton text={"수정하기"} variant={"top"} disabled={!validState} clickEvent={updateProfile}/>
            <LargeButton text={"회원탈퇴"} variant={"bottom"} disabled={false} clickEvent={handleWithdraw}/>
        </FormBox>
    )
}