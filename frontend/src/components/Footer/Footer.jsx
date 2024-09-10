import './Footer.css';
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
        <h3 id='meet-developer-text'>Meet the Developer</h3>
        <div className="developer-info">
          {/* Corrected image path */}
          <img src="/Laiba-Headshot.jpg" alt="Developer" className="developer-photo" />
          <div>
            <p className='developer-name'>Laiba Afzal</p>
            <div className="social-links">
              <a href="https://github.com/lai-baa">
                  <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/laibaafzal">
                  <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
    </footer>
  );
}

export default Footer;
