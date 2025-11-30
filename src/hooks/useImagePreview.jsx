import { useCallback, useState } from "react";

export function useImagePreview(urlList = null) {
    const [imageUrlList, setImageUrlList] = useState(urlList ? urlList : []);

    const showImagePreview = useCallback(async (e) => {
        const images = Array.from(e.target.files);

        if (!images) {
            setImageUrlList(null);
            return;
        }

        const promises = images.map((image, index) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (progress) => {
                    resolve(progress.target.result);
                }
                reader.readAsDataURL(image);
            })
        })

        const imageList = await Promise.all(promises);
        setImageUrlList(imageList);
        console.log(imageList);
    }, []);

    const removeSelectedImage = useCallback((indexToRemove) => {
        setImageUrlList(prev => prev.filter((_, i) => i !== indexToRemove));
    }, [])

    return { imageUrlList, showImagePreview, removeSelectedImage }
}