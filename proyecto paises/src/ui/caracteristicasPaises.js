export function crearCaracteristicaPais(texto) {
    const $caracteristicasPais = document.querySelector('#caracteristicas-paises')
    const $caracteristica = document.createElement('li')
    $caracteristica.className = 'list-group-item'
    if (texto.length > 100) {
        $caracteristica.textContent = texto.slice(0, 100) + '...'
    } else {
        $caracteristica.textContent = texto;
    }
    $caracteristicasPais.appendChild($caracteristica)
}

export function mostrarCotaDeArmas(texto, link) {
    const $caracteristicasPais = document.querySelector('#caracteristicas-paises')

    const $contenedorDeLink = document.createElement('li')
    $contenedorDeLink.textContent = 'Cota de Armas: '
    $contenedorDeLink.className = 'list-unstyled'
    $contenedorDeLink.className = 'list-group-item'

    const $Link = document.createElement('a')
    if (link.length === 0) {
        $Link.textContent = "No tiene"

    }
    else {
        $Link.className = 'link'
        $Link.textContent = texto
        $Link.href = link

    }


    $contenedorDeLink.appendChild($Link)
    $caracteristicasPais.appendChild($contenedorDeLink)
}
