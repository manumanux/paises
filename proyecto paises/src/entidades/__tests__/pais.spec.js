import { Pais } from '../pais'

describe('Pais', () => {
    it('deberia crear un objeto Pais', () => {
        const pais = new Pais(
            'pais ejemplo',
            ['moneda'],
            'bandera.jpg',
            ['descripcion bandera'],
            1000000,
            'capital',
            true,
            'zona horaria',
            ['lenguaje'],
            ['cota de armas']
        )

        expect(pais.nombre).toBe('pais ejemplo')
        expect(pais.moneda).toEqual(['moneda'])
        expect(pais.banderaImagen).toBe('bandera.jpg')
        expect(pais.descripcionBandera).toEqual(['descripcion bandera'])
        expect(pais.habitantes).toBe(1000000)
        expect(pais.capital).toBe('capital')
        expect(pais.independente).toBe(true)
        expect(pais.zonaHoraria).toBe('zona horaria')
        expect(pais.lenguajes).toEqual(['lenguaje'])
        expect(pais.cotaDeArmas).toEqual(['cota de armas'])
    })
})
