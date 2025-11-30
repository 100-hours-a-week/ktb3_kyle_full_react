import Author from "../../components/Post/Author.jsx";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { ImageSlider } from "../../components/Post/ImageSlider.jsx";
import { formatNumber, formatDate } from "../../utils/Formatter.js";
import { useEffect, useState } from "react";
import { api } from "../../utils/axios.js";
import { Observer } from "../../components/Commmon/Observer.jsx";
import { GOOGLE_CLOUD_STORAGE_URL } from "../../utils/Config.js";
import Modal from "../../components/Commmon/Modal.jsx";
import { useModal } from "../../hooks/useModal.jsx";

const PostDetailContainer = styled.div`
    width: 592px;
    margin: 0 auto 10px auto;
`

const PostTitle = styled.h1`
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 15px;
`

const AuthorContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Divider = styled.hr`
    border: none;
    height: 1px;
    background-color: #ddd;
    margin: 20px 0;
`

const PostContent = styled.p`
    font-size: 14px;
    line-height: 1.6;
    color: #444;
    margin-bottom: 30px;
`

const CountStatusBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: center;
    margin: 0 0;
    gap: 8px;

    font-size: 14px;
    font-weight: 700;
`

const CountStatus = styled.div`
    width: 65px;
    height: 40px;
    border-radius: 8px;
    background-color: #F7F7F7;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;

    color: ${props => props.$color};

    &::before {
        content: "";
        display: inline-block;
        width: 18px;
        height: 18px;

        background-color: ${props => props.$color};
        mask: url("/src/assets/${props => props.$icon}") no-repeat center;
        mask-size: contain;
    }
`

const CommentInputBox = styled.div`
    background: #fff;
    border-radius: 28px;
    padding: 10px 12px;
    margin-top: 15px;
    display: flex;
    align-items: center;
    gap: 12px;
    border: 1px solid #e5e5e5;
    position: relative;

    textarea {
        flex: 1;
        border: none;
        resize: none;
        outline: none;
        font-size: 16px;
        font-weight: 500;
        line-height: 1.4;
        height: calc(1em * 1.4);
    }
`

const DivisionBar = styled.div`
    width: 100%;
    height: 12px;
    background-color: #F7F7F7;
`

const CommentSend = styled.button`
    width: 40px;
    height: 40px;
    color: ${props => (props.$active ? "#000000" : "#B7B7B7")};
    background-color: ${props => (props.$active ? "#FFC700" : "#F7F7F7")};
    border-radius: 50%;
    border: none;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    cursor: pointer;
    pointer-events: ${props => (props.$active ? 'auto' : 'none')};

    &:active {
        background-color: #ECAA00;
    }

    &::before {
        content: "";
        display: inline-block;
        width: 14px;
        height: 14px;

        background-color: ${props => (props.$active ? "#000000" : "#B7B7B7")};
        mask: url("/src/assets/send.svg") no-repeat center;
        mask-size: contain;
    }
`

const CommentListContainer = styled.div`
    width: 592px;
    margin: 0 auto;
`

const Comment = styled.div`
    width: 600px;
    min-height: 65px;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 8px 0;
    position: relative;
    border-bottom: 1px solid #EFEFEF;
`

const CommentAuthorProfile = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url("${props => props.$imageUrl}");
`

const CommentBox = styled.div`
    display: flex;
    flex-direction: column;
`

const CommentInfo = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
    padding-top: 8px;

    img {
        width: 2px;
        height: 2px;
    }

    span {
        color: #707070;
        line-height: 18px;
        font-size: 14px;
        font-weight: 700;
    }
`

const CommentContent = styled.div`
    font-size: 15px;
    font-weight: 400;
    margin-top: 16px;
`

const CommentActionBox = styled.div`
    display: flex;
    align-self: center;
    gap: 8px;
    margin-left: auto;
`

const PostActionBox = styled.div`
    display: flex;
    gap: 8px;
`

const ActionButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    width: ${props => props.$length};
    height: ${props => props.$length};
    border-radius: 6px;
    font-size: 12px;
    cursor: pointer;
    background-color: white;
    border: 1px solid #E2E2E2;
    transition: all 0.15s ease;

    &::before {
        content: "";
        display: inline-block;
        width: 24px;
        height: 24px;

        background-color: black;
        mask: url("/src/assets/${props => props.$icon}") no-repeat center;
        mask-size: contain;
    }
`

const UpdateBadge = styled.div`
    position: absolute;
    left: -70px; /* CommentInputBox 왼쪽으로 플로팅 */
    padding: 6px 10px;
    background: #ffc700;
    color: #333;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 700;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
`;

