import Layout from 'components/layout';
import Button from 'components/shared/button';

export default function BuyTickets() {
  return (
    <Layout>
      <Button
        href={{ pathname: '/checkout', query: { installments: 'false' } }}
      >
        One Time Payment
      </Button>
      <Button href={{ pathname: '/checkout', query: { installments: 'true' } }}>
        Equal Installments
      </Button>
    </Layout>
  );
}
