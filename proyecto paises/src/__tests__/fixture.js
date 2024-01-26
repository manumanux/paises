export default `<div class="container">
<div class="row">
<P>Mostrando <strong id="cantidad-paises">...</strong> paises</P>
</div>
<div class="input-group mb-3">
<div class="input-group-prepend">
  <button class="btn btn-outline-secondary" type="button" id="boton-buscar">Buscar</button>
</div>
<input type="text" id="buscar" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1">
</div>
<div class="row">
<div class="col-4">
<div class="list-group" id="indice">
<P>Cargando...</P>
            <!-- -->
</div>
</div>
<div class="col" id="pais">

    <div id="ayuda">
        <p>Seleccioná un país para ver su información</p>
    </div>

<div class="card">

    <img class="card-img-top" id="banderaPais-imagen">
    <div class="card-body"> 
    <h5 class="card-title" id="pais-nombre"></h5>
            <p class="card-text" id="banderaPais-descripcion">...</p>
            </div><ul class="list-group list-group-flush" id="caracteristicas-paises">
                    </ul>

    </div>
</div>
</div>
</div>`
