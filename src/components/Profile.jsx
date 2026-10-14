
import { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileDetails from "./ProfileDetails";
import About from "./About";
import Skills from "./Skills";
import Contact from "./Contact";

function Profile({ profile }) {
  const [showAbout, setShowAbout] = useState(true);

  return (
    <main className="profile-card">
      <ProfileHeader profile={profile} />

      <button onClick={() => setShowAbout(!showAbout)}>
        {showAbout ? "Hide About" : "Show About"}
      </button>

      {showAbout && (
        <About description={profile.about} />
      )}

      <ProfileDetails profile={profile} />
      <Skills skills={profile.skills} />

      <section className="section">
        <h2>Achievements</h2>
        {profile.achievements.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </section>

      <Contact email={profile.email} phone={profile.phone} />
    </main>
  );
}

export default Profile;