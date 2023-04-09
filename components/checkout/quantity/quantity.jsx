import styles from './quantity.module.scss';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { useCheckoutContext } from 'context/checkout-context';
import { calculatePricing } from '../checkout-utils';
import Loader from 'components/loader';

export default function Quantity() {
  const [dropdownQuantity, setDropdownQuantity] = useState('');
  const { priceData, dispatch, actions } = useCheckoutContext();
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const pricing = calculatePricing({
        quantity: dropdownQuantity,
        priceData,
        initialTicketPrice: priceData.initialPaymentAmount * dropdownQuantity,
      });
      dispatch({
        type: actions.SET_QUANTITY,
        quantity: dropdownQuantity,
        pricing,
      });
    }, 500);
  }

  if (isLoading) return <Loader centerInContainer />;

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <div className={styles.dropdownContainer}>
        <InputLabel id="quantity-label">
          Highlands Music Festival Tickets{' '}
          <span className={styles.times}>x</span>
        </InputLabel>
        <Select
          labelId="quantity-label"
          id="quantity"
          value={dropdownQuantity}
          onChange={e => setDropdownQuantity(e.target.value)}
          className={styles.dropdown}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
        </Select>
      </div>
      <button className={styles.button} type="submit">
        Continue
      </button>
    </form>
  );
}
