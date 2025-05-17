import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Destinations = () => {
  return (
    <div className="destinations-section">
      <div className="top">
        <h4>TOP SELLING</h4>
        <h3>Top Destinations</h3>
      </div>
      <div className="places" id="places">
        <div className="destination-card">
          <Link href="#">
            <Image src="/images/6.jpg" alt="Van Vihar" width={300} height={320} />
            <p className="img-down">
              Van Vihar National Park and Zoo is one of the most revered National Park and
              Zoo of Central India and is a shining beacon in the field of conservation.
              It is an amazing world of winged creatures, free ranging ungulates and
              captive carnivores in the midst of greenery.
            </p>
            <h4>Van Vihar</h4>
          </Link>
        </div>
        <div className="destination-card">
          <Link href="#">
            <Image src="/images/7.png" alt="Boat Club" width={300} height={320} />
            <p className="img-down">
              This is the place from where you can hire paddle boat, speed boat or even a
              canoe for the lake. In the evenings the tourist department runs a ferry
              where you can enjoy nice music along with snacks. Yatching facility is
              available too.
            </p>
            <h4>Boat Club</h4>
          </Link>
        </div>
        <div className="destination-card">
          <Link href="#">
            <Image src="/images/8.jpeg" alt="Sanchi Stupa" width={300} height={320} />
            <p className="img-down">
              The town of Sanchi is synonymous with Buddhist Stupas - hemispherical
              structures typically containing relics of the Buddha or his followers. The
              Stupas of Sanchi were constructed on the orders of Emperor Ashoka to
              preserve and spread the Buddhist philosophy.
            </p>
            <h4>Sanchi Stupa</h4>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Destinations; 