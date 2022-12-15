import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if(!user) {
      navigate('/');
    }
  }, [user]);

  return (
    <div>Profile</div>
  );
};

export default Profile;