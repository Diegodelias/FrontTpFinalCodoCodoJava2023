let oradores = document.getElementById('mostrando');


//let salvar = document.getElementById('salvar') ;
let idEdit = document.getElementById('idEdit');
let nombreModal = document.getElementById('nombreModal');
let apellidoModal = document.getElementById('apellidoModal');
let emailModal = document.getElementById('emailModal');
let temaModal = document.getElementById('temaModal');
let id;



//salvar.addEventListener('click', update);


function fetchData() {
  fetch('http://localhost:8080/web-app/api/orador')
    .then(response => {
      if (!response.ok) {
        throw new Error('Respuesta de red fallo');
      }
      return response.json();
    })
    .then(data => {

      const datosRecibidos = data;



      //  total.innerText = datosRecibidos.length;


      const tableBody = document.getElementById('tableBody');


      datosRecibidos.forEach((item, index) => {

        const row = document.createElement('tr');


        row.setAttribute('id', `${item.id}`);


        row.innerHTML = `
                <td>
                <span class="custom-checkbox">
                    <input type="checkbox" id="checkbox${item.id}" name="options[]" value="${item.id}">
                    <label for="checkbox${item.id}"></label>
                </span>
            </td>
            <td>${item.nombre}</td>
            <td>${item.apellido}</td>
            <td>${item.mail}</td>
            <td>${item.tema}</td>
            <td>url</td> <!-- Replace 'url' with the actual URL -->
            <td>
                <a href="#editEmployeeModal" class="edit" data-toggle="modal" "><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
            </td>
            
                `;

        row.querySelector('.edit').addEventListener('click', () => {
    
          editRow(item.id);
          idEdit.value = item.id
          nombreModal.value = item.nombre
          apellidoModal.value = item.apellido
          emailModal.value = item.mail
          temaModal.value = item.tema

        });

        row.querySelector('.delete').addEventListener('click', () => {
       
          editRow(item.id);
          idEdit.value = item.id

        });

    

        function editRow(itemId) {

          id = item.id;


        }



        tableBody.appendChild(row);
      });




    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);

    });
}


document.addEventListener('DOMContentLoaded', () => {
  const salvarButton = document.getElementById('salvar');
  const borrarButton = document.getElementById('borrar');

  salvarButton.addEventListener('click', async () => {
    const id = document.getElementById('idEdit').value;

    const nombre = document.getElementById('nombreModal').value;
    const apellido = document.getElementById('apellidoModal').value;
    const email = document.getElementById('emailModal').value;
    const tema = document.getElementById('temaModal').value;

    const dataToUpdate = {
      nombre: nombre,
      apellido: apellido,
      mail: email,
      tema: tema

    };
    console.log(dataToUpdate);


    const url = `http://localhost:8080/web-app/api/orador?id=${id}`;

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToUpdate)
    };

  
    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json().then(data => ({
          data: data,
          status: response.status
        }));
      })
      .then(({ data, status }) => {
        if (status === 204) {
        
          console.log('No content returned from server.');

        } else {
          console.log('Data actualizada:', data);
        
        }
      })
      .catch(error => {
        console.error('Error actualizando data:', error);
      });



  });



  //eliminar orador

  borrarButton.addEventListener('click', async () => {
    const id = document.getElementById('idEdit').value;

    const nombre = document.getElementById('nombreModal').value;
    const apellido = document.getElementById('apellidoModal').value;
    const email = document.getElementById('emailModal').value;
    const tema = document.getElementById('temaModal').value;

    const dataToUpdate = {
      nombre: nombre,
      apellido: apellido,
      mail: email,
      tema: tema

    };
    console.log(dataToUpdate);


    const url = `http://localhost:8080/web-app/api/orador?id=${id}`;

    const options = {
      method: 'DELETE',
      // headers: {
      //   'Content-Type': 'application/json'
      // },
      // body: JSON.stringify(dataToUpdate)
    };

  
    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json().then(data => ({
          data: data,
          status: response.status
        }));
      })
      .then(({ data, status }) => {
        if (status === 204) {
  
          console.log('No hubo respuesta desde el server.');
     
        } else {
          console.log('Data actualizada:', data);
      
        }
      })
      .catch(error => {
        console.error('Error actualizando data:', error);
      });



  });



});





window.onload = function () {
  fetchData();
};