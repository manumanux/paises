/**
 * @jest-environment jsdom
 */

import { activarBarraBuscadora } from '../barraBuscar.js'
import * as moduloServicios from '../../servicios/pais.js'
import * as moduloUi from '../../ui/pais.js'
import * as moduloValidaciones from '../validacionesBarraBuscar.js'
import * as moduloAutoFill from '../autoFill.js'

jest.mock('../autoFill.js', () => ({
    actualizarSugerencias: jest.fn().mockImplementation(() => true),
}))

describe('activarBarraBuscadora', () => {
    document.body.innerHTML = `
    <input id="buscar" type="text">
    <button id="boton-buscar">Buscar</button>
    <ul id="sugerencias" style="display:none;" >
  `
    const barraBuscadora = document.querySelector('#buscar')
    barraBuscadora.value = 'paisTest'

    const botonBuscar = document.querySelector('#boton-buscar')

    const espiaCargarPais = jest.spyOn(moduloServicios, 'cargarPais')

    const espiaMostrarPais = jest.spyOn(moduloUi, 'mostrarPais')
    espiaMostrarPais.mockResolvedValue('')

    const espiaValidaciones = jest.spyOn(moduloValidaciones, 'validarFormulario')
    espiaValidaciones.mockImplementation(() => '')

    activarBarraBuscadora()

    it('Deberia llamar a cargarPais y mostrarPais cuando se hace click al boton buscar', async () => {
        const mockPaisData = { name: 'paisTest' }

        espiaCargarPais.mockResolvedValue(mockPaisData)

        botonBuscar.click()
        await Promise.resolve()
        expect(espiaCargarPais).toHaveBeenCalledWith('paisTest')
        expect(espiaMostrarPais).toHaveBeenCalledWith(mockPaisData)
        espiaCargarPais.mockClear()

    })
    it('Deberia buscar un pais si se presiona la tecla enter', async () => {
        const presionarBotonEnter = new KeyboardEvent('keydown', { keyCode: 13 })
        barraBuscadora.dispatchEvent(presionarBotonEnter)
        await Promise.resolve()

        expect(espiaCargarPais).toHaveBeenCalledWith('paisTest')
    })

    it('Deberia dar error si cargarPais falla', async () => {
        const mockError = new Error('Test error')

        espiaCargarPais.mockRejectedValue(mockError)

        botonBuscar.click()

        await Promise.resolve()

        expect(espiaCargarPais).toHaveBeenCalledWith('paisTest')
        expect(espiaMostrarPais).not.toHaveBeenCalled()
    })

    it('Deberia dar error si validarFormulario falla', async () => {
        espiaValidaciones.mockImplementation(() => 'error')

        botonBuscar.click()

        await Promise.resolve()

        expect(espiaCargarPais).not.toHaveBeenCalled()
    })
    it('deberia llamar a actualizarSugerencias cuando se coloca una letra en la barra buscadora', async () => {
        const barraBuscadora = document.querySelector('#buscar')
        barraBuscadora.value = 'e'

        const espiaActualizarSugerencias = jest.spyOn(
            moduloAutoFill,
            'actualizarSugerencias'
        )

        const inputEvent = new Event('input')
        barraBuscadora.dispatchEvent(inputEvent)

        expect(espiaActualizarSugerencias).toHaveBeenCalledWith('e')
    })

    it('no deberia cargar pais caundo la barra buscadora esta vacia y se presiona enter', async () => {
        const barraBuscadora = document.querySelector('#buscar')
        barraBuscadora.value = ''
        document.querySelector('#sugerencias').style.display = "block"

        const presionarBotonEnter = new KeyboardEvent('keydown', { keyCode: 13 })
        barraBuscadora.dispatchEvent(presionarBotonEnter)
        await Promise.resolve()

        expect(espiaCargarPais).not.toHaveBeenCalled()
    })
}
)
