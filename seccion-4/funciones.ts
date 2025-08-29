import { Factura } from "./facturas";

export const filterByClient = (facturas:Factura[], cliente:string) :Factura[] =>{
    return facturas.filter((factura)=> factura.cliente === cliente);
}

export const sortTotalDesc = (facturas:Factura[]) :Factura[] => {
    const facturasOrdenadas = [...facturas].sort((a,b) => b.total - a.total);
    return facturasOrdenadas.slice(5);
}