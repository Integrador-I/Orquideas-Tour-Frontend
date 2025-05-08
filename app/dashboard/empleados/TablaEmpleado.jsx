import { useState } from 'react';
import './css.css';

function TablaNombres() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [numero, setNumero] = useState('');
  const [contraseña, setContrasenia] = useState('');
  const [datos, setDatos] = useState([
    { nombre: 'Juan', apellido: 'Pérez', correo: '123456789',numero:'1292911292',contraseña:'abc' },
    { nombre: 'María', apellido: 'Gómez', correo: '987654321',numero:'1292911292',contraseña:'abc' },
    { nombre: 'Pedro', apellido: 'López', correo: '456789123',numero:'1292911292',contraseña:'abc' },
  ]);

  const agregarFila = (event) => {

    event.preventDefault();
    if (nombre.trim() && apellido.trim() && correo.trim()&& numero.trim()&& contraseña.trim()) {                //si los datos no estan vacios, entonces todo se añade a datos
      setDatos([...datos, { nombre, apellido,correo,numero,contraseña }]); 
      setNombre('');
      setApellido('');
      setCorreo('');
      setNumero('');
      setContrasenia('');
    }
  };



  //TRABAJAREMOS CON EDICION
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  
  const abrirEdicion = (index) => {
    const persona = datos[index];
    console.log("Editando persona:", persona); // 👈 este log te mostrará si el índice es correcto
    setIndiceAEditar(index);
    setEditNombre(persona.nombre);
    setEditApellido(persona.apellido);
    setEditCorreo(persona.correo);  
    setEditNumero(persona.numero);
    setEditContraseña(persona.contraseña);
    setMostrarModalEdicion(true);
  };

  const cerrarEdicion = () => {
    setMostrarModalEdicion(false);
  };

  //TRABAREMOS CON ELIMINAR
  const [mostrarModalEliminar, setMostrarModalEliminar]= useState(false);
  
  const abrirBorrar = (index) => {
    setIndiceAEliminar(index);
    setMostrarModalEliminar(true);
  };

  const cerrarBorrar = () => {
    setMostrarModalEliminar(false);
  };


  //ELIMINAR FILA
  const eliminarFila = (indexAEliminar) => {
    const nuevosDatos = datos.filter((_, i) => i !== indexAEliminar);
    setDatos(nuevosDatos);
    cerrarBorrar(); // cerrar modal si lo deseas
  };

  const [indiceAEliminar, setIndiceAEliminar] = useState(null);

  //VISIBILIDAD DE LA CONTRASEÑA
  const [visibilidadPassword, setVisibilidadPassword] = useState({});
  const toggleVisibilidadPassword = (index) => {
    setVisibilidadPassword((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  //EDICION DE FILA
  const [indiceAEditar, setIndiceAEditar] = useState(null);
  const [editNombre, setEditNombre] = useState('');
  const [editApellido, setEditApellido] = useState('');
  const [editCorreo, setEditCorreo] = useState('');
  const [editNumero, setEditNumero] = useState('');
  const [editContraseña, setEditContraseña] = useState('');


  const guardarEdicion = (e) => {
    e.preventDefault();
    const nuevosDatos = [...datos];
    nuevosDatos[indiceAEditar] = {
      nombre: editNombre,
      apellido: editApellido,
      correo: editCorreo,
      numero: editNumero,
      contraseña: editContraseña
    };
    setDatos(nuevosDatos);
    setMostrarModalEdicion(false);
    setIndiceAEditar(null);
  };



  return (
    <>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">Añadir persona</h2>
        
        <form className="mb-4 flex gap-2">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Numero"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContrasenia(e.target.value)}
            className="border p-2 rounded"
          />

          <button
            onClick={agregarFila}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Agregar
          </button>
        </form>

        <table className="table-auto border w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Apellido</th>
              <th className="border px-4 py-2">Correo</th>
              <th className="border px-4 py-2">Numero</th>
              <th className="border px-4 py-2">Contraseña</th>
              <th className="border px-4 py-2 w-50">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {datos.map((persona, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{persona.nombre}</td>
                <td className="border px-4 py-2">{persona.apellido}</td>
                <td className="border px-4 py-2">{persona.correo}</td>
                <td className="border px-4 py-2">{persona.numero}</td>

                <td className="border px-4 py-2 flex items-center gap-2">
                  {visibilidadPassword[index]
                    ? persona.contraseña
                    : '*'.repeat(persona.contraseña.length)}
                  <button onClick={() => toggleVisibilidadPassword(index)}>
                    {visibilidadPassword[index] ? '🙈' : '👁'}
                  </button>
                </td>


                <td className="border px-4 py-2">
                <button
                  onClick={() => abrirEdicion(index)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Editar
                </button>

                <button
                  onClick={() => abrirBorrar(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Eliminar
                </button>



                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

            
      


      {mostrarModalEdicion && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 relative">
            <h2 className="text-xl font-bold mb-4">Editar Persona</h2>
            <form className="flex flex-col gap-4" onSubmit={guardarEdicion}>
              <input type="text" placeholder="Nombre" className="border p-2 rounded" value={editNombre} onChange={(e) => setEditNombre(e.target.value)} />
              <input type="text" placeholder="Apellido" className="border p-2 rounded" value={editApellido} onChange={(e) => setEditApellido(e.target.value)} />
              <input type="text" placeholder="Correo" className="border p-2 rounded" value={editCorreo} onChange={(e) => setEditCorreo(e.target.value)} />
              <input type="text" placeholder="Numero" className="border p-2 rounded" value={editNumero} onChange={(e) => setEditNumero(e.target.value)} />
              <input type="text" placeholder="Contraseña" className="border p-2 rounded" value={editContraseña} onChange={(e) => setEditContraseña(e.target.value)} />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={cerrarEdicion} className="bg-red-500 text-white px-4 py-2 rounded">Cerrar</button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}



      {mostrarModalEliminar && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 relative">
            <h2 className="text-xl font-bold mb-4">Eliminar Persona</h2>
            <p>¿Estás seguro de que deseas eliminar esta persona?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={cerrarBorrar}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  eliminarFila(indiceAEliminar);
                  setIndiceAEliminar(null);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}

export default TablaNombres;


/*
<button
            onClick={abrirEdicion}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Editar
      </button>


      <button
            onClick={abrirBorrar}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Eliminar
      </button>
       */