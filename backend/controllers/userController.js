import User from "../models/User.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Errore nel recupero utenti" });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "Utente non trovato" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Errore nel recupero utente" });
    }
};

export const updateUser = async (req, res) => {
    try {
        const updates = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({ message: "Utente non trovato" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Errore nell'aggiornamento utente" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "Utente non trovato" });
        }

        res.json({ message: "Utente eliminato" });
    } catch (error) {
        res.status(500).json({ message: "Errore nella cancellazione utente" });
    }
};
