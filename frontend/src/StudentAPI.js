import axios from 'axios';

const API = `https://www.hatchways.io/api/assessment/students`;

export async function getAll(){
  try {
    const res = await axios.get(`${API}`);
    return res.data
  } catch(err){
    console.log(err);
  }
}
