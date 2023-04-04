import { useState, useEffect } from 'react';

export default function useGetStripeCustomer({ user }) {
  const [customer, setCustomer] = useState(null);
  useEffect(() => {
    const getCustomer = async () => {
      const customerResponse = await fetch('/api/get-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user }),
      }).then(res => res.json());
      setCustomer(customerResponse);
    };
    if (user.email) {
      getCustomer();
    }
  }, [user]);
  return customer;
}
