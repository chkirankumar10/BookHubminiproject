import {FaInstagram, FaTwitter, FaGoogle, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="Footer-container">
    <div>
      <FaGoogle className="footer-icon" />
      <FaTwitter className="footer-icon" />
      <FaInstagram className="footer-icon" />
      <FaYoutube className="footer-icon" />
    </div>
    <p className="Footer-heading">Contact us</p>
  </div>
)

export default Footer
