import React, { Fragment, FunctionComponent } from 'react';
import { Container } from 'react-bootstrap';
import FormInputError from '@components/Modal/components/FormInputError';
import { useForm } from 'react-hook-form';

import { useStoreState } from '../../../store/storeHooks';

type Inputs = {
  startVertex: string;
  maxValue: string;
};

type EconomiesModalProps = {
  runEconomies: Function;
};

const EconomiesModal: FunctionComponent<EconomiesModalProps> = ({ runEconomies }): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const graph = useStoreState((state) => state.graph);


  const onSubmit = (data: Inputs) => {
    const startVertex = graph.adjacencyList.find(item => item.name === data.startVertex);
    const maxValue = parseInt(data.maxValue);
    runEconomies(startVertex, maxValue);
  };

  const renderVertexList = (): JSX.Element | JSX.Element[] => {
    if (!graph.adjacencyList || graph.adjacencyList.length === 0) {
      return <option value="">Selecione um Vértice</option>;
    }

    const availableVertexes = graph.adjacencyList;

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
                {...register('startVertex', { required: true })}
              >
                {renderVertexList()}
              </select>
              <FormInputError hasError={errors.startVertex} />
            </label>
          </div>
          <div className="col-6">
            <label htmlFor="max-value-input">
              Valor maximo suportado pelo veiculo:
              <input
                id="max-value-input"
                className="form-control"
                type="number"
                defaultValue="30"
                {...register('maxValue', { required: true })}
               />
              <FormInputError hasError={errors.maxValue} />
            </label>
          </div>
        </div>
        <button className="btn btn-primary float-right" type="submit">
          Executar Economias
        </button>
      </form>
    </Container>
  );
};

export default EconomiesModal;