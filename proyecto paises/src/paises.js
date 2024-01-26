import { cargarPaises } from './servicios/pais.js'
import { mostrarCantidadDePaises } from './ui/general.js'
import { mostrarListadoPaises } from './ui/listadoPaises.js'
import { activarBarraBuscadora } from './barraBuscadora/barraBuscar.js'

export default async function iniciar() {
    const paises = await cargarPaises()

    mostrarCantidadDePaises(paises.length)
    mostrarListadoPaises(paises)
    activarBarraBuscadora()
}