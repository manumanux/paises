import { cargarPais, cargarPaises } from '../pais.js'
import * as storagePaisModule from '../../storage/pais.js'
import * as mapearPaisModule from '../../mapeadores/pais.js'
import Fixture from '../../mapeadores/__tests__/argentina.json'
import fixturePaises from '../../mapeadores/__tests__/listaDePaises.json'
import * as paisApiModule from '../../api/pais.js'

afterEach(() => {
    jest.clearAllMocks()
})

it('cargarPais deberia funcionar correctamente sin pais guardado en localStorage', async () => {
    const cargarPaisDeApiSpy = jest.spyOn(paisApiModule, 'cargarPais')
    cargarPaisDeApiSpy.mockImplementation(() => Fixture)
    const mapearPaisSpy = jest.spyOn(mapearPaisModule, 'mapearPais')
    const paisMapeado = mapearPaisSpy(Fixture[0])
    const guardarPaisSpy = jest
        .spyOn(storagePaisModule, 'guardarPais')
        .mockImplementation(() => true)

    await cargarPais('Argentina')
    await expect(cargarPaisDeApiSpy).toHaveBeenCalledWith('Argentina')
    await expect(mapearPaisSpy).toHaveBeenCalledWith(Fixture[0])
    await expect(guardarPaisSpy).toHaveBeenCalledWith('Argentina', paisMapeado)
    await expect(await cargarPais('Argentina')).toEqual(paisMapeado)
})

it('cargarPais deberia funcionar correctamente si hay un pais guardado en localStorage', async () => {
    const cargarPaisSpy = jest
        .spyOn(storagePaisModule, 'cargarPais')
        .mockImplementation(() => true)
    const cargarPaisDeApiSpy = jest.spyOn(paisApiModule, 'cargarPais')

    await cargarPais('Peru')
    await expect(cargarPaisDeApiSpy).not.toHaveBeenCalled()
    await expect(cargarPaisSpy).toHaveBeenCalledWith('Peru')
})

it('cargarPais deberia tirar error si el id es undefined', async () => {
    await expect(cargarPais(undefined)).rejects.toThrow(
        'Se necesita un identificador para cargar un pais'
    )
})

it('cargarPaises deberia funcionar correctamente sin pais guardado en localStorage', async () => {
    const cargarPaisesDeApiSpy = jest.spyOn(paisApiModule, 'cargarPaises')
    cargarPaisesDeApiSpy.mockImplementation(() => fixturePaises)
    const mapearPaisesSpy = jest.spyOn(mapearPaisModule, 'mapearPaises')
    const paisesMapeados = mapearPaisesSpy(fixturePaises)
    const guardarPaisesSpy = jest
        .spyOn(storagePaisModule, 'guardarPaises')
        .mockImplementation(() => true)

    await cargarPaises()
    await expect(cargarPaisesDeApiSpy).toHaveBeenCalled()
    await expect(mapearPaisesSpy).toHaveBeenCalledWith(fixturePaises)
    await expect(guardarPaisesSpy).toHaveBeenCalledWith(paisesMapeados)
    await expect(await cargarPaises()).toEqual(paisesMapeados)
})

it('cargarPais deberia funcionar correctamente si hay un pais guardado en localStorage', async () => {
    const cargarPaisesSpy = jest
        .spyOn(storagePaisModule, 'cargarPaises')
        .mockImplementation(() => true)
    const cargarPaisesDeApiSpy = jest.spyOn(paisApiModule, 'cargarPaises')

    await cargarPaises()
    await expect(cargarPaisesDeApiSpy).not.toHaveBeenCalled()
    await expect(cargarPaisesSpy).toHaveBeenCalled()
})
