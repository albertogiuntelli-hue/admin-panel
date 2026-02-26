import Layout from "../components/Layout.jsx";
import { useState, useEffect } from "react";
import axios from "axios";

function Categorie() {
    const [categorie, setCategorie] = useState([]);
    const [nome, setNome] = useState("");
    const [editing, setEditing] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3000/api/categorie")
            .then(res => setCategorie(res.data));
    }, []);

    function salvaCategoria(e) {
        e.preventDefault();

        if (editing) {
            axios.put(`http://localhost:3000/api/categorie/${editing}`, { nome })
                .then(res => {
                    setCategorie(categorie.map(c => c._id === editing ? res.data : c));
                    setEditing(null);
                    setNome("");
                });
        } else {
            axios.post("http://localhost:3000/api/categorie", { nome })
                .then(res => {
                    setCategorie([...categorie, res.data]);
                    setNome("");
                });
        }
    }

    function eliminaCategoria(id) {
        axios.delete(`http://localhost:3000/api/categorie/${id}`)
            .then(() => {
                setCategorie(categorie.filter(c => c._id !== id));
            });
    }

    return (
        <Layout>
            <h1>Gestione Categorie</h1>

            <form onSubmit={salvaCategoria} style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Nome categoria"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    required
                />
                <button type="submit">
                    {editing ? "Modifica" : "Aggiungi"}
                </button>
            </form>

            <div className="table-wrapper">
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categorie.map(c => (
                            <tr key={c._id}>
                                <td>{c.nome}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            setEditing(c._id);
                                            setNome(c.nome);
                                        }}
                                    >
                                        Modifica
                                    </button>

                                    <button onClick={() => eliminaCategoria(c._id)}>
                                        Elimina
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}

export default Categorie;

