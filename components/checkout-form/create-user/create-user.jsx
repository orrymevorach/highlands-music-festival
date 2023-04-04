import { useState } from 'react';
import Input from '@mui/joy/Input';
import { InputLabel, MenuItem, Select } from '@mui/material';

export default function CreateUser({ setOrderDetails }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = () => {
    setOrderDetails({
      user: {
        name: `${firstName} ${lastName}`,
        email,
      },
      quantity,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        placeholder="First Name"
        required
      />
      <Input
        type="text"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        placeholder="Last Name"
        required
      />

      <Input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <div>
        <InputLabel id="quantity-label">Quantity</InputLabel>
        <Select
          labelId="quantity-label"
          id="quantity"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
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
      <button type="submit">Submit</button>
    </form>
  );
}
