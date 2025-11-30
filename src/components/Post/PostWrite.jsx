import styled from "styled-components";


const PageTitle = styled.h2`
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 30px;
`

const Label = styled.label`
    font-size: 16px;
    font-weight: 500;
    display: block;
    padding: 20px 10px;
`

const InputTitle = styled.input`
    width: 592px;
    height: 40px;
    border: none;
    border-bottom: 2px solid #E2E2E2;
    padding: 8px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.3s;
    
    &:focus {
        border-bottom: 2px solid #ECAA00;
    }
    
    &::placeholder {
        color: #838486;
        font-weight: 700;
    }
`

const InputContent = styled.textarea`
    width: 592px;
    height: 300px;
    border: none;
    border-bottom: 2px solid #E2E2E2;
    padding: 10px;
    resize: none;
    outline: none;
    font-size: 14px;
    
    &:focus {
        border-bottom: 2px solid #ECAA00;
    }
    
    &::placeholder {
        color: #838486;
        font-weight: 700;
    }
`

function PostWrite({ title = "", content = "", page }) {
    return (
        <>
            <PageTitle>{page}</PageTitle>
            <div>
                <Label htmlFor={"title"}>제목</Label>
                <InputTitle id={"title"} type={"text"} placeholder={"제목을 입력해주세요. (최대 26글자)"}></InputTitle>
            </div>

            <div>
                <Label htmlFor={"content"}>내용</Label>
                <InputContent id={"content"} placeholder={"내용을 입력해주세요"}></InputContent>
            </div>
        </>
    )
}

export default PostWrite;