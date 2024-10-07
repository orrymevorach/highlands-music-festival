import styles from './quantity.module.scss';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCheckoutContext } from 'context/checkout-context';
import { calculatePricing } from '../checkout-utils';
import Loader from 'components/shared/Loader/Loader';
import Button from 'components/shared/ButtonComp/Button';

export default function Quantity() {
  const [dropdownQuantity, setDropdownQuantity] = useState('');
  const { priceData, dispatch, actions } = useCheckoutContext();
  const [isLoading, setIsLoading] = useState(false);

  // This is temporary until we add quantity back
  useEffect(() => {
    const pricing = calculatePricing({
      quantity: 1,
      priceData,
    });
    dispatch({
      type: actions.SET_QUANTITY,
      quantity: 1,
      pricing,
    });
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const pricing = calculatePricing({
        quantity: dropdownQuantity,
        priceData,
      });
      dispatch({
        type: actions.SET_QUANTITY,
        quantity: dropdownQuantity,
        pricing,
      });
    }, 500);
  }

  if (isLoading) return <Loader centerInContainer />;
  return; // This is temporary until we add quantity back

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
      <Button>Continue</Button>
    </form>
  );
}
