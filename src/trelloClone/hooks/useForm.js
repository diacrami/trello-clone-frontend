/* eslint-disable no-unused-vars */

import { useState } from "react";

/* 
    Puedes retornar un arreglo, objeto, valor booleano o un jsx
*/

export const useForm = ( initialForm = {} ) => {

    const [formState, setFormState] = useState( initialForm );

   
    const onInputChange = ({target}) =>{
        const {name, value} = target;
        setFormState({
            ...formState,
            //Propiedades computadas de los obj que van en llaves cuadradas
            [ name ]: value
            //CUIDADO: si cambias el nombre de la propiedad, se crea una nueva
        });
    }

    const onResetForm = () =>{
        setFormState( initialForm );
    }

  return {
        ...formState,
        formState,
        onInputChange,
        onResetForm
  }
}
