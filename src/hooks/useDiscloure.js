import { useState } from "react";

export const useDiscloure = () => {
    const [isOpen, setOpen] = useState(false);

    const onOpen = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    return { isOpen, onOpen, onClose }
}
