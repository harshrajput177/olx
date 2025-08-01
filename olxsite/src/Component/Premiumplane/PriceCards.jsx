// src/components/PricingCards.jsx
import React from 'react';
import './PricingCards.css'; // external CSS file

const plans = [
  {
    name: 'Basic',
    price: '₹199',
    duration: '30 days',
    listings: '3 Listings',
    live: 'Live for 30 days',
    highlight: '',
    color: 'basic'
  },
  {
    name: 'Silver',
    price: '₹499',
    duration: '30 days',
    listings: '6 Listings',
    live: 'Live for 30 days',
    highlight: 'Highlighted in Blue',
    color: 'silver'
  },
  {
    name: 'Gold',
    price: '₹1500',
    duration: '45 days',
    listings: '10 Listings',
    live: 'Live for 45 days',
    highlight: 'Highlighted in Gold',
    color: 'gold'
  },
  {
    name: 'OEM Plan',
    price: 'Custom',
    duration: 'Annually',
    listings: 'Dedicated OEM Page',
    live: 'Direct Lead Generation',
    highlight: 'Priority Support, Customizable Branding',
    color: 'oem'
  }
];

const PricingCards = () => {
  return (
    <div className="premium-pricing-container">
      {plans.map((plan, index) => (
        <div key={index} className={`premium-card ${plan.color}`}>
          <h2>{plan.name}</h2>
          <h3>{plan.price} <span> / {plan.duration}</span></h3>
          <ul>
            <li>✅{plan.listings}</li>
            <li>✅{plan.live}</li>
            {plan.highlight && <li>✅{plan.highlight}</li>}
          </ul>
          <button>{plan.name === "OEM Plan" ? "Contact Sales" : "Choose Plan"}</button>
        </div>
      ))}
    </div>
  );
};

export default PricingCards;
