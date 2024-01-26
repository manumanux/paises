/**
 * @jest-environment jsdom
 */

import { actualizarSugerencias } from "../autoFill.js";

const cuerpoDelDocumento = `
    <input id="buscar" type="text">
    <button id="boton-buscar">Buscar</button>
    <ul
    id="sugerencias"
  ></ul>
    `;

describe("test", () => {
    beforeEach(() => {
        document.body.innerHTML = cuerpoDelDocumento;
    });

    it("deberia mostrar el contenedor de sugerencias si hay sugerencias", () => {
        actualizarSugerencias("a");
        expect(
            window.getComputedStyle(document.querySelector("#sugerencias")).display
        ).toBe("block");
    });

    it("deberia mostrar una sugerencia escribiendo el nombre de un pais completo", () => {
        actualizarSugerencias("argentina");
        expect(document.querySelectorAll(".dropdown-item").length).toBe(1);
    });

    it("deberia mostrar varias sugerencias si solo se pone una letra", () => {
        actualizarSugerencias("a");
        expect(document.querySelectorAll(".dropdown-item").length).toBeGreaterThan(
            1
        );
    });
    it("no deberia mostrar ninguna sugerencia si no hay nada escrito en la barra buscadora", () => {
        actualizarSugerencias("");
        expect(
            window.getComputedStyle(document.querySelector("#sugerencias")).display
        ).toBe("none");
    });

    it("deberia rellenar la barra buscadora con la sugerencia seleccionada", () => {
        actualizarSugerencias("argent");
        document.querySelector(".dropdown-item").click();
        expect(document.querySelector("#buscar").value).toBe("Argentina");
    });

    it("deberia agregar clase highligted a la primer sugerencia cuando se presiona flecha abajo", () => {
        const downArrowEvent = new KeyboardEvent("keydown", { key: "ArrowDown" });
        const barraBuscadora = document.querySelector("#buscar");

        actualizarSugerencias("a");
        barraBuscadora.dispatchEvent(downArrowEvent);
        expect(document.querySelectorAll(".dropdown-item")[0].classList[1]).toEqual(
            "highlighted"
        );
    });

    it("deberia rellenar la barra buscadora con el nombre del pais seleccionado con la flecha", () => {
        const downArrowEvent = new KeyboardEvent("keydown", { key: "ArrowDown" });
        const enterArrowEvent = new KeyboardEvent("keydown", { key: "Enter" });

        const barraBuscadora = document.querySelector("#buscar");

        actualizarSugerencias("a");
        barraBuscadora.dispatchEvent(downArrowEvent);
        barraBuscadora.dispatchEvent(enterArrowEvent);

        expect(document.querySelector("#buscar").value).toEqual(
            document.querySelectorAll(".dropdown-item")[0].textContent
        );
    });

    it("deberia agregar clase highligted a la primer sugerencia cuando se presiona flecha arriba por primera ves", () => {
        const upArrowEvent = new KeyboardEvent("keydown", { key: "ArrowUp" });
        const barraBuscadora = document.querySelector("#buscar");

        actualizarSugerencias("a");
        barraBuscadora.dispatchEvent(upArrowEvent);
        expect(document.querySelectorAll(".dropdown-item")[0].classList[1]).toEqual(
            "highlighted"
        );
    });

});
