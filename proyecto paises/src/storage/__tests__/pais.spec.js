/**
 * @jest-environment jsdom
 */

import {
    guardarPais,
    cargarPais,
    guardarPaises,
    cargarPaises,
} from '../pais.js'

const localStorageMock = (() => {
    let store = {}

    return {
        getItem: (key) => store[key],
        setItem: (key, value) => {
            store[key] = value.toString()
        },
        removeItem: (key) => {
            delete store[key]
        },
        clear: () => {
            store = {}
        },
    }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('guardarPais y cargarPais', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it('Debe guardar un pais en localStorage', () => {
        const pais = { name: 'Argentina', capital: 'Buenos Aires' }
        guardarPais(1, pais)

        const paisGuardado = JSON.parse(localStorage.getItem('pais_1'))
        expect(paisGuardado).toEqual(pais)
    })

    it('Debe guardar otro pais en localStorage y cargarlo usando guardarPais', () => {
        const pais = { name: 'Peru', capital: 'Lima' }
        guardarPais(2, pais)
        expect(cargarPais(2)).toEqual(pais)
    })
    it('Debe cargar un pais guardado en localStorage', () => {
        const pais = { name: 'Rusia', capital: 'Moscov' }
        localStorage.setItem('pais_3', JSON.stringify(pais))
        expect(cargarPais(3)).toEqual(pais)
    })
    it('cargarPais Debe tirar error si el id es undefined', () => {
        const idIndefinido = undefined

        expect(() => {
            cargarPais(idIndefinido)
        }).toThrow('Se necesita un identificador para cargar un pais')
    })
    it('guardarPais Debe tirar error si el id es undefined', () => {
        const idIndefinido = undefined
        const pais = { name: 'Brasil', type: 'Brasilia' }

        expect(() => {
            guardarPais(idIndefinido, pais)
        }).toThrow(
            'Se necesita un identificador y un pais para guardar en localStorage'
        )
    })

    it('tiene que tirar error si el pais no es un objeto', () => {
        const idValido = 2
        const paisIncorrecto = 'No soy un objeto'
        expect(() => {
            guardarPais(idValido, paisIncorrecto)
        }).toThrow(
            'Se necesita un identificador y un pais para guardar en localStorage'
        )
    })
    it('cargarPais tiene que tirar error si el pais es null', () => {
        const originalGetItem = localStorageMock.getItem

        localStorageMock.getItem = jest.fn().mockReturnValueOnce(null)
        expect(() => cargarPais('pais_test')).toThrow(
            'Pais con id pais_test no encontrado'
        )

        localStorageMock.getItem = originalGetItem
    })
})

describe('guardarPaises y cargarPaises', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it('Debe guardar y cargar paises en localStorage', () => {
        const Paises = {
            argentina: { name: 'Argentina', capital: 'Buenos Aires' },
            peru: { name: 'Peru', type: 'Lima' },
            brasil: { name: 'Brasil', type: 'Brasilia' },
        }
        guardarPaises(Paises)
        expect(cargarPaises()).toEqual(Paises)
    })

    it('Debe tirar error si se usan argumentos no válidos', () => {
        localStorageMock.getItem = jest.fn().mockReturnValueOnce(null)
        expect(() => guardarPaises()).toThrow('Se necesitan paises')
        expect(() => cargarPaises()).toThrow('Listado de paises no encontrado')
    })
})
