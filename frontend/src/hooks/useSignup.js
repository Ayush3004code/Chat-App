import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

/**
 * @info custom hook to SIGNUP FUNCTIONALITY and checks validation on inputs 
 * 
 * @returns signup status
 */
const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext()
    // signup function
    const signup = async ({ fullName, username, password, confirmpassword, gender }) => {
        // input validation
        const success = handleInputErrors({ fullName, username, password, confirmpassword, gender });
        if (!success) return;
        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, username, password, confirmPassword: confirmpassword, gender })
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error)
            }
            // localstorage
            localStorage.setItem("chat-user", JSON.stringify(data))
            //context
            setAuthUser(data)
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }
    return { loading, signup }

}
export default useSignup;

function handleInputErrors({ fullName, username, password, confirmpassword, gender }) {
    if (!fullName || !username || !password || !confirmpassword || !gender) {
        toast.error("Please Fill in all the Fields.")
        return false;
    }
    if (password !== confirmpassword) {
        toast.error('Password and Confirm Password does not match.');
        return false;
    }
    if (password.length < 6) {
        toast.error("Password must be atleast 6 characters.")
        return false;
    }
    return true
}