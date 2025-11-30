import { useState } from "react";

export function useModal() {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState({
        title: "", text: ""
    });
    const [confirmAction, setConfirmAction] = useState();

    const showModal = ({ title = "", text = "" }, action) => {
        setContent({ title: title, text: text });
        setOpen(true);
        setConfirmAction(() => action);
    };

    const closeModal = () => setOpen(false);

    return { open, content, confirmAction, showModal, closeModal };
}
