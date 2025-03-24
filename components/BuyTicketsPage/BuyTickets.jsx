import Merch from 'components/BuyTicketsPage/Merch/Merch';
import Contact from 'components/BuyTicketsPage/Contact/Contact';

export default function BuyTickets({ products, isTicketSalesOpen }) {
  const sortAndFilterFunctions = categories => {
    return categories
      .filter(category => {
        const categoriesToShow = [
          'Ticket',
          'Cabin in Colours',
          'Cabin in Comics',
          'Cabin in Zodiacs',
        ];
        if (category === 'Test Mode' && process.env.NODE_ENV !== 'production')
          return true;
        if (categoriesToShow.includes(category)) return true;
      })
      .sort((a, b) => {
        if (a === 'Ticket') return -1;
        return 1;
      });
  };
  return (
    <main>
      {isTicketSalesOpen ? (
        <Merch
          products={products}
          sortAndFilterFunctions={sortAndFilterFunctions}
        />
      ) : (
        <Contact />
      )}
    </main>
  );
}
