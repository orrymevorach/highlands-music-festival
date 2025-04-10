import Merch from 'components/BuyTicketsPage/Merch/Merch';
import Contact from 'components/BuyTicketsPage/Contact/Contact';
import styles from './VendorTickets.module.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import VendorOrderSummary from './VendorOrderSummary/VendorOrderSummary';
import { VendorLayout } from 'components/VendorSubmissionPage/VendorSubmission';
import Information from 'components/VendorSubmissionPage/Information/Information';
import Button from 'components/shared/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const informationData = [
  {
    heading: 'Highlands Vendors!',
    text: 'You are at the right place! It’s now time for you to officially hold your spot for the 2025 Highlands Marketplace! You are an integral part to the success of our festival and we are so grateful and excited for you to join us!',
  },
  {
    heading: 'Base fee is $250.00, and includes:',
    listItems: [
      'Admission for 2 people from your team.',
      'Arrival on either Friday during the day or Saturday morning by 8am.',
      'Departure on Sunday or after the Marketplace on Saturday.',
      'Tenting on our main tenting field (bring your own gear)',
      'Meals provided for you the entire time you are with us.',
      'When you are not working your booth at the Marketplace you are more than welcome to enjoy the musical acts and enjoy the property.',
    ],
  },
  {
    heading: 'a la carte options:',
    listItems: [
      'Thursday Night',
      'Cabin Upgrade',
      'Hotel Upgrade (off property)',
    ],
  },
];

export default function VendorTickets({ products, isTicketSalesOpen }) {
  const baseFee = products.filter(product => product.name === 'Base Fee')[0];
  const [cart, setCart] = useState([baseFee]);
  const purchaseRef = useRef(null);
  const [formattedProducts, setFormattedProducts] = useState(products);

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

  const handleAddToCart = useCallback(
    selectedProduct => {
      // Check if already in cart
      if (cart.some(cartProduct => cartProduct.name === selectedProduct.name)) {
        alert('This item is already in your cart');
        return;
      }

      // Mark selected product as loading
      setFormattedProducts(prevProducts =>
        prevProducts.map(product =>
          product.name === selectedProduct.name
            ? { ...product, isLoading: true }
            : product
        )
      );

      setTimeout(() => {
        setCart(prevCart => [...prevCart, selectedProduct]);
        // Re-apply formatted products with handleAddToCart attached
        setFormattedProducts(
          products.map(product => ({
            ...product,
            handleAddToCart,
            handleRemoveFromCart,
            isLoading: false,
          }))
        );
      }, 300);
    },
    [cart, products] //
  );

  const handleRemoveFromCart = useCallback(selectedProduct => {
    // Mark selected product as loading
    setFormattedProducts(prevProducts =>
      prevProducts.map(product =>
        product.name === selectedProduct.name
          ? { ...product, isLoading: true }
          : product
      )
    );
    setTimeout(() => {
      setCart(prevCart =>
        prevCart.filter(
          cartProduct => cartProduct.name !== selectedProduct.name
        )
      );
      // Re-apply formatted products with handleAddToCart attached
      setFormattedProducts(
        products.map(product => ({
          ...product,
          handleAddToCart,
          handleRemoveFromCart,
          isLoading: false,
        }))
      );
    }, 300);
  }, []);

  useEffect(() => {
    if (!products) return;

    setFormattedProducts(
      products.map(product => ({
        ...product,
        handleAddToCart,
        handleRemoveFromCart,
        isLoading: false,
      }))
    );
  }, [products, handleAddToCart, handleRemoveFromCart]);

  return (
    <main>
      <div className={styles.outerContainer}>
        <VendorLayout>
          <div className={styles.informationContainer}>
            {informationData.map(informationItem => (
              <Information {...informationItem} key={informationItem.heading} />
            ))}
            <Button
              classNames={styles.button}
              isDarkBeige
              handleClick={() =>
                purchaseRef.current.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Continue to buy tickets{' '}
              <FontAwesomeIcon icon={faArrowRight} size="sm" />
            </Button>
          </div>
          <div className={styles.purchaseContainer} ref={purchaseRef}>
            <div className={styles.left}>
              {isTicketSalesOpen ? (
                <Merch
                  products={formattedProducts}
                  sortAndFilterFunctions={sortAndFilterFunctions}
                  cart={cart}
                  categoryTitleClassNames={styles.categoryTitle}
                />
              ) : (
                <Contact />
              )}
            </div>
            <div className={styles.right}>
              <VendorOrderSummary cart={cart} />
            </div>
          </div>
        </VendorLayout>
      </div>
    </main>
  );
}
