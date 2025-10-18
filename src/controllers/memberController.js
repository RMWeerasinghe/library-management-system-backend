import { addMember, getAllMembers, findMemberbyId, updateMember, deleteMember } from '../models/memberModel.js';

export const createMember = async (req, res) => {
  try {
    const {
      member_id ,
      name ,
      grade ,
      telephone,
      address,
      email = null,
      is_student = true,
      graduated = false

    } = req.body;

    if (!name || !grade || !member_id || !telephone || !address ) {
      return res.status(400).json({ error: 'Missing required information' });
    }

    const member = {
        member_id : member_id,
        name : name,
        grade : grade,
        telephone : telephone,
        address : address,
        email : email,
        is_student : is_student,
        graduated : graduated
    }
    const result = await addMember(member);
    res.status(201).json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create member' });
  }
};

export const getMemberslist = async (req, res) => {
  try {
    const result = await getAllMembers();
    res.status(200).json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch member information' });
  }
};



export const getMemberById = async (req, res) => {

 
  try {
    
    const { id } = req.params?.id;


    // Basic validation
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'No id present or invalid id' });
    }

    const member = await findMemberbyId(id);

    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    res.status(200).json(member);

  } catch (err) {
    console.error('Error fetching member:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Update member
export const updateMemberById = async (req, res) => {
  try {
    const id = req.params?.id;
    if (!id) return res.status(400).json({ error: "Member ID required" });

    const updatedMember = await updateMember(id, req.body);
    if (!updatedMember) return res.status(404).json({ error: "Member not found" });

    res.status(200).json(updatedMember);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete member
export const deleteMemberById = async (req, res) => {
  try {
    const id = req.params?.id;
    if (!id) return res.status(400).json({ error: "Member ID required" });

    await deleteMember(id);
    res.status(200).json({ message: "Member deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};