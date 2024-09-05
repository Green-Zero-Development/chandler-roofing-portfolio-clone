'use client';

import styled from 'styled-components';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function getButtonLink(linkToWhere, onSiteLink, offSiteLink, fileLink) {
    switch (linkToWhere) {
      case "A page on this site":
        return (onSiteLink);
      case "Another site":
        return (offSiteLink);
      case "A file":
        return (fileLink);
      default:
        return ('/');
    }
}

const Section = styled.div`
    .wrapper {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 5rem;
      max-width: 1250px;
      margin: 0 auto;
      padding: 100px 16px 100px 16px;
      @media (min-width: 768px) {
          grid-template-columns: repeat(2, 1fr);
      }
      .content {
        h5 {
          font-family: var(--font-bebas-neue),sans-serif;
          font-size: 60px;
          margin-bottom: 1rem;
        }
        p {
          font-family: var(--font-lato),sans-serif;
          font-size: 20px;
          margin-bottom: 2rem;
        }
        .contact-group {
          margin-bottom: 2rem;
          h6 {
            font-family: var(--font-lato),sans-serif;
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;
            color: #D12127;
            letter-spacing: 1px;
            padding-bottom: 8px;
          }
          address {
            font-family: var(--font-bebas-neue),sans-serif;
            font-size: 24px;
            text-decoration: none;
            font-style: unset;
            line-height: 1;
          }
          a {
            font-family: var(--font-bebas-neue),sans-serif;
            font-size: 24px;
            text-decoration: none;
          }
      }
      ul {
        display: flex;
        align-items: center;
        gap: 2rem;
      }
    }
`;

export default function Page({ scheduleEstimateCta, address, phone, email }) {

    useEffect(() => {
        Cognito.load("forms", { id: "80" });
    }, []);

    return (
        <Section>
            <div className="wrapper">
              <div className="content">
                <h5>{scheduleEstimateCta.acf.title}</h5>
                <p>{scheduleEstimateCta.acf.paragraph}</p>
                <div className="contact-group">
                  <h6>Address</h6>
                  <address>{address.street}, {address.city}, {address.state} {address.zip}</address>
                </div>
                <div className="contact-group">
                  <h6>Phone</h6>
                  <a href={`tel:${phone.value}`}>{phone.value}</a>
                </div>
                <div className="contact-group">
                  <h6>Email</h6>
                  <a href={`mailto:${email.value}`}>{email.value}</a>
                </div>
                <ul>
                  {scheduleEstimateCta.acf.award.map((item, index) => {
                          return (
                              <li key={index}>
                                <Image src={item.image.url} alt={item.image.alt} width={150} height={150} />
                              </li>
                          );
                  })}
                </ul>
              </div>
              <div>
                <div className="cognito">
                    <div className="loader">Form loading...</div>
                </div>
              </div>
            </div>
        </Section>
    );
}
