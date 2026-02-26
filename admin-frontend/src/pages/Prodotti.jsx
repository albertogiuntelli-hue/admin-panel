import Layout from "../components/Layout.jsx";
import { useState, useEffect } from "react";
import axios from "axios";

function Prodotti() {
    const [prodotti, setProdotti] = useState([]);
    const [categorie, setCategorie] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);

    const [nome, setNome] = useState("");
    const [prezzo, setPrezzo] = useState("");
    const [categoria, setCategoria] = useState("");
    const [immagine, setImmagine] = useState(null);
    const [preview, setPreview] = useState("");

    const [search, setSearch] = useState("");
    const [filterCategoria, setFilterCategoria] = useState("");
    const [sortBy, setSortBy] = useState("nome");
    const [sortDir, setSortDir] = useState("asc");
    const [page, setPage] = useState(1);
    const perPage = 10;

    // 🔵 CARICA PRODOTTI
    useEffect(() => {
        axios.get("http://localhost:3000/api/products")
            .then(res => setProdotti(res.data));
    }, []);

    // 🔵 CARICA CATEGORIE
    useEffect(() => {
        axios.get("http://localhost:3000/api/categories")
            .then(res => setCategorie(res.data));
    }, []);

    function apriFormAggiungi() {
        setEditing(null);
        setNome("");
        setPrezzo("");
        setCategoria("");
        setImmagine(null);
        setPreview("");
        setShowForm(true);
    }

    function apriFormModifica(p) {
        setEditing(p._id);
        setNome(p.nome);
        setPrezzo(p.prezzo);
        setCategoria(p.categoria);
        setPreview(p.immagine ? `http://localhost:3000/uploads/${p.immagine}` : "");
        setShowForm(true);
    }

    function salvaProdotto(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nome", nome);
        formData.append("prezzo", prezzo);
        formData.append("categoria", categoria);
        if (immagine) formData.append("immagine", immagine);

        if (editing) {
            axios.put(`http://localhost:3000/api/products/${editing}`, formData)
                .then(res => {
                    setProdotti(prodotti.map(p => p._id === editing ? res.data : p));
                    setShowForm(false);
                });
        } else {
            axios.post("http://localhost:3000/api/products", formData)
                .then(res => {
                    setProdotti([...prodotti, res.data]);
                    setShowForm(false);
                });
        }
    }

    function eliminaProdotto(id) {
        axios.delete(`http://localhost:3000/api/products/${id}`)
            .then(() => {
                setProdotti(prodotti.filter(p => p._id !== id));
            });
    }

    // 🔵 FILTRI, RICERCA, ORDINAMENTO
    let filtered = prodotti.filter(p =>
        p.nome.toLowerCase().includes(search.toLowerCase())
    );

    if (filterCategoria) {
        filtered = filtered.filter(p => p.categoria === filterCategoria);
    }

    filtered.sort((a, b) => {
        let valA = a[sortBy];
        let valB = b[sortBy];

        if (typeof valA === "string") valA = valA.toLowerCase();
        if (typeof valB === "string") valB = valB.toLowerCase();

        if (sortDir === "asc") return valA > valB ? 1 : -1;
        return valA < valB ? 1 : -1;
    });

    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

    return (
        <Layout>
            <h1>Gestione Prodotti</h1>

            <button onClick={apriFormAggiungi}>+ Aggiungi Prodotto</button>

            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Cerca prodotto..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ padding: "8px", width: "200px", marginRight: "10px" }}
                />

                <select
                    value={filterCategoria}
                    onChange={e => setFilterCategoria(e.target.value)}
                    style={{ padding: "8px", marginRight: "10px" }}
                >
                    <option value="">Tutte le categorie</option>
                    {categorie.map(c => (
                        <option key={c._id} value={c.nome}>{c.nome}</option>
                    ))}
                </select>

                <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    style={{ padding: "8px", marginRight: "10px" }}
                >
                    <option value="nome">Nome</option>
                    <option value="prezzo">Prezzo</option>
                    <option value="categoria">Categoria</option>
                </select>

                <select
                    value={sortDir}
                    onChange={e => setSortDir(e.target.value)}
                    style={{ padding: "8px" }}
                >
                    <option value="asc">Ascendente</option>
                    <option value="desc">Discendente</option>
                </select>
            </div>

            {showForm && (
                <form onSubmit={salvaProdotto} style={{ background: "white", padding: "20px" }}>
                    <h3>{editing ? "Modifica Prodotto" : "Nuovo Prodotto"}</h3>

                    <label>Nome</label>
                    <input value={nome} onChange={e => setNome(e.target.value)} required />

                    <label>Prezzo</label>
                    <input
                        type="number"
                        step="0.01"
                        value={prezzo}
                        onChange={e => setPrezzo(e.target.value)}
                        required
                    />

                    <label>Categoria</label>
                    <select
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                        required
                    >
                        <option value="">Seleziona categoria</option>
                        {categorie.map(c => (
                            <option key={c._id} value={c.nome}>{c.nome}</option>
                        ))}
                    </select>

                    <label>Immagine</label>
                    <input
                        type="file"
                        onChange={e => {
                            setImmagine(e.target.files[0]);
                            setPreview(URL.createObjectURL(e.target.files[0]));
                        }}
                    />

                    {preview && (
                        <img
                            src={preview}
                            alt="preview"
                            style={{ width: "150px", marginTop: "10px" }}
                        />
                    )}

                    <button type="submit">Salva</button>
                </form>
            )}

            <div className="table-wrapper" style={{ marginTop: "20px" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th>Immagine</th>
                            <th>Nome</th>
                            <th>Prezzo</th>
                            <th>Categoria</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginated.map(p => (
                            <tr key={p._id}>
                                <td>
                                    {p.immagine && (
                                        <img
                                            src={`http://localhost:3000/uploads/${p.immagine}`}
                                            alt=""
                                            style={{ width: "60px" }}
                                        />
                                    )}
                                </td>
                                <td>{p.nome}</td>
                                <td>{p.prezzo} €</td>
                                <td>{p.categoria}</td>
                                <td>
                                    <button onClick={() => apriFormModifica(p)}>Modifica</button>
                                    <button onClick={() => eliminaProdotto(p._id)}>Elimina</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ marginTop: "20px" }}>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        style={{
                            padding: "8px 12px",
                            marginRight: "5px",
                            background: page === i + 1 ? "#007bff" : "#ddd",
                            color: page === i + 1 ? "white" : "black",
                            border: "none",
                            cursor: "pointer"
                        }}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </Layout>
    );
}

export default Prodotti;
