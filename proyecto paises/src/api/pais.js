export const BASE_URL = "https://restcountries.com/v3.1";

export async function cargarPais(id) {
  if (id === undefined) {
    throw new Error("Se necesita un identificador para cargar un pais");
  }
  return (await fetch(`${BASE_URL}/name/${id}`)).json();
}

export async function cargarPaises() {
  return (await fetch(`${BASE_URL}/all`)).json();
}
