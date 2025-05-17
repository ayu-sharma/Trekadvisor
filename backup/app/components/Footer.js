import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div id="endjadoo">
          <h2>Jadoo</h2>
          <h4>
            Book your trip in minute, get full Control for much longer.
          </h4>
        </div>
        <div className="footer-links">
          <div className="footer-section">
            <h3>Company</h3>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/careers">Careers</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <ul>
              <li><Link href="/help">Help/FAQ</Link></li>
              <li><Link href="/affiliates">Affiliates</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>More</h3>
            <ul>
              <li><Link href="/airlinefees">Airlinefees</Link></li>
              <li><Link href="/airline">Airline</Link></li>
              <li><Link href="/lowfare">Low fare tips</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="endline">
        <h3>All rights reserved @jadoo.co</h3>
      </div>
    </footer>
  );
};

export default Footer; 