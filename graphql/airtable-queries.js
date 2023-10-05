import { gql } from '@apollo/client';

export const INSERT_TICKET = gql`
  mutation InserTicket(
    $name: String
    $paymentIntent: String
    $status: String
    $discountCode: String
    $amount: Float
    $emailAddress: String
    $fullTicketPrice: Float
  ) {
    insert_ticketPurchases2024(
      name: $name
      paymentIntent: $paymentIntent
      status: $status
      discountCode: $discountCode
      amount: $amount
      emailAddress: $emailAddress
      fullTicketPrice: $fullTicketPrice
    ) {
      id
    }
  }
`;

export const INSERT_TICKET_DEVELOPMENT_MODE = gql`
  mutation InserTicket(
    $name: String
    $paymentIntent: String
    $status: String
    $discountCode: String
    $amount: Float
    $emailAddress: String
  ) {
    insert_ticketPurchasesDevelopmentMode(
      name: $name
      paymentIntent: $paymentIntent
      status: $status
      discountCode: $discountCode
      amount: $amount
      emailAddress: $emailAddress
    ) {
      id
    }
  }
`;
