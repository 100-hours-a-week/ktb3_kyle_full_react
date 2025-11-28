export const formatNumber = (number) => {
    if (number < 10_000) return number;

    const units = [
        { value: 100_000_000, suffix: '억' },
        { value: 10_000, suffix: '만' },
    ];

    for (const { value, suffix } of units) {
        if (number >= value) {
            const scaled = number / value;
            const display = scaled >= 10 ? Math.round(scaled) : Math.round(scaled * 10) / 10;
            return `${display}${suffix}`;
        }
    }
    return number;
}

export const formatDate = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = Math.floor((now - time) / 1000); // 초 단위 차이

    if (diff < 60) {
        return '방금 전';
    }

    const minutes = Math.floor(diff / 60);
    if (minutes < 60) {
        return `${minutes}분 전`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours}시간 전`;
    }

    const days = Math.floor(hours / 24);
    if (days < 7) {
        return `${days}일 전`;
    }

    const weeks = Math.floor(days / 7);
    if (weeks < 5) {
        return `${weeks}주 전`;
    }

    const months = Math.floor(days / 30);
    if (months < 12) {
        return `${months}개월 전`;
    }

    const years = Math.floor(days / 365);
    return `${years}년 전`;
}