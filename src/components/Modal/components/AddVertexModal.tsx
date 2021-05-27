import React, { FunctionComponent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container } from 'react-bootstrap';

import FormInputError from '@components/Modal/components/FormInputError';
import "bootstrap/dist/css/bootstrap.css"

type Inputs = {
    name: string,
    label: string,
    latitude: string,
    longitude: string,
};

type AddVertexModalProps = {
    addVertex: Function;
};


const AddVertexModal: FunctionComponent<AddVertexModalProps> =
    (props): JSX.Element => {
    const { addVertex } = props;
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const [showCoordinatesArea, setShowCoordinatesArea] = useState(false);


    const onSubmit = (data: Inputs) => {
        addVertex(data.name, data.label, data.latitude, data.longitude);
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
                <div className="form-row">
                    <label htmlFor="input-coordinates-area">
                        <input
                          id="input-coordinates-area"
                          type="checkbox"
                          checked={showCoordinatesArea}
                          onChange={event => setShowCoordinatesArea(event.target.checked)}
                        />
                        &nbsp;Informar coordenadas para o vertice
                    </label>
                </div>
                {showCoordinatesArea && (
                    <div className="form-row">
                        <div className="col-4">
                            <label htmlFor="input-latitude">
                                Latitude:
                                <input id="input-latitude" className="form-control" type="text"
                                       {...register('latitude', { required: showCoordinatesArea })}
                                />
                                <FormInputError hasError={errors.latitude} />
                            </label>
                        </div>
                        <div className="col-4">
                            <label htmlFor="input-longitude">
                                Longitude:
                                <input id="input-longitude" className="form-control" type="text"
                                       {...register('longitude', { required: showCoordinatesArea })}
                                />
                                <FormInputError hasError={errors.longitude} />
                            </label>
                        </div>
                    </div>
                )}
                <button className="btn btn-primary float-right" type="submit">
                    Salvar
                </button>
            </form>
        </Container>
    )
}

export default AddVertexModal;