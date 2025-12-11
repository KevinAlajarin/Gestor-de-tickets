import TicketItem from './TicketItem';

const TicketList = ({ tickets, onUpdateStatus, onDelete }) => {
  if (tickets.length === 0) {
    return <div className="text-center p-5 text-gray-500">No hay tickets que coincidan con los filtros.</div>;
  }

  return (
    <div className="ticket-list">
      {tickets.map(ticket => (
        <TicketItem 
            key={ticket.id} 
            ticket={ticket} 
            onUpdateStatus={onUpdateStatus}
            onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TicketList;