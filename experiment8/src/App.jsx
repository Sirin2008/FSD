import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

function Home() {
  return <h2>Welcome to Home Page</h2>;
}

function About() {
  return <h2>This is About Page</h2>;
}

function Contact() {
  return <h2>Contact Us Page</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <h1>React Router Navigation</h1>
      <nav>
        <NavLink to="/">Home</NavLink> |{' '}
        <NavLink to="/about">About</NavLink> |{' '}
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
