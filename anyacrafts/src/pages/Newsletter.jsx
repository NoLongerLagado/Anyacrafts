import React from "react";

const Newsletter = () => (
  <section className="newsletter">
    <h2>Newsletter</h2>
    <p>Let's keep in touch</p>
    <form>
      <input type="email" placeholder="email@website.com" />
      <button type="submit">Subscribe</button>
    </form>
  </section>
);

export default Newsletter;
