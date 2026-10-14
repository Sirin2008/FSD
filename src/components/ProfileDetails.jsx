
function ProfileDetails(props) {
  const profile = props.profile;

  return (
    <section className="section">
      <h2>Education Details</h2>

      {profile.education.map((item, index) => (
        <div key={index} className="education-item">
          <p>
            <strong>Degree:</strong> {item.qualification}
          </p>

          <p>
            <strong>College:</strong> {item.institution}
          </p>

          {item.year && <p><strong>Year:</strong> {item.year}</p>}

          {item.percentage && (
            <p><strong>Percentage:</strong> {item.percentage}</p>
          )}
        </div>
      ))}
    </section>
  );
}

export default ProfileDetails;
