/**
 * @jest-environment jsdom
 */

import fixtureListaPaises from "./listaDePaises.json";
import fixture from "./fixture.js";
import iniciar from "../paises.js";

jest.mock("../BarraBuscadora/autoFill.js", () => ({
    actualizarSugerencias: jest.fn().mockImplementation(() => true),
}));
beforeAll(() => {
    document.body.innerHTML = fixture;
    global.fetch = jest.fn().mockImplementation(
        () =>
            new Promise((resolve) => {
                const jsonPromise = new Promise((r) => {
                    r(fixtureListaPaises);
                });
                resolve({ json: () => jsonPromise });
            })
    );
});
test("inicia proyecto Paises", () => {
    iniciar().then(() => {
        expect(document.querySelector("#ayuda").textContent).toContain(
            "Seleccioná un país para ver su información"
        );

        expect(document.querySelector("#cantidad-paises").textContent).toContain(
            "2"
        );

        expect(document.querySelectorAll("#indice .list-group-item")).toHaveLength(
            2
        );
    });
});
