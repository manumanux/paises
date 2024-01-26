import { Pais } from '../entidades/pais.js'

export function mapearPais(datosApi) {
    const {
        name: { common: nombre },
        flags: { png: banderaImagen, alt: descripcionBandera },
        currencies: moneda,
        population: habitantes,
        capital,
        independent: independente,
        timezones: zonaHoraria,
        languages: lenguajes,
        coatOfArms: { png: cotaDeArmas },
    } = datosApi

    return new Pais(
        nombre,
        Object.values(moneda).map((item) => item.name)[0],
        banderaImagen,
        descripcionBandera,
        habitantes.toLocaleString(),
        capital,
        independente,
        zonaHoraria,
        Object.values(lenguajes),
        cotaDeArmas
    )
}

export function mapearPaises(datosApi) {
    const listaDePaises = []
    datosApi.forEach((pais) => {
        const { common: nombre } = pais.name
        listaDePaises.push(nombre)
    })

    return listaDePaises
}
