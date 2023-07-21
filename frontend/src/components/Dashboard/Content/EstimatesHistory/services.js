import axios from "axios";

export const userData = async () => {

    //const data1 = await isNotifi(username);
    //const data2 = await isSelectedUser(username);
    const username = localStorage.getItem('username');

    // Get Notifications count
    const notifications = await axios.get(`http://localhost:5000/api/notifications?receiptName=${username}`)
        .then((res) => {
            var notifi = res.data;
            return notifi;
        })
        .catch((error) => {
            console.log(error);
        });

    // Get User Role 
    const roleName = await axios.get(`http://localhost:5000/api/users/selectedUser?username=${username}`)
        .then((res) => {
            const role = res.data[0].role_id.name;
            localStorage.setItem("roleName", role);
            return role;
        })
        .catch((err) => {
            console.log(err);
        });

    if (notifications > 0 && roleName === "resource") {
        //alert('you can go further');
        // navigate("/dashboard");
        alert("You have project assigned");
    }
    else if (notifications === 0 && roleName === "resource") {
        alert("You have no project assigned");
    }
    else if (notifications >= 0 && roleName === "manager") {
        // navigate("/dashboard");
    }
    else {
        console.log("else");
    }
}