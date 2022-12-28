import { useStore } from "../../context/store";
import useRestrictedEffect from "../../hooks/useRestrictedEffect";
import Model from "../utils/Model";
import NavBar from "../utils/NavBar";
import Pending from "../utils/Pending";

const Profile = () => {
  useRestrictedEffect();
  const { user } = useStore('user');
  const { formModel } = useStore('formModel');
  
  if (user.userPending || !user.info) {
    return <Pending />;
  }
  return (
    <>
      <NavBar />
      {formModel.show && <Model of={formModel.of} />}
    </>
  );
};

export default Profile;