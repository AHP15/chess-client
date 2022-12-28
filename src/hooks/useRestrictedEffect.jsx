import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/store";

const useRestrictedEffect = () => {
  const { user } = useStore('user');
  const navigate = useNavigate();

  useEffect(() => {
    if(!user.info) {
      navigate('/');
    }
  }, [user.info]);
};

export default useRestrictedEffect;