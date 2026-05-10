import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "@/app/store";

function ProtectedHome() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="p-6">
      <h1>Protected Area</h1>

      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
      >
        Logout
      </button>
    </div>
  );
}

export default ProtectedHome;