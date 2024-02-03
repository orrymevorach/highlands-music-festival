import Layout from 'components/layout';
import styles from './buy-tickets.module.scss';
import { calculatePricing } from 'components/checkout/checkout-utils';
import PricingContainer from './pricing-container';
import Link from 'next/link';

const fullPriceProps = {
  buttonText: 'Pay Full Amount',
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
    `${numberOfSubscriptionIterations + 1} payments of $${Math.round(
      subscriptionInstallmentAmount / 1.13
    )}, spread across ${numberOfSubscriptionIterations} months`,
    'No interest charge for future payments',
  ],
});

export default function BuyTickets({ priceModel }) {
  const pricing = calculatePricing({ priceData: priceModel });
  const { subscriptionInstallmentAmount, numberOfSubscriptionIterations } =
    pricing;

  // This happens in September
  const isSubscriptionPaymentsEnabled =
    priceModel.numberOfSubscriptionIterations !== 0;
  return (
    <Layout hideTopMargin>
      <div className={styles.announcement}>
        <p className={styles.aboutText}>About Cabin Reservations:</p>
        <p>
          Cabin and bed reservations are important to us! Closer to the
          festival, all attendees who purchased tickets will have an opportunity
          to reserve a spot in a cabin with their friends. For more information
          on cabin reservations and other frequently asked questions,{' '}
          <Link href="/faq">click here</Link>.
        </p>
      </div>
      <div className={styles.buyTickets}>
        <PricingContainer {...fullPriceProps} pricing={pricing} />
        {isSubscriptionPaymentsEnabled && (
          <PricingContainer
            {...getInstallmentsProps({
              subscriptionInstallmentAmount,
              numberOfSubscriptionIterations,
            })}
            pricing={pricing}
          />
        )}
      </div>
    </Layout>
  );
}
