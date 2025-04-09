import Merch from 'components/BuyTicketsPage/Merch/Merch';
import Contact from 'components/BuyTicketsPage/Contact/Contact';
import styles from './VendorTickets.module.scss';
import { useState } from 'react';
import OrderSummary from './OrderSummary/OrderSummary';

export default function VendorTickets({ products, isTicketSalesOpen }) {
  const baseFee = products.filter(product => product.name === 'Base Fee')[0];
  const [cart, setCart] = useState([baseFee]);
  const [isLoading, setIsLoading] = useState(false);

  const sortAndFilterFunctions = categories => {
    return categories
      .filter(category => {
        const categoriesToShow = [
          'Base Vendor Fee',
          'A La Carte',
          'Not staying on the property',
        ];
        if (categoriesToShow.includes(category)) return true;
      })
      .sort((a, b) => {
        if (a === 'Base Vendor Fee') return -1;
        return 1;
      });
  };
  const formattedProducts = products.map(product => {
    return {
      ...product,
      handleClick: selectedProduct => {
        setIsLoading(true);
        setTimeout(() => {
          setCart([...cart, selectedProduct]);
          setIsLoading(false);
        }, 300);
      },
    };
  });
  return (
    <>
      <main>
        <div className={styles.description}>
          <p>
            Highlands Vendors! You are at the right place! It’s now time for you
            to officially hold your spot for the 2025 Highlands Marketplace! You
            are an integral part to the success of our festival and we are so
            grateful and excited for you to join us!
          </p>

          <p>
            Your base vendor fee for 2025 is $250.00 which incudes the
            following:
          </p>
          <ul>
            <li>Admission for 2 people from your team.</li>
            <li>
              Arrival on either Friday during the day or Saturday morning by
              8am.
            </li>
            <li>Departure on Sunday or after the Marketplace on Saturday.</li>
            <li>Tenting on our main tenting field (bring your own gear)</li>
            <li>Meals provided for you the entire time you are with us.</li>
            <li>
              When you are not working your booth at the Marketplace you are
              more than welcome to enjoy the musical acts and enjoy the
              property.
            </li>
          </ul>

          <p>
            We have provided a variety of a la carte option below should you
            choose to upgrade in particular areas.
          </p>
        </div>
        <div className={styles.container}>
          <div className={styles.left}>
            {isTicketSalesOpen ? (
              <Merch
                products={formattedProducts}
                sortAndFilterFunctions={sortAndFilterFunctions}
                cart={cart}
              />
            ) : (
              <Contact />
            )}
          </div>
          <div className={styles.right}>
            <OrderSummary isLoading={isLoading} cart={cart} />
          </div>
        </div>
      </main>
    </>
  );
}
