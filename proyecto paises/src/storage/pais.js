function obtenerKeyPais(id) {
    return `pais_${id}`
}

export function cargarPais(id) {
    if (id === undefined) {
        throw new Error('Se necesita un identificador para cargar un pais')
    }

    const pais = JSON.parse(localStorage.getItem(obtenerKeyPais(id)))

    if (pais === null) {
        throw new Error(`Pais con id ${id} no encontrado`)
    }
    return pais
}

export function guardarPais(id, pais) {
    if (id === undefined || typeof pais !== 'object') {
        throw new Error(
            'Se necesita un identificador y un pais para guardar en localStorage'
        )
    }

    localStorage.setItem(obtenerKeyPais(id), JSON.stringify(pais))
}

export function guardarPaises(paises) {
    if (typeof paises !== 'object') {
        throw new Error('Se necesitan paises')
    }

    localStorage.setItem('paises_total', JSON.stringify(paises))
}

export function cargarPaises() {
    const paises = JSON.parse(localStorage.getItem('paises_total'))
    if (paises === null) {
        throw new Error('Listado de paises no encontrado')
    }

    return paises
}
