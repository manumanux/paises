import paises from './listaPaisesTotal.js'

const listaPaisesEnMinuscula = paises.map((pais) => {
    return pais.toLowerCase()
})

function validarPais(pais) {
    pais = pais.toLowerCase()

    if (!listaPaisesEnMinuscula.includes(pais)) {
        return 'El pais ingresado no existe'
    }

    return ''
}

export function validarFormulario() {
    const pais = document.querySelector('#buscar').value
    const errorPais = validarPais(pais)

    if (errorPais) {
        document.getElementById('buscar').classList.add('is-invalid')
        document.getElementById('errorMensaje').textContent = errorPais
    } else {
        document.getElementById('buscar').classList.remove('is-invalid')
        document.getElementById('errorMensaje').textContent = ''
    }
    return errorPais
}
