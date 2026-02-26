// src/api/axios.js

import axios from "axios";

/*
 * CONFIGURAZIONE PER COLLEGARE IL TELEFONO AL BACKEND
 *
 * - Usa l'indirizzo IP del tuo PC (192.168.1.6)
 * - Il telefono deve essere sulla stessa rete Wi‑Fi del PC
 * - Il backend deve essere avviato sulla porta 5000
 *
 * Con questa configurazione:
 * - Il client (porta 5173) parla con il backend (porta 5000)
 * - Funziona sia da PC che da telefono
 */

const api = axios.create({
    baseURL: "http://192.168.1.6:5000", // IP del tuo PC sulla rete locale
    timeout: 10000, // evita blocchi se la rete è lenta
});

export default api;

