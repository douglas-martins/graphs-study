import React, { Fragment, FunctionComponent } from 'react';
import { Container } from 'react-bootstrap';
import FormInputError from '@components/Modal/components/FormInputError';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useStoreState } from '../../../store/storeHooks';

type Inputs = {
  vertexOne: string;
  vertexTwo: string;
};

type AStarModalProps = {
  runAStar: Function;
};

const AStarModal: FunctionComponent<AStarModalProps> = ({ runAStar }): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();

  const graph = useStoreState((state) => state.graph);

  const watchVertexOne = watch('vertexOne');
  const watchVertexTwo = watch('vertexTwo');


  const onSubmit = (data: Inputs) => {
    try {
      runAStar(data.vertexOne, data.vertexTwo);
    } catch (e) {
      toast.error(`Não foi possivel aplicar o algoritmo no grafo, ${e}`);
    }
  };

  const renderVertexList = (
    checkVertex: string
  ): JSX.Element | JSX.Element[] => {
    if (!graph.adjacencyList || graph.adjacencyList.length === 0) {
      return <option value="">Selecione um Vértice</option>;
    }

    const availableVertexes = graph.adjacencyList.filter(
      ({ name }) => name !== checkVertex
    );

    return (
      <>
        <option value="">Selecione um Vértice</option>
        {availableVertexes.map(({ name, label }) => (
          <Fragment key={name}>
            <option value={name}>{label}</option>
          </Fragment>
        ))}
      </>
    );
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row">
          <div className="col-4">
            <label htmlFor="vertex-one-select">
              Vértice de partida:
              <select
                id="vertex-one-select"
                className="form-control"
                {...register('vertexOne', { required: true })}
              >
                {renderVertexList(watchVertexTwo)}
              </select>
              <FormInputError hasError={errors.vertexOne} />
            </label>
          </div>
          <div className="col-4">
            <label htmlFor="vertex-two-select">
              Vértice de chegada:
              <select
                id="vertex-two-select"
                className="form-control"
                {...register('vertexTwo', { required: true })}
              >
                {renderVertexList(watchVertexOne)}
              </select>
              <FormInputError hasError={errors.vertexTwo} />
            </label>
          </div>
        </div>
        <button className="btn btn-primary float-right" type="submit">
          Executar AStar
        </button>
      </form>
    </Container>
  );
};

export default AStarModal;