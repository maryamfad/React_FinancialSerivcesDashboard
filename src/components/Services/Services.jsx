import React from 'react';
import ServiceCard from './ServiceCard';
import './Services.css'; 

function Services() {
    const services = [
        { title: "Account Aggregation", description: "Link and view all your financial accounts in one place." },
        { title: "Portfolio Management", description: "Manage your investments and monitor performance." },
        { title: "Financial Planning", description: "Tools for long-term financial goals and scenario modeling." },
        { title: "Risk Assessment", description: "Evaluate your investment strategy with your risk tolerance." },
        { title: "Tax Optimization", description: "Strategies to minimize tax liabilities and optimize savings." }
    ];

    return (
        <div className="services-container">
            {services.map(service => (
                <ServiceCard key={service.title} title={service.title} description={service.description} />
            ))}
        </div>
    );
}

export default Services;