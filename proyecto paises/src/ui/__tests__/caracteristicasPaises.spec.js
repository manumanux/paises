/**
 * @jest-environment jsdom
 */

import {
    crearCaracteristicaPais,
    mostrarCotaDeArmas,
} from '../caracteristicasPaises.js'

const $contenedorCaracteristicasPais = document.createElement('ul')
$contenedorCaracteristicasPais.id = 'caracteristicas-paises'
const $test = document.createElement('div')
$test.id = 'pais-nombre'
document.body.appendChild($test)

beforeEach(() => {
    document.body.appendChild($contenedorCaracteristicasPais)
})

afterEach(() => {
    $contenedorCaracteristicasPais.innerHTML = ''
})

describe('crearCaracteristicaPais', () => {
    test('deberia crear una sola caracteristica correctamente', () => {
        crearCaracteristicaPais('test')
        const $caracteristicasPais =
            $contenedorCaracteristicasPais.querySelectorAll('li')
        expect($caracteristicasPais.length).toBe(1)
        expect($caracteristicasPais[0].textContent).toBe('test')
    })
})

describe('mostrarCotaDeArmas', () => {
    test('deberia mostrar una caracteristica cota de armas con su link', () => {
        mostrarCotaDeArmas('test', 'https://test.com/test')
        const $link = $contenedorCaracteristicasPais.querySelector('a')
        expect($link.textContent).toBe('test')
        expect($link.href).toBe('https://test.com/test')
    })

    test('No deberia mostrar una caracteristica cota de armas si el link esta vacio', () => {
        mostrarCotaDeArmas('test', [])
        const $link = $contenedorCaracteristicasPais.querySelector('a')
        expect($link.textContent).toEqual('No tiene')
    })
})
