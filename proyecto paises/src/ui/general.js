export function actualizarTextoAyuda(texto) {
    const $ayuda = document.querySelector('#ayuda')
    $ayuda.textContent = texto
}

export function mostrarCantidadDePaises(cantidadPaises) {
    document.querySelector('#cantidad-paises').textContent = cantidadPaises
}
