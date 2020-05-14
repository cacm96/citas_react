import React, {Fragment, useState} from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

const Form = ({crearCita}) => {

    //crear el state de cita
    const [cita, actualizarCita] = useState({
        pet:'',
        owner:'',
        date:'',
        time:'',
        symptoms:''
    })

    //creando state para el error
    const [ error, actualizarError ] = useState(false);

    //funcion que se ejecuta cuando el usuario escribe en un input
    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    //extraer los valores
    const { pet, owner, date, time, symptoms } = cita;

    //cuando el usuario presiona agregar cita/envia el formulario
    const submitCita = e => {
        e.preventDefault();

        //validar
        //siempre que haya un error hay que colocarle return para que no se siga ejecutando
        if(pet.trim() === '' || owner.trim() === '' || date.trim() === '' || time.trim() === '' || symptoms.trim() === '') {
            actualizarError(true);
            return;
        }

        //eliminar el mensaje previo
        actualizarError(false);

        //asignar id
        cita.id = uuid();

        //crear cita-colocarla en el state principal
        crearCita(cita);

        //reiniciar el form
        actualizarCita({
            pet:'',
            owner:'',
            date:'',
            time:'',
            symptoms:''
        })
    }


    return ( 
        <Fragment>
            <h2>Crear cita</h2>

            {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}

            <form
                onSubmit={submitCita}
            >
                <label>Mascota</label>
                <input
                    type="text"
                    name="pet"
                    className="u-full-width"
                    placeholder="Nombre mascota"
                    onChange={actualizarState}
                    value={pet}
                />

                <label>Dueño</label>
                <input
                    type="text"
                    name="owner"
                    className="u-full-width"
                    placeholder="Nombre dueño"
                    onChange={actualizarState}
                    value={owner}
                />

                <label>Fecha</label>
                <input
                    type="date"
                    name="date"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={date}
                />

                <label>Hora</label>
                <input
                    type="time"
                    name="time"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={time}
                />

                <label>Sintomas</label>
                <textarea
                    className="u-full-width"
                    name="symptoms"
                    onChange={actualizarState}
                    value={symptoms}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar cita</button>

            </form>
        </Fragment>
     );
}

//se recomienda usar proptype luego del codigo, antes del export
//es una forma de hacer type checking o documentar

Form.propTypes = {
    crearCita: PropTypes.func.isRequired
}
 
export default Form;