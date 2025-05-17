import React from 'react';
import Button from './hero/Button';

const Subscribe = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="subscribe">
      <div className="sub">
        <h2 className="subtext">
          Subscribe to get information, latest news and other interesting offers
        </h2>
        <div className="email">
          <form id="form" onSubmit={handleSubmit}>
            <input
              type="email"
              id="query"
              name="q"
              placeholder="Enter your Email..."
              required
            />
            <Button type="submit" variant="primary" id="btn">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Subscribe; 