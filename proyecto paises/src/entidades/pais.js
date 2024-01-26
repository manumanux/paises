export class Pais {
    constructor(
        nombre,
        moneda = [],
        banderaImagen,
        descripcionBandera = [],
        habitantes,
        capital,
        independente,
        zonaHoraria,
        lenguajes,
        cotaDeArmas = []
    ) {
        this.nombre = nombre
        this.moneda = moneda
        this.banderaImagen = banderaImagen
        this.descripcionBandera = descripcionBandera
        this.habitantes = habitantes
        this.capital = capital
        this.independente = independente
        this.zonaHoraria = zonaHoraria
        this.lenguajes = lenguajes
        this.cotaDeArmas = cotaDeArmas
    }
}
