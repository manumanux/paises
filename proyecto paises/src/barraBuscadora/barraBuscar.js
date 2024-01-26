import { cargarPais } from '../servicios/pais.js'
import { mostrarPais } from '../ui/pais.js'
import { validarFormulario } from './validacionesBarraBuscar.js'
import { actualizarSugerencias } from './autoFill.js'

export function activarBarraBuscadora() {
    const barraBuscadora = document.querySelector('#buscar')
    const botonBuscar = document.querySelector('#boton-buscar')

    botonBuscar.addEventListener('click', async function () {
        try {
            if (validarFormulario()) {
                return
            }
            const pais = await cargarPais(barraBuscadora.value)
            await mostrarPais(pais)
        } catch (e) {
            console.log(e.message)
        }
    })
    // apretar enter es igual a hacer click al boton buscar
    barraBuscadora.addEventListener('keydown', function (event) {
        const sugerenciasBox = document.querySelector('#sugerencias')
        if (event.keyCode === 13 && sugerenciasBox.style.display === 'none') {
            botonBuscar.click()
        }
    })

    barraBuscadora.addEventListener('input', () => {
        const inputUsuario = barraBuscadora.value.trim().toLowerCase()
        actualizarSugerencias(inputUsuario)
    })
}
