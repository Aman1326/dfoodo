import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const TermsOfuse = () => {
  return (
    <div className="howitworks_wrapper">
      <Header />
      <div className="container-lg">
        <div className="terms_imageContainer">
          <div className="center_text_wrapper headingMargin">
            <h3>Privacy Policy</h3>
          </div>
        </div>
      </div>

      <div className="container-lg privacy_policy_headingContainer">
        <div className="termsAndConditions_points privacyPolicy_points">
          <ul>
            <li>
              1.User Accounts and Registration
              <ul>
                <li>
                  1.1. You must be at least 18 years old to create an account on
                  the App.
                </li>
                <li>
                  1.2. You are responsible for maintaining the confidentiality
                  of your account credentials and for all activities that occur
                  under your account.
                </li>
              </ul>
            </li>
            <li>
              2. Ordering and Purchasing
              <ul>
                <li>
                  2.1. To place an order through the App, you must provide
                  accurate and up-to-date information.
                </li>
                <li>
                  2.2. We accept payments through various methods, and you may
                  be subject to additional fees depending on your chosen payment
                  method.
                </li>
              </ul>
            </li>
            <li>
              3. Product Listings and Descriptions
              <ul>
                <li>
                  3.1. Product listings on the App are for informational
                  purposes only and may not always accurately represent the
                  actual products.
                </li>
                <li>
                  3.2. We reserve the right to limit the quantity of products
                  available for purchase and to discontinue any product at any
                  time.
                </li>
              </ul>
            </li>
            <li>
              4. Shipping and Delivery
              <ul>
                <li>
                  4.1. Shipping methods, costs, and delivery times may vary
                  depending on your location and the products ordered.
                </li>
                <li>
                  4.2. We are not liable for any delays or issues with delivery
                  services.
                </li>
              </ul>
            </li>
            <li>
              5. Returns and Refunds
              <ul>
                <li>
                  5.1. You may return products purchased through the App within
                  30 days of receipt for a full refund, subject to certain
                  conditions.
                </li>
                <li>
                  5.2. Refunds will be issued within 15 days after the returned
                  product is received and inspected.
                </li>
              </ul>
            </li>
            <li>
              6. Intellectual Property
              <ul>
                <li>
                  6.1. All content and materials available on the App, including
                  trademarks, logos, and copyrighted materials, are the property
                  of ShopUp or its licensors.
                </li>
                <li></li>
                6.2. You may not use, reproduce, or distribute any content from
                the App without our prior written consent.
              </ul>
            </li>
            <li>
              7. Privacy Policy
              <ul>
                <li>
                  7.1. Your use of the App is subject to our Privacy Policy,
                  which outlines how we collect, use, and protect your personal
                  information.
                </li>
                <li>
                  7.2. By using the App, you consent to the terms of our Privacy
                  Policy.
                </li>
              </ul>
            </li>
            <li>
              8. Liability and Disclaimers
              <ul>
                <li>
                  8.1. We are not liable for any damages arising from the use of
                  the App or the products purchased through it, except where
                  prohibited by law.
                </li>
                <li>
                  8.2. We make no warranties or representations regarding the
                  quality, accuracy, or availability of products and services
                  offered on the App.
                </li>
              </ul>
            </li>
            <li>
              9. Governing Law and Dispute Resolution
              <ul>
                <li>
                  9.1. These Terms shall be governed by and construed in
                  accordance with the laws of India.
                </li>
                <li>
                  9.2. Any disputes arising from or relating to these Terms
                  shall be resolved exclusively through binding arbitration in
                  Bhopal, MP, conducted in accordance with the rules of the
                  Indian Arbitration and Conciliation Board. Each party shall
                  bear its own costs of arbitration, and the arbitrator's
                  decision shall be final and binding upon the parties.
                </li>
              </ul>
            </li>
            <li>
              10. Updates and Amendments
              <ul>
                <li>
                  10.1. We reserve the right to update or modify these Terms at
                  any time without prior notice.
                </li>
                <li>
                  10.2. Any changes to these Terms will be effective immediately
                  upon posting on the App.
                </li>
              </ul>
            </li>
            <li>
              11. Contact Information
              <ul>
                <li>
                  11.1. If you have any questions or concerns about these Terms,
                  please contact us at [Your Contact Information].
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfuse;
