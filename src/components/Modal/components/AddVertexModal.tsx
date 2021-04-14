import React, { FunctionComponent } from "react";
import { useForm } from 'react-hook-form';
import { Container } from 'react-bootstrap';

import FormInputError from '@components/Modal/components/FormInputError';
import "bootstrap/dist/css/bootstrap.css"

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
                <div className="form-row">
                    <div className="col-4">
                        <label htmlFor="input-name">
                            Nome:
                            <input id="input-name" className="form-control" type="text"
                                   {...register('name', { required: true })}
                            />
                            <FormInputError hasError={errors.name} />
                        </label>
                    </div>
                    <div className="col-4">
                        <label htmlFor="input-label">
                            Rotulo:
                            <input id="input-label" className="form-control" type="text"
                                   {...register('label', { required: true })}
                            />
                            <FormInputError hasError={errors.label} />
                        </label>
                    </div>
                </div>
                <button className="btn btn-primary float-right" type="submit">
                    Salvar
                </button>
            </form>
        </Container>
    )
}

export default AddVertexModal;