import Merch from 'components/BuyTicketsPage/Merch/Merch';
import Contact from 'components/BuyTicketsPage/Contact/Contact';

export default function VendorTickets({ products, isTicketSalesOpen }) {
  return (
    <>
      <main>
        {isTicketSalesOpen ? (
          <Merch products={products} title="Vendor Ticket Options" />
        ) : (
          <Contact />
        )}
      </main>
    </>
  );
}
