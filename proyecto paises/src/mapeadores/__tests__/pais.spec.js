import { mapearPais, mapearPaises } from '../pais.js'
import Fixture from './argentina.json'
import fixtureListaPaises from './listaDePaises.json'

describe('mapearPais y mapearPaises', () => {
    it('mapearPais deberia iniciar las propiedades correctamente', () => {
        const paisMapeado = mapearPais(Fixture[0])
        expect(paisMapeado.nombre).toBe('Argentina')
    })
    it('mapearPaises deberia devolver un array con nombres de paises correctamente', () => {
        const paisesMapeados = mapearPaises(fixtureListaPaises)
        expect(paisesMapeados).toEqual(['Caribbean Netherlands', 'China'])
    })
})
