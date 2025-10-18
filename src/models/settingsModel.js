import db from "../config/postgresClient.js";

export const updateSettings = async (setting) => {
    try {

        const updated = await db `
            UPDATE library.settings
            SET value = ${setting.value}
            WHERE key = ${setting.key}
            RETURNING *;
        `
        return updated[0];

    }catch (err) {
    console.error('Error updating setting:', err);
    throw err;}
};