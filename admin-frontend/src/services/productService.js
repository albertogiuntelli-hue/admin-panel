const API_URL = "http://localhost:3000/api/products";

export async function getProducts() {
    try {
        const response = await fetch(API_URL);
        return await response.json();
    } catch (error) {
        console.error("Errore caricamento prodotti:", error);
        return [];
    }
}
