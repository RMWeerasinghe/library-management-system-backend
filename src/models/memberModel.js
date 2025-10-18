import db from '../config/postgresClient.js';


// add new member
export const addMember = async (member) => {
  try {

    const result = await db`
      INSERT INTO library.members
        (member_id, name, grade, telephone,address, email, is_student,graduated)
      VALUES
        (${member.member_id}, ${member.name}, ${member.grade}, ${member.telephone}, ${member.address}, ${member.email}, ${member.is_student}, ${member.graduated})
      RETURNING *
    `;


    return result[0];

  } catch (err) {
    console.error('Error inserting new student:', err);
    throw err;
  }
};

// get all members

export const getAllMembers = async () => {
  try {
    // postgres.js uses template literals for queries
    const members = await db`
      SELECT * FROM library.members
    `;

    // admins is an array of rows
    return members;

  } catch (err) {
    console.error('Error fetching member information:', err);
    throw err;
  }
};

// get member by id

export const findMemberbyId = async (id) => {
  try {
   
    const member = await db`
      SELECT * FROM library.members WHERE member_id = ${id} LIMIT 1
    `

    return member[0];

  } catch (err) {
    console.error('Error fetching member information:', err);
    throw err;
  }
} 


// update 
export const updateMember = async (id, fields) => {
  try {
    const data = {};
    if (fields.grade) data.grade = fields.grade;
    if (fields.telephone) data.telephone = fields.telephone;
    if (fields.address) data.address = fields.address;
    if (fields.email) data.email = fields.email;
    if (fields.is_student) data.is_student = fields.is_student;
    if (fields.graduated) data.graduated = fields.graduated;

    const result = await db`
      UPDATE library.members SET ${db(data)} WHERE member_id = ${id} RETURNING *
    `;
    return result[0];
      
  }catch (err) {
    console.error('Error updating member information:', err);
    throw err;
  }
};


// Delete member
export const deleteMember = async (id) => {
  await db`DELETE FROM library.members WHERE member_id = ${id}`;
  return { message: "Member deleted successfully" };
};