export const PostDetail = () => {
    const COMMENT_MAX_LIMIT = 10;
    const navigator = useNavigate();
    const { postId } = useParams();
    const modal = useModal();
    const [isLoading, setIsLoading] = useState(true);
    const [postLike, setPostLike] = useState("");
    const [postDetail, setPostDetail] = useState("");
    const [content, setContent] = useState("");
    const [commentList, setCommentList] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [updateCommentId, setUpdateCommentId] = useState(0);

    useEffect(() => {
        const getPostDetail = async () => {
            const [postLikeRes, postDetailRes] = await Promise.all([
                api.get(`/posts/${postId}/like`)
                    .then((res) => res.data.data),
                api.get(`/posts/${postId}`)
                    .then((res) => res.data.data)
            ]);
            console.log(postDetailRes)
            setIsLoading(false);
            setPostLike(postLikeRes);
            setPostDetail(postDetailRes);
        }

        getPostDetail();
    }, []);

    const createCommentFetcher = () => {
        let lastCommentId = null;

        return async () => {
            const path = lastCommentId === null ?
                `/posts/${postId}/comments?limit=${COMMENT_MAX_LIMIT}` :
                `/posts/${postId}/comments?limit=${COMMENT_MAX_LIMIT}&lastCommentId=${lastCommentId}`;

            const { data } = await api.get(path);
            const nextComments = data.data;

            if (nextComments.length <= 0) {
                return null;
            }

            lastCommentId = nextComments?.at(-1).id;
            setCommentList(prev => [...prev, ...nextComments]);
            return lastCommentId;
        }
    }

    const fetchComment = async () => {
        if (isUpdate) {
            await updateComment(updateCommentId);
        } else {
            await createComment();
        }
    }

    const createComment = async () => {
        await api.post(`/posts/${postId}/comments`, {
            content: content
        })
            .then(() => location.reload());
    }

    const updateComment = async (commentId) => {
        await api.patch(`/posts/${postId}/comments/${commentId}`, {
            content: content
        })
            .then(() => location.reload());
    }

    const deleteComment = async (commentId) => {
        await api.delete(`/posts/${postId}/comments/${commentId}`)
            .then(() => location.reload());
    }

    const deletePost = async () => {
        await api.delete(`/posts/${postId}`)
            .then(() => navigator(`/posts`));
    }

    const handleCommentDelete = (commentId) => {
        modal.showModal(
            {
                title: "댓글을 삭제하시겠습니까?",
                text: "삭제한 내용은 복구할 수 없습니다.",
            },
            async () => {
                await deleteComment(commentId);
                modal.closeModal();
            }
        );
    };

    const handlePostDelete = () => {
        modal.showModal(
            {
                title: "게시글을 삭제하시겠습니까?",
                text: "삭제한 내용은 복구할 수 없습니다.",
            },
            async () => {
                await deletePost();
                modal.closeModal();
            }
        );
    };

    const scrollToCommentUpdate = (commentId, targetContent) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setContent(targetContent);
        setIsUpdate(true);
        setUpdateCommentId(commentId);
    }

    return (
        <>
            {!isLoading &&
                <>
                    {modal.open && <Modal
                        title={modal.content.title}
                        text={modal.content.text}
                        confirmAction={modal.confirmAction}
                        cancelAction={modal.closeModal}/>
                    }
                    <PostDetailContainer>
                        <PostTitle>{postDetail.title}</PostTitle>
                        <AuthorContainer>
                            <Author
                                isDetail={true}
                                length={"36px"}
                                authorNickname={postDetail.authorNickname}
                                authorProfileImage={postDetail.authorProfileImage}
                                createdAt={postDetail.createdAt}
                            />
                            <PostActionBox>
                                <ActionButton
                                    $icon={"write.svg"}
                                    $length={"40px"}
                                    onClick={() => navigator(`/posts/update/${postId}`)}
                                />
                                <ActionButton
                                    $icon={"trash.svg"}
                                    $length={"40px"}
                                    onClick={handlePostDelete}
                                />
                            </PostActionBox>
                        </AuthorContainer>
                        <Divider/>
                        {postDetail.imagePaths?.length > 0 && <ImageSlider postImages={postDetail.imagePaths}/>}
                        <PostContent>{postDetail.content}</PostContent>
                        <CountStatusBar>
                            <CountStatus $icon={postLike.liked ? "heart.svg" : "heart-empty.svg"}
                                         $color={"#EC5062"}>{formatNumber(postLike.likeCount)}</CountStatus>
                            <CountStatus $icon={"view.svg"}
                                         $color={"#7F6AEE"}>{formatNumber(postDetail.viewCount)}</CountStatus>
                            <CountStatus $icon={"comment.svg"}
                                         $color={"#A2C9ED"}>{formatNumber(postDetail.commentCount)}</CountStatus>
                        </CountStatusBar>
                        <CommentInputBox>
                            {isUpdate && <UpdateBadge>수정중</UpdateBadge>}
                            <textarea
                                name={"comment"}
                                placeholder={"댓글을 입력해주세요"}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            <CommentSend $active={content.length > 0} onClick={() => fetchComment()}/>
                        </CommentInputBox>
                    </PostDetailContainer>
                    <CommentListContainer>
                        {commentList.map(comment => (
                            <Comment key={comment.id}>
                                <CommentAuthorProfile
                                    $imageUrl={`${GOOGLE_CLOUD_STORAGE_URL}${comment.authorProfileImage}`}/>
                                <CommentBox>
                                    <CommentInfo>
                                        <span>{comment.authorNickname}</span>
                                        <img src={"/src/assets/dot.svg"} alt={"dot"}/>
                                        <span>{formatDate(comment.createdAt)}</span>
                                    </CommentInfo>
                                    <CommentContent>{comment.content}</CommentContent>
                                </CommentBox>
                                {comment.author &&
                                    <CommentActionBox>
                                        <ActionButton
                                            $icon={"write.svg"}
                                            $length={"30px"}
                                            onClick={() => scrollToCommentUpdate(comment.id, comment.content)}
                                        />
                                        <ActionButton
                                            $icon={"trash.svg"}
                                            $length={"30px"}
                                            onClick={() => handleCommentDelete(comment.id)}
                                        />
                                    </CommentActionBox>
                                }
                            </Comment>
                        ))}
                        <Observer getNextItems={createCommentFetcher}/>
                    </CommentListContainer>
                </>
            }
        </>
    )
}