import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const axiosSecure = axios.create({
  baseURL: "https://solosphere-five.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      async (error) => {
        toast.error(error.message);
        // console.log("axios interceptors error", error.message);
        if (error.response?.status === 401 || error.response?.status === 403) {
          // logout
          logOut();
          // navigate to login
          navigate("/login");
        }
      }
    );
  }, [logOut, navigate]);
  return axiosSecure;
};

export default useAxiosSecure;
