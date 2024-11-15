import { useCheckoutContext } from 'context/checkout-context';
import { PAGE_SLUGS } from 'utils/constants';
import { useRouter } from 'next/router';
import Toggle from './toggle';

export default function PaymentOptionsToggle() {
  const router = useRouter();
  const { priceData, dispatch, actions } = useCheckoutContext();

  const handleClick = ({
    subscriptionId,
    price,
    numberOfSubscriptionIterations,
  }) => {
    // for one-time payment
    if (!subscriptionId) {
      router.push(
        {
          pathname: PAGE_SLUGS.CHECKOUT,
          query: {
            productId: priceData.id,
          },
        },
        undefined,
        { shallow: true }
      );

      dispatch({
        type: actions.SET_PRICING,
        pricing: {
          ...priceData,
          subscriptionInstallmentAmount: '',
          subscriptionId: '',
        },
      });
      return;
    }
    // for subscription payments
    router.push(
      {
        pathname: PAGE_SLUGS.CHECKOUT,
        query: {
          productId: priceData.id,
          installments: true,
        },
      },
      undefined,
      { shallow: true }
    );

    dispatch({
      type: actions.SET_PRICING,
      pricing: {
        ...priceData,
        subscriptionInstallmentAmount: price,
        subscriptionId,
        numberOfSubscriptionIterations: parseFloat(
          numberOfSubscriptionIterations
        ),
      },
    });
  };

  const options = [
    {
      label: 'Pay In Full',
    },
    ...priceData.subscriptionOptions,
  ];
  const defaultPaymentOption =
    router.query.installments === 'true' ? options[1].label : options[0].label;
  return (
    <Toggle
      name="payment-Options"
      options={options}
      handleClick={handleClick}
      defaultOption={defaultPaymentOption}
    />
  );
}
