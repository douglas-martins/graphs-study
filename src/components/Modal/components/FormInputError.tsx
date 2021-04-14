import React, { FunctionComponent } from 'react';

import "bootstrap/dist/css/bootstrap.css";
import { FieldError } from "react-hook-form";

interface FormInputErrorProps {
    hasError: FieldError | undefined;
}

const FormInputError: FunctionComponent<FormInputErrorProps> =
    ({ hasError }): JSX.Element => (
    <>
        {hasError &&
	    <span className="text-danger">Este campo é obrigatório</span>}
	</>
);

export default FormInputError;