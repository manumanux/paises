/**
 * @jest-environment jsdom
 */

import { actualizarTextoAyuda, mostrarCantidadDePaises } from '../general.js'

test('actualiza el texto de ayuda', () => {
    document.body.innerHTML = '<div id="ayuda"></div>'
    actualizarTextoAyuda('test')
    expect(document.querySelector('#ayuda').textContent).toContain('test')
})

test('actualiza el total de pokemones', () => {
    document.body.innerHTML = '<div id="cantidad-paises"></div>'
    mostrarCantidadDePaises(50)
    expect(document.querySelector('#cantidad-paises').textContent).toContain('50')
})
