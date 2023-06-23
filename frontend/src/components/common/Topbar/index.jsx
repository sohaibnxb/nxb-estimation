import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Button, Tooltip, IconButton, Avatar, Typography, Menu, MenuItem } from '@mui/material'
// images
import Notifi from "../../../assets/images/notifi.png";

const Topbar = ({ estimate = false }) => {
  const [showEstimate, setShowEstimate] = useState(estimate);
  const [limitRole, setLimitRole] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const [elem, setelem] = React.useState(null);
  // const handleProfile = (event) => {
  //   setelem(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setelem(null);
  // };
  // const open = Boolean(elem);
  const removeToken = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("user");
    localStorage.removeItem("roleName");
    localStorage.removeItem("username");
    navigate("/");
  };
  var key = localStorage.getItem("user");
  // getting initials
  var getInitials = function (string) {
    var names = string.split(' '),
      initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };
  var profileName = getInitials(key);
  var roleKey = localStorage.getItem("roleName");

  useEffect(() => {
    if (roleKey == 'resource') {
      setLimitRole(false);
    } else {
      setLimitRole(true);
    }
  })

  return (
    <>
      <header className='nb-header'>
        <div className="nb-right-container">
          <div className='nb-logo'>
            <h2>
              ESTIMATION
              <span>SOFTWARE</span>
            </h2>
          </div>
          {showEstimate && limitRole ?
            (
              <div className='nb-create-est-btn'>
                <Button className='light-btn new-est-btn'>
                  <Link to='/new'> <span>+</span> CREATE NEW ESTIMATE</Link>
                </Button>
              </div>
            ) : ' '
          }
          {/* {limitRole ?
            (
               <span>hellloooooo</span>
            ) : (
              <span>byeee</span>
            )
          } */}

        </div>
        <div className="nb-left-container">
          {/* <div className='nb-notifi-wrapper'>
                <img src={Notifi} alt="notification"/>
            </div> */}
          {/* <div className='nb-profile-wrapper' onClick={handleClick}>
            {profileName}
          </div> */}
          <Tooltip title="Profile">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 40, height: 40 }}>{profileName}</Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={removeToken}>
              <Typography>Logout</Typography>
            </MenuItem>
          </Menu>
        </div>
      </header>
    </>
  )
}

export default Topbar 
