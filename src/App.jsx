
import Profile from "./components/Profile";
import profileData from "./data/profileData";
import "./App.css";

function App() {
  return (
    <div className="container">
      <Profile profile={profileData} />
    </div>
  );
}

export default App;