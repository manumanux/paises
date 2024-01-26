/**
 * @jest-environment jsdom
 */

import { mostrarPais } from '../pais.js'

import * as funcionesCaracteristicasPaises from '../caracteristicasPaises.js'

const argentina = {
    nombre: 'Argentina',
    moneda: 'Argentine peso',
    banderaImagen: 'https://flagcdn.com/w320/ar.png',
    descripcionBandera:
        'The flag of Argentina features three equal horizontal bands of light blue, white and light blue. A brown-edged golden sun is centered in the white band.',
    habitantes: '45,376,763',
    capital: ['Buenos Aires'],
    independente: true,
    zonaHoraria: ['UTC-03:00'],
    lenguajes: ['Guaraní', 'Spanish'],
    cotaDeArmas: 'https://mainfacts.com/media/images/coats_of_arms/ar.png',
}

jest.mock('../general.js', () => ({
    actualizarTextoAyuda: jest.fn().mockImplementation(() => true),
}))

const mostrarCotaDeArmasSpy = jest
    .spyOn(funcionesCaracteristicasPaises, 'mostrarCotaDeArmas')
    .mockImplementation(() => true)

describe('mostrarPais', () => {
    beforeEach(() => {
        document.body.innerHTML = `
        <div id="caracteristicas-paises"></div>
        <div id="pais-nombre"></div>
        <div id="banderaPais-imagen"></div>
        <div id="banderaPais-descripcion"></div> `
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('Deberia crear un elemento DOM mostrando caracteristicas de un pais objeto.', () => {
        mostrarPais(argentina)

        const caracteristicas = document.querySelectorAll('.list-group-item')

        expect(document.querySelector('#pais-nombre').textContent).toBe('Argentina')
        expect(caracteristicas[0].textContent).toBe('Capital: Buenos Aires')
        expect(document.querySelectorAll('.list-group-item').length).toBe(6)
        expect(mostrarCotaDeArmasSpy).toHaveBeenCalledWith(
            'Cota de armas',
            'https://mainfacts.com/media/images/coats_of_arms/ar.png'
        )
        expect(
            document.getElementById('banderaPais-imagen').getAttribute('src')
        ).toBe('https://flagcdn.com/w320/ar.png')
        expect(document.querySelector('#banderaPais-descripcion').textContent).toBe(
            'The flag of Argentina features three equal horizontal bands of light blue, white and light blue. A brown-edged golden sun is centered in the white band.'
        )
    })
})
