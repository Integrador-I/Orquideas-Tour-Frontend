import React, { useEffect } from 'react';

export const CrudUsers = () => {
  useEffect(() => {
    const filas = document.querySelectorAll("tbody tr");
    filas.forEach((fila, index) => {
      const id = String(index + 1).padStart(3, "0");
      const th = fila.querySelector('th[scope="row"]');
      if (th) th.textContent = id;
    });
  }, []);

  return (
    <>
      <section className=" p-3 sm:p-5 antialiased ">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">Buscar</label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Buscar Usuario" required />
                  </div>
                </form>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row items-stretch justify-end md:space-x-3">
                <button type="button" onClick={() => document.getElementById('modal-create').classList.remove('hidden')} className="flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">
                  <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Añadir Usuario
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-4 w-20 truncate">ID</th>
                    <th scope="col" className="px-4 py-3">Nombre</th>
                    <th scope="col" className="px-4 py-3">Apellido</th>
                    <th scope="col" className="px-4 py-3">Correo</th>
                    <th scope="col" className="px-4 py-3">Telefono</th>
                    <th scope="col" className="px-4 py-3">Contraseña</th>
                    <th scope="col" className="px-4 py-3">
                      <span className="sr-only">Acción</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"></th>
                    <td className="px-4 py-3">Arnold</td>
                    <td className="px-4 py-3">Juarez</td>
                    <td className="px-4 py-3">arnoljuarez027@gmail.com</td>
                    <td className="px-4 py-3">920790454</td>
                    <td className="px-4 py-3">12345</td>
                    <td className="px-4 py-3 flex items-center justify-end gap-2">
                      <button onClick={() => document.getElementById('modal-edit').classList.remove('hidden')} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-600">Editar</button>
                      <button onClick={() => document.getElementById('modal-delete').classList.remove('hidden')} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600">Eliminar</button>
                    </td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"></th>
                    <td className="px-4 py-3">Arnold</td>
                    <td className="px-4 py-3">Juarez</td>
                    <td className="px-4 py-3">arnoljuarez027@gmail.com</td>
                    <td className="px-4 py-3">920790454</td>
                    <td className="px-4 py-3">12345</td>
                    <td className="px-4 py-3 flex items-center justify-end gap-2">
                      <button onClick={() => document.getElementById('modal-edit').classList.remove('hidden')} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-600">Editar</button>
                      <button onClick={() => document.getElementById('modal-delete').classList.remove('hidden')} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600">Eliminar</button>
                    </td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"></th>
                    <td className="px-4 py-3">Arnold</td>
                    <td className="px-4 py-3">Juarez</td>
                    <td className="px-4 py-3">arnoljuarez027@gmail.com</td>
                    <td className="px-4 py-3">920790454</td>
                    <td className="px-4 py-3">12345</td>
                    <td className="px-4 py-3 flex items-center justify-end gap-2">
                      <button onClick={() => document.getElementById('modal-edit').classList.remove('hidden')} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-600">Editar</button>
                      <button onClick={() => document.getElementById('modal-delete').classList.remove('hidden')} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600">Eliminar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Crear Usuario */}
      <div id="modal-create" className="hidden fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <h2 className="text-lg font-bold mb-4">Crear Usuario</h2>
          <form className="grid gap-4">
            <input type="text" placeholder="Nombre" className="border border-gray-300 rounded px-4 py-2" />
            <input type="text" placeholder="Apellido" className="border border-gray-300 rounded px-4 py-2" />
            <input type="email" placeholder="Correo" className="border border-gray-300 rounded px-4 py-2" />
            <input type="password" placeholder="Contraseña" className="border border-gray-300 rounded px-4 py-2" />
            <div className="flex justify-end gap-2">
              <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => document.getElementById('modal-create').classList.add('hidden')}>Cancelar</button>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Guardar</button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal Editar Usuario */}
      <div id="modal-edit" className="hidden fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <h2 className="text-lg font-bold mb-4">Editar Usuario</h2>
          <form className="grid gap-4">
            <input type="text" placeholder="Nombre" className="border border-gray-300 rounded px-4 py-2" />
            <input type="text" placeholder="Apellido" className="border border-gray-300 rounded px-4 py-2" />
            <input type="email" placeholder="Correo" className="border border-gray-300 rounded px-4 py-2" />
            <input type="text" placeholder="Telefono" className="border border-gray-300 rounded px-4 py-2" />
            <input type="password" placeholder="Contraseña" className="border border-gray-300 rounded px-4 py-2" />
            <div className="flex justify-end gap-2">
              <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => document.getElementById('modal-edit').classList.add('hidden')}>Cancelar</button>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Actualizar</button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal Eliminar Usuario */}
      <div id="modal-delete" className="hidden fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-96 text-center">
          <h2 className="text-lg font-bold mb-4">¿Eliminar Usuario?</h2>
          <p className="mb-4">¿Estás seguro que deseas eliminar este usuario?</p>
          <div className="flex justify-center gap-2">
            <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => document.getElementById('modal-delete').classList.add('hidden')}>Cancelar</button>
            <button className="bg-red-600 text-white px-4 py-2 rounded">Eliminar</button>
          </div>
        </div>
      </div>
    </>
  );
};
