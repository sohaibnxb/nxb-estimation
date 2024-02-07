import { toast } from 'react-toastify';
import API from '../../utils/api';

const backendURL = import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:5000";

// new estimate
export async function newEstimate(
  title,
  proposalType,
  preparedby,
  clientName,
  team,
  date,
  version,
  description,
  proj_status,
  selectedUser
) {
  try {
    const response = await toast.promise(API.post(
      `${backendURL}/api/projects/?proj_name=${title}&proj_type=${proposalType}&prepared_by=${preparedby}&proposal_for=${clientName}&team=${team}&created_date=${date}&proj_description=${description}&proj_status=${proj_status}&version=${version}&resource_name=${selectedUser}`
    ), {
      pending: 'Creating new project',
      success: 'New project created successfully',
      error: 'Error creating new project'
    })
    return response;
  } catch (error) {
    console.log(error);
  }
}