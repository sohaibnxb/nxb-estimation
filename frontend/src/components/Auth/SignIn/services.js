import axios from "axios";
import { toast } from 'react-toastify';

export async function userLogin(username, password, navigate) {
  const payload = { username, password };
  try {
    const response = await toast.promise(
      axios.post("http://localhost:5000/api/users/signin", payload),
      {
        pending: 'Authentication is pending',
        success: 'Login successfully ',
        error: 'Invalid username or password'
      }
    );
    if (response) {
      localStorage.setItem("access-token", JSON.stringify(response.data.token));
      localStorage.setItem("user", response.data.FullName);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("managerName", response.data.managerName);
      navigate('/dashboard');
    }
  } catch (error) {
    console.log("These credentials do not match our records")
  }
}
