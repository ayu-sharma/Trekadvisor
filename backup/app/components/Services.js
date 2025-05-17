import React from 'react';
import Image from 'next/image';

const Services = () => {
  return (
    <div className="services-section">
      <div className="categories">
        <div className="cat">
          <h4>CATEGORY</h4>
          <h2>We Offer Best Services</h2>
        </div>
      </div>
      <div className="services">
        <div className="service-card">
          <Image src="/images/4.png" alt="Calculated Weather" width={50} height={50} />
          <h3>Calculated Weather</h3>
          <h4>Built Wicket longer admire do barton vanity itself do in it.</h4>
        </div>
        <div className="service-card">
          <Image src="/images/5.png" alt="Best Flights" width={50} height={50} />
          <h3>Best Flights</h3>
          <h4>Engrossed listening. Park gate sell they west hard for the.</h4>
        </div>
        <div className="service-card">
          <Image src="/images/3.png" alt="Local Events" width={50} height={50} />
          <h3>Local Events</h3>
          <h4>Barton vanity itself do in it. Preferd to men it engrossed listening.</h4>
        </div>
        <div className="service-card">
          <Image src="/images/2.png" alt="Customization" width={50} height={50} />
          <h3>Customization</h3>
          <h4>We deliver outsourced aviation services for military customers</h4>
        </div>
      </div>
    </div>
  );
};

export default Services; 