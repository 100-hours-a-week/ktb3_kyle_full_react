import { api } from "./axios.js";

const success = (message) => ({ pass: true, message: message });
const fail = (message) => ({ pass: false, message: message });

export const loginEmailValidation = (email) => {
    if (email.length <= 0) {
        return fail("이메일을 입력해주세요.");
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    if (!emailRegex.test(email)) {
        return fail("올바른 이메일 주소 형식을 입력해주세요");
    }

    return success("사용 가능한 이메일입니다.");
}

export const emailValidation = async (email) => {
    if (email.length <= 0) {
        return fail("이메일을 입력해주세요.");
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    if (!emailRegex.test(email)) {
        return fail("올바른 이메일 주소 형식을 입력해주세요");
    }

    const duplicate = await checkEmailDuplicate(email);
    if (duplicate) {
        return fail("중복된 이메일입니다.");
    }

    return success("사용 가능한 이메일입니다.");
}

export const passwordValidation = (password) => {
    if (password.length <= 0) {
        return fail("비밀번호를 입력해주세요");
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*(),.?":{}|<>])[A-Za-z\d~!@#$%^&*(),.?":{}|<>]{8,20}$/;
    if (!passwordRegex.test(password)) {
        return fail("비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야합니다");
    }

    return success("사용 가능한 비밀번호입니다.");
}

export const passwordCheckValidation = (passwordCheck, password) => {
    if (passwordCheck.length <= 0) {
        return fail("비밀번호를 한번 더 입력해주세요.");
    }

    if (password !== passwordCheck) {
        return fail("비밀번호가 다릅니다.");
    }

    return success("비밀번호가 일치합니다.");
}

export const nicknameValidation = async (nickname) => {
    if (nickname.length <= 0) {
        return fail("닉네임을 입력해주세요.");
    }

    if (nickname.length > 10) {
        return fail("닉네임은 최대 10자까지 작성 가능합니다.");
    }

    if (nickname.includes(' ')) {
        return fail("띄어쓰기를 없애주세요.");
    }

    const duplicate = await checkNicknameDuplicate(nickname);
    if (duplicate) {
        return fail("중복된 닉네임입니다.");
    }

    return success("사용 가능한 닉네임입니다.");
}

const checkNicknameDuplicate = async (nickname) => {
    const { data } = await api.get(`/users/nickname/duplicate?nickname=${nickname}`);
    console.log(data);
    return data.data;
}

const checkEmailDuplicate = async (email) => {
    const { data } = await api.get(`/users/email/duplicate?email=${email}`);
    return data.data;
}