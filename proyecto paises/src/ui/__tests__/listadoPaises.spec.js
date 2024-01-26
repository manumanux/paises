/**
 * @jest-environment jsdom
 */

import { mostrarListadoPaises } from '../listadoPaises'
import { cargarPais } from '../../servicios/pais.js'

jest.mock('../pais.js', () => ({
    mostrarPais: jest.fn(),
}))
jest.mock('../../servicios/pais.js', () => ({
    cargarPais: jest.fn(),
}))

describe('mostrarListadoPaises', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="indice"></div>`
    })

    afterEach(() => {
        jest.clearAllMocks()
    })
    test('muestra un listado de paises', async () => {
        mostrarListadoPaises(['Caribbean Netherlands', 'China'])
        const paises = document.querySelectorAll('.list-group-item')
        expect(paises[0].textContent).toBe('Caribbean Netherlands')
    })
    test('deberia llamar a cargarPais cuando se da click a un pais del listado', async () => {
        mostrarListadoPaises(['Caribbean Netherlands', 'China'])
        const paises = document.querySelectorAll('.list-group-item')
        await paises[0].click()
        expect(cargarPais).toHaveBeenCalledWith('Caribbean Netherlands')
    })
})
