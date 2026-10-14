
function ProfileImage({ image, name }) {
  return (
    <img
      src={image}
      alt={name}
      className="profile-image"
      onError={(e) => {
        console.error("Profile image failed to load:", image);
      }}
    />
  );
}

export default ProfileImage;
