import React, { useState } from 'react';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      name: 'Car Rentals',
      description: 'We offer a wide range of vehicles to suit your needs, from compact cars to luxury SUVs. Our rental process is quick and easy, ensuring you get on the road in no time.'
    },
    {
      name: 'Customer Support',
      description: 'Our customer support team is available 24/7 to assist you with any inquiries or issues you may have. We are committed to providing exceptional service to ensure your satisfaction.'
    },
    {
      name: 'Agency Partnerships',
      description: 'We partner with leading car rental agencies to bring you the best deals and a wide selection of vehicles. Our partnerships allow us to offer competitive rates and exclusive offers.'
    }
  ];

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  return (
    <div className="container mt-5">
      <h1>Our Services</h1>
      <ul>
        {services.map((service, index) => (
          <li key={index} onClick={() => handleServiceClick(service)}>
            {service.name}
          </li>
        ))}
      </ul>
      {selectedService && (
        <div className="service-description mt-3">
          <h2>{selectedService.name}</h2>
          <p>{selectedService.description}</p>
        </div>
      )}
    </div>
  );
};

export default Services;
