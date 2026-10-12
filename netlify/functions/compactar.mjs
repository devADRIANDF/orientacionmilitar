// Función programada: cada hora suma las visitas y eventos pendientes en las estadísticas diarias
// y archiva los contactos nuevos en sus carpetas mensuales.
import { compactarEventos, compactarLeads, limpiarLimites } from '../lib/almacen.mjs';

export const config = { schedule: '@hourly' };

export default async () => {
  const eventos = await compactarEventos();
  const leads = await compactarLeads();
  await limpiarLimites().catch(() => {});
  console.log(`Compactación: ${eventos.procesados} eventos (${eventos.restantes} pendientes), ${leads} contactos`);
  return new Response('ok');
};
