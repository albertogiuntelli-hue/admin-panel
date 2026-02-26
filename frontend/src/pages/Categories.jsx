import { useEffect, useState } from "react";
import { getCategories } from "../api/categories";

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then(res => setCategories(res.data));
    }, []);

    return (
        <>
            <h1>Categories</h1>
            <ul>
                {categories.map(c => (
                    <li key={c.id}>{c.name}</li>
                ))}
            </ul>
        </>
    );
};

export default Categories;
