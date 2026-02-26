import { Link } from "react-router-dom";

function Layout({ children }) {
    return (
        <div style={styles.container}>

            {/* SIDEBAR */}
            <aside style={styles.sidebar}>
                <h2 style={styles.logo}>Admin Panel</h2>

                <nav style={styles.nav}>
                    <Link to="/prodotti" style={styles.link}>Prodotti</Link>
                    <Link to="/categorie" style={styles.link}>Categorie</Link>
                </nav>
            </aside>

            {/* CONTENUTO */}
            <main style={styles.main}>
                <div style={styles.contentWrapper}>
                    {children}
                </div>
            </main>

        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        minHeight: "100vh",
        background: "#f5f5f5",
    },

    sidebar: {
        width: "220px",
        background: "#222",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        height: "100vh",
    },

    logo: {
        marginBottom: "30px",
        fontSize: "22px",
        fontWeight: "bold",
    },

    nav: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },

    link: {
        color: "white",
        textDecoration: "none",
        fontSize: "18px",
        padding: "8px 0",
    },

    main: {
        flex: 1,
        padding: "20px",
    },

    contentWrapper: {
        background: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    },

    /* MOBILE RESPONSIVE */
    "@media (max-width: 768px)": {
        container: {
            flexDirection: "column",
        },
        sidebar: {
            width: "100%",
            height: "auto",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        nav: {
            flexDirection: "row",
            gap: "20px",
        },
    }
};

export default Layout;
