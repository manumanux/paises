import { mostrarPais } from './pais.js'
import { cargarPais } from '../servicios/pais.js'

export async function mostrarListadoPaises(paises) {
    const $indice = document.querySelector('#indice')
    $indice.innerHTML = ''

    paises.forEach((nombrePais) => {
        const $link = document.createElement('a')
        $link.className = 'list-group-item list-group-item-action'
        $link.textContent = nombrePais
        $link.addEventListener('click', async () => {
            mostrarPais(await cargarPais(nombrePais))
        })

        $indice.appendChild($link)
    })
}
