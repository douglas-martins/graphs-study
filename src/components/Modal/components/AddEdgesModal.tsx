import React from "react";
import { useForm } from 'react-hook-form';
import { Col, Container, Form, Row } from 'react-bootstrap';

type Inputs = {
    name: string,
    label: string,
};


const AddEdgeModal = (): JSX.Element => {
    const {
        register, handleSubmit, formState: { errors }
    } = useForm<Inputs>();
    const onSubmit = (data: never) => console.log(data);


    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('name', { required: true })}/>
                {errors.name && <span>This field is required</span>}
                <input {...register('label', { required: true })}/>
                {errors.label && <span>This field is required</span>}
                <input type="submit" />
            </form>
        </Container>
    )
}

export default AddEdgeModal;