import {
    cargarPais as cargarPaisDeApi,
    cargarPaises as cargarPaisesDeApi,
} from '../api/pais.js'

import {
    cargarPais as cargarPaisDeLocalStorage,
    guardarPais,
    cargarPaises as cargarPaisesDeLocalStorage,
    guardarPaises,
} from '../storage/pais.js'

import { mapearPais, mapearPaises } from '../mapeadores/pais.js'

export async function cargarPais(id) {
    if (id === undefined) {
        throw new Error('Se necesita un identificador para cargar un pais')
    }
    let pais
    try {
        const paisDeLocalStorage = cargarPaisDeLocalStorage(id)
        return paisDeLocalStorage
    } catch (e) {
        const paisDeApi = await cargarPaisDeApi(id)
        pais = await mapearPais(paisDeApi[0])
        guardarPais(id, pais)
        return pais
    }
}

export async function cargarPaises() {
    try {
        return cargarPaisesDeLocalStorage()
    } catch (e) {
        const paisesData = await cargarPaisesDeApi()
        const paises = mapearPaises(paisesData)
        guardarPaises(paises)
        return paises
    }
}
