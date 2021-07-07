import { useState } from "react";

export type ModalTypeData = {
    type: 'vertex' | 'edge' | 'roy' | 'about' | 'aStar' | 'economies' | '';
    title: string;
};

export const useModal = () => {
    const [show, setShow] = useState<boolean>(false);
    const [currentModal, setCurrentModal] = useState<ModalTypeData>({
        type: '', title: ''
    });
    const toggle: () => void = (): void => {
        setShow(!show);
    };

    const changeCurrentModal = (newModalTypeData: ModalTypeData): void => {
        setCurrentModal(newModalTypeData);
        toggle();
    };
    return {
        show,
        toggle,
        currentModal,
        changeCurrentModal
    }
};