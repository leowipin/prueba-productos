export interface Factura{
  numero:string;
  cliente:string;
  total:number;
  fecha:string;
}

export const facturas:Factura[] = [
  { numero: "F001", cliente: "Comercial S.A.", total: 1200.50, fecha: "2025-07-01" },
  { numero: "F002", cliente: "Insumos del Litoral", total: 450.00, fecha: "2025-07-03" },
  { numero: "F003", cliente: "Ferretería Norte", total: 2300.75, fecha: "2025-07-02" },
  { numero: "F004", cliente: "Constructora Andes", total: 800.00, fecha: "2025-07-05" },
  { numero: "F005", cliente: "Servicios Eléctricos", total: 1575.30, fecha: "2025-07-04" },
  { numero: "F006", cliente: "Comercial S.A.", total: 600.00, fecha: "2025-07-06" },
  { numero: "F007", cliente: "Ferretería Norte", total: 3400.10, fecha: "2025-07-07" },
  { numero: "F008", cliente: "Insumos del Litoral", total: 980.50, fecha: "2025-07-08" },
  { numero: "F009", cliente: "Servicios Eléctricos", total: 2100.00, fecha: "2025-07-09" },
  { numero: "F010", cliente: "Constructora Andes", total: 300.00, fecha: "2025-07-10" }
];

// Instrucciones:
// - Filtrar las facturas de un cliente específico.
// - Ordenar por total descendente.
// - Devolver solo las 5 más altas.
