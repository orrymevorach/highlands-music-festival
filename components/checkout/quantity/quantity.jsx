import styles from './quantity.module.scss';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { useCheckoutContext } from 'context/checkout-context';
import Loader from 'components/loader';

export default function Quantity() {
  const [dropdownQuantity, setDropdownQuantity] = useState('');
  const { quantity, setQuantity } = useCheckoutContext();
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setQuantity(dropdownQuantity);
    }, 500);
  }

  if (quantity) return;
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
