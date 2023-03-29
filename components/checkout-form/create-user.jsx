import { useState } from 'react';

export default function CreateUser({ setUser }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    setUser({
      name: `${firstName} ${lastName}`,
      email,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        placeholder="Last Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}
