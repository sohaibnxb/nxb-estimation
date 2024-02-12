import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import './style.scss';

import { useSelector } from "react-redux";
import API from '../../../utils/api';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const backendURL = import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:5000";

export default function InviteUserModal({ open, toggleOpen, timelineId }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const projectId = useSelector(state => state.timeline?.project?._id);
  const projectName = useSelector(state => state.timeline?.project?.proj_name);
  const { FullName } = useSelector(state => state.auth?.userInfo);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let getUsers = async () => {
      let users = await API.get(`${backendURL}/api/users`, {
        headers: {
            'x-access-token': localStorage.getItem("access-token"),
        }
      });
      let filterdUsers = users.data.filter((user) => user.FullName !== FullName);
      setUsers(filterdUsers);
    }
    getUsers();
  }, []);

  const handleInputChange = (event, value) => setSelectedUser(value);

  const handleInviteUser = async () => {
    setLoading(true);
    // to whom we want to give access
    const userId = users.filter(user => user.FullName === selectedUser)[0]._id;
    const sendEmailTo = users.filter(user => user.FullName === selectedUser)[0].username;
    try {
      // add access of user into project
      const projectResponse = await API.patch(`${backendURL}/api/projects/update-access`, {
        projectId,
        userId
      });
      // add user access to specific timeline module
      const timelineResponse = await API.patch(`${backendURL}/api/timelines/update-access`, {
        timelineId,
        userId
      });
      if(timelineResponse.status === 200 && (projectResponse.status === 200 || projectResponse.status === 208)) {
        toast.success("Access granted successfully");
        // send invite email to invited user
        const inviteResponse = await API.post(`${backendURL}/api/email`, {
          email: sendEmailTo,
          project: projectName,
          name: selectedUser,
          senderName: FullName
        });
        if(inviteResponse.status === 201) {
          toast.success(`Invite email sent to ${selectedUser}`);
        } else {
          toast.error("Something went wrong while sending email");
        }
      } else if(timelineResponse.status === 208) {
        toast.warning("User already have access to this timeline");
      } else if(timelineResponse.status === 204) {
        toast.warning("Please save the timeline first");
      } else {
        toast.error("Something went wrong while inviting user");
      }
      setLoading(false);
      toggleOpen();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={toggleOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Select user to invite
          </Typography>
          <Autocomplete
            disablePortal
            options={users.map(user => user.FullName)}
            onChange={(event, value) => handleInputChange(event, value)}
            sx={{
              width: "100%",
              margin: "10px 0"
            }}
            renderInput={(params) => <TextField {...params} label="Invite user" />}
          />
          <Button style={{marginLeft: "83%"}} onClick={handleInviteUser}>Invite</Button>
          {loading && (
            <div className="access-progress">
              < CircularProgress />
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}