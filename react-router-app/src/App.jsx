
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams
} from 'react-router-dom';
import './App.css';

function Home() {
  return (
    <div className="page">
      <h2>Welcome to EduPortal ✨</h2>
      <p>Discover new skills and explore your learning journey.</p>
    </div>
  );
}

function About() {
  return (
    <div className="page">
      <h2>About EduPortal</h2>
      <p>A simple platform to explore technology and learning.</p>
    </div>
  );
}

function Courses() {
  return (
    <div className="page">
      <h2>Our Courses</h2>
      <p>React Development</p>
      <p>Java Programming</p>
      <p>UI/UX Design</p>
      <Link to="/course/101">Explore Course →</Link>
    </div>
  );
}

function Contact() {
  return (
    <div className="page">
      <h2>Contact Us</h2>
      <p>Have questions? We are happy to help!</p>
    </div>
  );
}

function CourseDetail() {
  const { id } = useParams();

  return (
    <div className="page">
      <h2>Course Details</h2>
      <p>You selected Course ID: {id}</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header>
          <h2>Edu<span>Portal.</span></h2>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/courses">Courses</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/course/:id" element={<CourseDetail />} />
          </Routes>
        </main>

        <footer>Learn • Explore • Grow | EduPortal © 2026</footer>
      </div>
    </BrowserRouter>
  );
}
