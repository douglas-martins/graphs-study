import React, { Fragment, FunctionComponent } from "react";
import { useForm } from 'react-hook-form';
import { Container } from 'react-bootstrap';

import "bootstrap/dist/css/bootstrap.css"

import FormInputError from '@components/Modal/components/FormInputError';
import { Vertex } from "@components/Graph/vertex";
import { useStoreState } from "../../../store/storeHooks";

type Inputs = {
    value: number,
    vertexOne: string;
    vertexTwo: string;
};

type AddEdgeModalProps = {
    addEdge: Function;
};


const AddEdgeModal: FunctionComponent<AddEdgeModalProps> =
    ({ addEdge }): JSX.Element => {
    const {
        register, handleSubmit, formState: { errors }, watch
    } = useForm<Inputs>();
    const graph = useStoreState((state) => state.graph);
    const watchVertexOne = watch('vertexOne');
    const watchVertexTwo = watch('vertexTwo');
    const onSubmit = (data: Inputs) => {
        addEdge(data.vertexOne, data.vertexTwo, Number(data.value));
    };

    const renderVertexList = (checkVertex: string): JSX.Element | JSX.Element[] => {
        if (!graph.adjacencyList || graph.adjacencyList.length === 0) {
            return <option value="">Selecione um Vértice</option>
        }
        
        const availableVertexes = graph.adjacencyList.filter(({ name }) => name !== checkVertex)

        return (
            <>
                <option value="">Selecione um Vértice</option>
                {availableVertexes.map(({ name, label }) => (
                    <Fragment key={name}>
                        <option value={name}>{label}</option>
                    </Fragment>
                ))}
            </>
        )
    };

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row">
                    <div className="col-4">
                        <label htmlFor="vertex-one-select">
                            Vértice de origem:
                            <select id="vertex-one-select" className="form-control" {...register('vertexOne', { required: true })}>
                                {renderVertexList(watchVertexTwo)}
                            </select>
                            <FormInputError hasError={errors.vertexOne} />
                        </label>
                    </div>
                    <div className="col-4">
                        <label htmlFor="vertex-two-select">
                            Vértice de destino:
                            <select id="vertex-two-select" className="form-control" {...register('vertexTwo', { required: true })}>
                                {renderVertexList(watchVertexOne)}
                            </select>
                            <FormInputError hasError={errors.vertexTwo} />
                        </label>
                    </div>
                    <div className="col-4">
                        <label htmlFor="input-value">
                            Peso:
                            <input id="input-value" className="form-control" type="number"
                                   {...register('value', { required: true })}
                            />
                            <FormInputError hasError={errors.value} />
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

export default AddEdgeModal;