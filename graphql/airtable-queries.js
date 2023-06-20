import { gql } from '@apollo/client';

export const INSERT_TICKET = gql`
  mutation InserTicket(
    $name: String
    $fullName: String
    $paymentIntent: String
    $status: String
    $discountCode: String
    $amount: Float
    $emailAddress: String
    $environment: String
  ) {
    insert_ticketPurchasesDevelopmentMode(
      name: $name
      fullName: $fullName
      paymentIntent: $paymentIntent
      status: $status
      discountCode: $discountCode
      amount: $amount
      emailAddress: $emailAddress
      environment: $environment
    ) {
      id
    }
  }
`;
