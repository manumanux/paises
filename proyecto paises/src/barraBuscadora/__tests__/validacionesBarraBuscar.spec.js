/**
 * @jest-environment jsdom
 */

import * as moduloValidaciones from '../validacionesBarraBuscar.js'

describe('validarFormulario', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <input id="buscar"/>
            <div class="error-message" id="errorMensaje"></div>`
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('validarFormulario deberia retornar vacio si hay un valor correcto en la barra buscadora', () => {
        const validarFormularioSpy = jest.spyOn(
            moduloValidaciones,
            'validarFormulario'
        )
        const inputBuscar = document.querySelector('#buscar')

        inputBuscar.value = 'argentina'
        expect(validarFormularioSpy()).toBe('')
    })

    test('validarFormulario deberia retornar el mensaje de error correctamente', () => {
        const validarFormularioSpy = jest.spyOn(
            moduloValidaciones,
            'validarFormulario'
        )

        const inputBuscar = document.querySelector('#buscar')
        inputBuscar.value = ''
        expect(validarFormularioSpy()).toBe('El pais ingresado no existe')
    })
})
