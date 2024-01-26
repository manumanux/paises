import paises from './listaPaisesTotal.js';

export function actualizarSugerencias(inputUsuario) {
    const inputBuscar = document.getElementById('buscar');
    const $listaSugerencias = document.getElementById('sugerencias');
    $listaSugerencias.innerHTML = '';

    let sugerenciasFiltradas = paises.filter((pais) =>
        pais.toLowerCase().includes(inputUsuario)
    );

    if (inputUsuario.length === 0 || sugerenciasFiltradas.length === 0) {
        $listaSugerencias.style.display = 'none';
        return;
    }

    if (sugerenciasFiltradas.length > 0) {
        $listaSugerencias.style.display = 'block';

        sugerenciasFiltradas.forEach((sugerencia, index) => {
            if (document.querySelectorAll('.dropdown-item').length < 3) {
                const $itemSugerencia = document.createElement('a');
                $itemSugerencia.classList.add('dropdown-item');

                $itemSugerencia.textContent = sugerencia;

                $listaSugerencias.appendChild($itemSugerencia);

                $itemSugerencia.addEventListener('click', () => {
                    inputBuscar.value = sugerencia;
                    $listaSugerencias.style.display = 'none';
                });
            }
        });
        let indexSeleccionado = -1;

        inputBuscar.addEventListener('keydown', (event) => {
            const sugerenciasLength =
                document.querySelectorAll('.dropdown-item').length;

            if (event.key === 'ArrowUp') {
                if (indexSeleccionado === 0) {
                    indexSeleccionado = sugerenciasLength;
                }
                event.preventDefault();
                indexSeleccionado = Math.max(0, indexSeleccionado - 1);

                seleccionarSugerencia();
            } else if (event.key === 'ArrowDown') {
                if (indexSeleccionado === sugerenciasLength - 1) {
                    indexSeleccionado = -1;
                }
                event.preventDefault();
                indexSeleccionado = Math.min(
                    indexSeleccionado + 1,
                    sugerenciasLength - 1
                );

                seleccionarSugerencia();
            } else if (event.key === 'Enter') {
                event.preventDefault();

                if (indexSeleccionado !== -1) {
                    inputBuscar.value = sugerenciasFiltradas[indexSeleccionado];
                    $listaSugerencias.style.display = 'none';
                }
            }
        });

        function seleccionarSugerencia() {
            const $sugerencias = $listaSugerencias.querySelectorAll('.dropdown-item');

            $sugerencias.forEach(($suggestion, index) => {
                $suggestion.classList.toggle('highlighted', index === indexSeleccionado);
            });
        }
    }
}
