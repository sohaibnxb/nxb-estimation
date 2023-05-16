import axios from "axios";

export async function loginUser(username, password, navigate) {
  const payload = { username, password };
  console.log(username);
  console.log(password);
  try {
    const response = await axios.post("http://localhost:5000/api/users/signin", payload)
    if (response) {
      localStorage.setItem("access-token", JSON.stringify(response.data.token));
      localStorage.setItem("user", response.data.FullName);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem(
        "managerName",
        response.data.managerName
      );
      navigate('/dashboard');
    }

  } catch (error) {
    alert("These credentials do not match our records")
  }

}
