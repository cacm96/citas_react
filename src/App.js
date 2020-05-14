import React, {Fragment, useState, useEffect} from 'react';
import Form from './components/Form';
import Cita from './components/Cita';

function App() {

  //citas en localstorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));

  if(!citasIniciales) {
    citasIniciales = [];
  }

  //Arreglo de citas
  const [citas, guardarCitas] =  useState(citasIniciales);


  //use effect para realizar ciertas operaciones cuando el state cambia
  //siempre es un arrow function
  //para decirle a use effect que se ejecute una vez hay que pasarle un arreglo vacio
  useEffect( () => {
    if(citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas, citasIniciales] ); //asi estará pendiente de los cambios que ocurran en el state de citas


  //funcion que tome las citas actuales y agregue la nueva
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ]);
  }

  //funcion que elimina cita
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);

    //nos crea un nuevo arreglo por lo que no es necesario ponerle corchetes
    guardarCitas(nuevasCitas);
  }


  //mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

  return (
    <Fragment>
      <h1>Administrador de citas</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Form 
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
