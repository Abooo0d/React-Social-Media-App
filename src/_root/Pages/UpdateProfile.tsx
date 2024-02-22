import { useParams } from "react-router-dom";

const UpdateProfile = () => {
  const { id } = useParams();
  return (
    <div>
      UpdateProfile
      <br />
      {id}
    </div>
  );
};

export default UpdateProfile;
