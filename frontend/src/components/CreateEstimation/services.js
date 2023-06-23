import axios from "axios";
import { toast } from 'react-toastify';

// new estimate
export async function newEstimate(
  title,
  proposalType,
  preparedby,
  clientName,
  date,
  version,
  description,
  proj_status,
  selectedUser
) {
  try {
    const response = await toast.promise(axios.post(
      `http://localhost:5000/api/projects/?proj_name=${title}&proj_type=${proposalType}&prepared_by=${preparedby}&proposal_for=${clientName}&created_date=${date}&proj_description=${description}&proj_status=${proj_status}&version=${version}&resource_name=${selectedUser}`
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
// get resources list of login user
// export async function getList(setSelectValues) {

// }

// send notification to resource
export async function sendNotification(
  title,
  options,
  isRead,
  totalcount,
  navigate
) {
  var key = localStorage.getItem("username");
  await toast.promise(axios.post(
    `http://localhost:5000/api/notifications/?senderName=${key}&receiptName=${options}&projectName=${title}&read=${isRead}&count=${totalcount}`
  ), {
    pending: 'Authentication is pending',
    success: 'Notification sent successfully',
    error: 'Error in sending notifications'
  })
    .then((response) => {
      console.log(response.data);
      // navigate(`/timeline/${response.data._id}`);
    })
    .catch((error) => {
      console.log(error);
    });
}

// axios
//   .get(
//     `http://localhost:5000/api/users/selectedUser/?username=${options}`
//   )
//   .then((response) => {
//     console.log('response' ,response.data);
//     var res = response.data;
//     var result = res.map(function(item) {
//     return item['_id'];
//     });
//     console.log(result);
//     const str = result.toString();
//     console.log(str);

//     setSelectedUser(str);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
