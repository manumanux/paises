import { actualizarTextoAyuda } from './general.js'
import {
    crearCaracteristicaPais,
    mostrarCotaDeArmas,
} from './caracteristicasPaises.js'

export async function mostrarPais(pais) {
    const {
        nombre,
        moneda,
        banderaImagen,
        descripcionBandera,
        habitantes,
        capital,
        independente,
        zonaHoraria,
        lenguajes,
        cotaDeArmas,
    } = pais
    const $caracteristicas = document.querySelector('#caracteristicas-paises')
    $caracteristicas.innerHTML = ''

    actualizarTextoAyuda('')

    document.querySelector('#pais-nombre').textContent = nombre

    crearCaracteristicaPais(`Capital: ${capital}`)
    crearCaracteristicaPais(`Moneda: ${moneda}`)
    crearCaracteristicaPais(`Habitantes: ${habitantes}`)
    crearCaracteristicaPais(`Independente: ${independente}`)
    crearCaracteristicaPais(`Zona horaria: ${zonaHoraria}`)
    crearCaracteristicaPais(`Lenguajes: ${lenguajes.join(', ')}`)

    mostrarCotaDeArmas('Cota de armas', cotaDeArmas)
    const $Banderaimagen = document.querySelector('#banderaPais-imagen')
    $Banderaimagen.setAttribute('src', banderaImagen)

    document.querySelector('#banderaPais-descripcion').textContent =
        descripcionBandera
}
