import { useCallback, useState } from "react";

export function useImagePreview(url = null) {
    const [imageUrl, setImageUrl] = useState(url);
    const [profileImage, setProfileImage] = useState(null);

    const showImagePreview = useCallback((e) => {
        const image = e.target.files[0];

        if (!image) {
            setImageUrl(null);
            return;
        }

        const reader = new FileReader();
        reader.onload = (readerEvent) => {
            setImageUrl(readerEvent.target.result);
        }
        reader.readAsDataURL(image);

        setProfileImage(image);
    }, []);

    return { imageUrl, profileImage, showImagePreview }
}