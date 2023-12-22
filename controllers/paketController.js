const Paket = require('../models/paketModel');

const getAllPaket = async (req, res) => {
    try {
        const pakets = await Paket.findAll();
        res.status(200).json(pakets);
    } catch (error) {
        res.status(501).json({ error: "Internal server error:\n" + error.message });
    }
}

const createPaket = async (req, res) => {
    try {
        const { nama_paket } = req.body;

        if (!nama_paket) {
            return res.status(400).json("Nama paket tidak boleh kosong");
        }

        const newPaket = await Paket.create({
            nama_paket
        });

        let response = {
            data: newPaket,
            success: "Berhasil menambah paket"
        };

        res.status(201).json(response);

    } catch (error) {
        res.status(501).json({ error: "Internal server error:\n" + error.message });
    }
}

const updatePaket = async (req, res) => {
    try {
        const { id_paket } = req.params;
        const existingPaket = await Paket.findOne({ where: { id_paket } });

        if (!existingPaket) {
            return res.status(404).json({ error: "Paket tidak ditemukan" });
        }

        existingPaket.nama_paket = req.body.nama_paket;
        await existingPaket.save();

        let response = {
            data: existingPaket,
            success: "Berhasil mengupdate paket"
        };

        res.status(201).json(response);

    } catch (error) {
        res.status(501).json({ error: "Internal server error:\n" + error.message });
    }
}

const getPaket = async (req, res) => {
    try {
        const { id_paket } = req.params;
        const existingPaket = await Paket.findOne({ where: { id_paket } });

        if (!existingPaket) {
            return res.status(404).json({ error: "Paket tidak ditemukan" });
        }

        res.status(201).json(existingPaket);

    } catch (error) {
        res.status(501).json({ error: "Internal server error:\n" + error.message });
    }
}

const deletePaket = async (req, res) => {
    try {
        const { id_paket } = req.params;
        const existingPaket = await Paket.findOne({ where: { id_paket } });

        if (!existingPaket) {
            return res.status(404).json({ error: "Paket tidak ditemukan" });
        }

        await existingPaket.destroy();
        res.status(200).json({ success: "paket "+existingPaket.nama_paket + " telah dihapus" });

    } catch (error) {
        res.status(501).json({ error: "Internal server error:\n" + error.message });
    }
}

module.exports = { getAllPaket, createPaket, updatePaket, deletePaket, getPaket };
