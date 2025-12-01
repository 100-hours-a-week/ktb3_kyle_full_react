import { useCallback, useState } from "react";

export function useImagePreview(urlList = null) {
    const [imageUrlList, setImageUrlList] = useState(urlList);
    const [imageFiles, setImageFiles] = useState(null);

    const showImagePreview = useCallback(async (e) => {
        const images = Array.from(e.target.files);

        if (!images) {
            setImageUrlList(null);
            setImageFiles(null);
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
        setImageFiles(images);
    }, []);

    const removeSelectedImage = useCallback((indexToRemove) => {
        setImageUrlList(prev => prev.filter((_, i) => i !== indexToRemove));
        setImageFiles(prev => prev.filter((_, i) => i !== indexToRemove));
    }, [])

    return { imageUrlList, imageFiles, setImageUrlList, showImagePreview, removeSelectedImage }
}