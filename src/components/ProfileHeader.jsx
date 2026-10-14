
import ProfileImage from "./ProfileImage";

function ProfileHeader(props) {
  return (
    <header className="profile-header">
      <ProfileImage
        image={props.profile.image}
        name={props.profile.name}
      />

      <h1>{props.profile.name}</h1>
      <h3>{props.profile.role}</h3>
      <p>{props.profile.college}</p>
    </header>
  );
}

export default ProfileHeader;
