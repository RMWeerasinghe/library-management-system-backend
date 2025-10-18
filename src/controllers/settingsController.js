import { updateSettings } from "../models/settingsModel.js";

export const updateSettingParam = async (req,res) => {

    try{

        const {
            key,
            value
        } = req.body;

        if (!key || !value ) {
            return res.status(400).json({ error: 'Missing required information' });
        }
        const result = await updateSettings({key, value});
        res.status(201).json(result);


    }catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update settings' });
    }
};