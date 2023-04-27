import Layout from 'components/layout';
import styles from './buy-tickets.module.scss';
import { calculatePricing } from 'components/checkout/checkout-utils';
import PricingContainer from './pricing-container';

const fullPriceProps = {
  buttonText: 'Pay Full Price',
  query: {
    installments: 'false',
  },
  details: [
    'Pay the full amount in one single transaction',
    'No future payments',
  ],
};
const getInstallmentsProps = ({
  subscriptionInstallmentAmount,
  numberOfSubscriptionIterations,
}) => ({
  buttonText: 'Pay in Monthly Installments',
  query: {
    installments: 'true',
  },
  details: [
    `4 payments of $${Math.round(
      subscriptionInstallmentAmount / 1.13
    )}, spread across ${numberOfSubscriptionIterations} months`,
    'No interest charge for future payments',
  ],
});

export default function BuyTickets({ priceModel }) {
  const pricing = calculatePricing({ priceData: priceModel });
  const { subscriptionInstallmentAmount, numberOfSubscriptionIterations } =
    pricing;
  return (
    <Layout>
      <div className={styles.buyTickets}>
        <PricingContainer {...fullPriceProps} pricing={pricing} />
        <PricingContainer
          {...getInstallmentsProps({
            subscriptionInstallmentAmount,
            numberOfSubscriptionIterations,
          })}
          pricing={pricing}
        />
      </div>
    </Layout>
  );
}
