import { facturas } from "./facturas";
import { filterByClient, sortTotalDesc } from "./funciones";

console.log("Filtrar las facturas de un cliente específico.")
console.log(filterByClient(facturas, "Comercial S.A."))

console.log("Ordenar por total descendente y Devolver solo las 5 más altas.")
console.log(sortTotalDesc(facturas))
