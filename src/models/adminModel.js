import db from '../config/postgresClient.js';

export const findAdminbyUsername = async (username) => {
  try {
    // postgres.js uses template literals for queries
    const admins = await db`
      SELECT * FROM library.admins
      WHERE username = ${username}
      LIMIT 1
    `;

    // admins is an array of rows
    return admins[0] || null;

  } catch (err) {
    console.error('Error fetching login info:', err);
    throw err;
  }
};

