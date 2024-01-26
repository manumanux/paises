/// <reference types="Jest" />

import { BASE_URL, cargarPais } from "../pais.js";

beforeEach(() => {
  global.fetch = jest.fn();

  global.fetch.mockImplementationOnce(
    () =>
      new Promise((resolve) => {
        const jsonPromise = new Promise((r) => {
          r({});
        });
        resolve({ json: () => jsonPromise });
      })
  );
});

test("carga 1 pais  ", () => {
  cargarPais("argentina");
  expect(global.fetch).toHaveBeenCalledTimes(1);

  expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/name/argentina`);
});

test("tira error si el id es indefinido", async () => {
  await expect(cargarPais(undefined)).rejects.toThrow(
    "Se necesita un identificador para cargar un pais"
  );

  expect(global.fetch).not.toHaveBeenCalled();
});
