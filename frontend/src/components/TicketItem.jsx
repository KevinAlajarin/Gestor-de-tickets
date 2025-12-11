import { Badge, Button } from 'react-bootstrap';

const TicketItem = ({ ticket, onUpdateStatus, onDelete }) => {
  // Logica de estilos condicionales
  const statusStyles = {
    'Abierto': 'bg-red-50 border-l-4 border-red-500',
    'En Progreso': 'bg-yellow-50 border-l-4 border-yellow-500',
    'Resuelto': 'bg-green-50 border-l-4 border-green-500'
  };

  const badgeVariant = {
    'Abierto': 'danger',
    'En Progreso': 'warning',
    'Resuelto': 'success'
  };

  return (
    <div className={`mb-3 p-3 rounded shadow-sm transition-all hover:shadow-md ${statusStyles[ticket.estado]}`}>
      <div className="flex justify-between items-start">
        <div>
          <h5 className="font-bold text-gray-800">{ticket.titulo}</h5>
          <Badge bg={badgeVariant[ticket.estado]} className="mb-2 me-2">{ticket.categoria}</Badge>
          <p className="text-gray-600 text-sm mb-1">{ticket.descripcion}</p>
          <small className="text-gray-400">ID: {ticket.id}</small>
        </div>
        
        <div className="flex flex-col gap-2">
            {/* Boton Resolver */}
            {ticket.estado !== 'Resuelto' && (
                <Button 
                    size="sm" 
                    variant="outline-success"
                    onClick={() => onUpdateStatus(ticket.id, 'Resuelto')}
                >
                    ✓ Resolver
                </Button>
            )}
            
            {/* Boton Progreso */}
            {ticket.estado === 'Abierto' && (
                <Button 
                    size="sm" 
                    variant="outline-warning"
                    onClick={() => onUpdateStatus(ticket.id, 'En Progreso')}
                >
                    ⚙ Progreso
                </Button>
            )}
            
            {/* Boton Eliminar */}
            <Button 
                size="sm" 
                variant="outline-danger"
                onClick={() => onDelete(ticket.id)}
            >
                🗑
            </Button>
        </div>
      </div>
    </div>
  );
};

export default TicketItem;