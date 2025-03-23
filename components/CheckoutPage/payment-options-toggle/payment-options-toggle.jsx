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
    id: recordId,
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
        type: actions.SET_SUBSCRIPTION,
        subscriptionData: {
          subscriptionInstallmentAmount: '',
          subscriptionId: '',
          numberOfSubscriptionIterations: 0,
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
      type: actions.SET_SUBSCRIPTION,
      subscriptionData: {
        subscriptionInstallmentAmount: price,
        subscriptionId,
        numberOfSubscriptionIterations: parseFloat(
          numberOfSubscriptionIterations
        ),
        recordId,
      },
    });
  };

  const subscriptionOptions = priceData?.subscriptionOptions || [];
  const options = [
    {
      label: 'Pay In Full',
    },
    ...subscriptionOptions,
  ];
  const defaultPaymentOptionLabel =
    router.query.installments === 'true' ? options[1].label : options[0].label;
  return (
    <Toggle
      name="payment-Options"
      options={options}
      handleClick={handleClick}
      defaultOption={defaultPaymentOptionLabel}
    />
  );
}
