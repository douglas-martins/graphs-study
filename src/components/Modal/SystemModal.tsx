import React, { FunctionComponent } from 'react';
import { Modal } from 'react-bootstrap'

import "bootstrap/dist/css/bootstrap.min.css";

export interface SystemModalProps {
    size: "sm" | "lg" | "xl";
    title: string;
    body: JSX.Element;
    onClickSave: Function;
    show: boolean;
    toggle: () => void;
}

const SystemModal: FunctionComponent<SystemModalProps> =
    (props: SystemModalProps): JSX.Element => {
    const { size, title, body, onClickSave, show, toggle } = props;

    return (
        <Modal show={show} onHide={toggle} size={size} centered>
            <Modal.Header onHide={toggle} closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
        </Modal>
    );
};

export default SystemModal;