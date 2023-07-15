import React from 'react'
import "./footer.css"
function Footer() {
  return (
  <>
  <footer className="footer">
  <div className="footer-container">
    <div className="footer-row">
      <div className="footer-col">
        <h4 className="footer-title">3Nile</h4>
        <ul>
          <li>
            <a href="#">about us</a>
          </li>
          <li>
            <a href="#">our services</a>
          </li>
          <li>
            <a href="#">privacy policy</a>
          </li>
          <li>
            <a href="#">affiliate program</a>
          </li>
        </ul>
      </div>
      <div className="footer-col">
        <h4 className="footer-title">get help</h4>
        <ul>
          <li>
            <a href="#">FAQ</a>
          </li>
          <li>
            <a href="#">shipping</a>
          </li>
          <li>
            <a href="#">returns</a>
          </li>
          <li>
            <a href="#">order status</a>
          </li>
          <li>
            <a href="#">payment options</a>
          </li>
        </ul>
      </div>
      <div className="footer-col">
        <h4 className="footer-title">Book Trip</h4>
        <ul>
          <li>
            <a href="#">3Nile Bus</a>
          </li>
          <li>
            <a href="#">3Nile Vip</a>
          </li>
          <li>
            <a href="#">3Nile</a>
          </li>
        
        </ul>
      </div>
      <div className="footer-col">
        <h4 className="footer-title">follow us</h4>
        <div className="footer-social-links">
          <a href="#">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#">
            <i className="fab fa-twitter" />
          </a>
          <a href="#">
            <i className="fab fa-instagram" />
          </a>
         
        </div>
      </div>
    </div>
  </div>
</footer>

  </>
  )
}

export default Footer