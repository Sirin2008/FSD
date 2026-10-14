
function Contact(props) {
  return (
    <section className="section">
      <h2>Contact Me</h2>
      <p>Email: {props.email}</p>
      <p>Phone: {props.phone}</p>
    </section>
  );
}

export default Contact;
