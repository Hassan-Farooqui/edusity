import React, { useState } from 'react';
import './Contact.css';
import msg_icon from '../../assets/msg-icon.png';
import mail_icon from '../../assets/mail-icon.png';
import phone_icon from '../../assets/phone-icon.png';
import location_icon from '../../assets/location-icon.png';
import white_arrow from '../../assets/white-arrow.png';
import ReCAPTCHA from 'react-google-recaptcha';

const Contact = () => {
  const [result, setResult] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null); // To store the reCAPTCHA response

  const onSubmit = async (event) => {
    event.preventDefault();

    // Check if reCAPTCHA was completed
    if (!captchaToken) {
      setResult("Please complete the CAPTCHA.");
      return;
    }

    setResult("Sending....");
    const formData = new FormData(event.target);
    formData.append("access_key", "4b05cf46-6582-4231-8fbc-9bdb6c1aef16"); // Replace with your actual access key
    formData.append("g-recaptcha-response", captchaToken); // Send the reCAPTCHA token

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
        setCaptchaToken(null); // Reset captcha after successful submission
      } else {
        console.error("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setResult("An error occurred while submitting the form.");
    }
  };

  // Handle reCAPTCHA response
  const handleCaptchaChange = (value) => {
    setCaptchaToken(value);
  };

  return (
    <div className='contact'>
      <div className="contact-col">
        <h3>Send us a message <img src={msg_icon} alt="" /></h3>
        <p>Feel free to reach out through contact form or find our contact information below. Your feedback, questions, and suggestions are important to us as we strive to provide exceptional service to our university community.</p>
        <ul>
          <li><img src={mail_icon} alt="" />Contact@GreatStack.dev</li>
          <li><img src={phone_icon} alt="" />312-3425-654</li>
          <li><img src={location_icon} alt="" />Dummy Address</li>
        </ul>
      </div>
      <div className="contact-col">
        <form onSubmit={onSubmit}>
          <label>Your Name</label>
          <input type="text" name='name' placeholder='Enter Your Name' required />
          <label>Phone Number</label>
          <input type="tel" name='phone' placeholder='Enter Your Mobile Number' required />
          <label>Message</label>
          <textarea name="message" rows="6" placeholder='Enter your message' required></textarea>

          {/* Google reCAPTCHA Element */}
          <ReCAPTCHA
            sitekey="6LdnklwqAAAAAIWj1bHwx3AcaFCN8gYVENR9-F0w"  // Replace with your actual site key
            onChange={handleCaptchaChange}
          />

          <button type='submit' className='btn dark-btn'>Submit Now <img src={white_arrow} alt="" /></button>
        </form>
        <span>{result}</span>
      </div>
    </div>
  );
};

export default Contact;
