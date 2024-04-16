import { Link } from "react-router-dom";
import "./About.css";
const About = () => {
  return (
    <div className="about-card">
      <section className="hero">
        <h1>Welcome to WealthPath</h1>
        <p>Your partners in securing financial freedom.</p>
      </section>

      <section className="company-overview">
        <h2>About Our Company</h2>
        <p>
          Founded in 2024, WealthPath has been dedicated to providing
          bespoke wealth management services. Our approach focuses on personal
          attention and tailored financial strategies.
        </p>
      </section>

      <section className="our-team">
        <h2>Meet Our Team</h2>
        <div className="team-members">
          {/* Map through team member data here */}
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Clients Say</h2>
        <blockquote>
          "We've trusted WealthPath with our investments for over a
          decade, and the results speak for themselves."
        </blockquote>
        {/* More testimonials */}
      </section>

      <section className="values-commitments">
        <h2>Our Values</h2>
        <ul>
          <li>Integrity</li>
          <li>Client-Centric Solutions</li>
          <li>Transparency</li>
        </ul>
      </section>

      <section className="call-to-action">
        <h2>Ready to take the next step?</h2>
        <Link to="/contact" className="contact-button">
          Contact Us
        </Link>
      </section>

      <footer>
        <p>Contact us at 222-555-444 | Follow us on Tweeter: @WealthPath</p>
      </footer>
    </div>
  );
};
export default About;
