import React, { FunctionComponent } from "react";
import { useForm } from 'react-hook-form';
import { Button, Container, Modal } from 'react-bootstrap';

type Inputs = {
    name: string,
    label: string,
};

type AddVertexModalProps = {
    addVertex: Function;
};


const AddVertexModal: FunctionComponent<AddVertexModalProps> =
    (props): JSX.Element => {
    const { addVertex } = props;
    const {
        register, handleSubmit, formState: { errors }
    } = useForm<Inputs>();
    const onSubmit = (data: Inputs) => {
        addVertex(data.name, data.label);
    };

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('name', { required: true })}/>
                {errors.name && <span>This field is required</span>}
                <input {...register('label', { required: true })}/>
                {errors.label && <span>This field is required</span>}
                <Button type="submit">salvar</Button>
            </form>
        </Container>
    )
}

export default AddVertexModal;