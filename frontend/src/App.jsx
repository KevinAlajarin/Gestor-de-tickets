import { useState, useEffect } from 'react';
import { Container, Row, Col, Navbar, Form } from 'react-bootstrap';
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';

function App() {
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState({ total: 0, abiertos: 0, resueltos: 0, en_progreso: 0 });
  const [filter, setFilter] = useState({ categoria: 'Todas', estado: 'Todos' });

  // API Calls
  const fetchTickets = async () => {
    let url = 'http://localhost:5000/api/tickets?';
    if (filter.categoria !== 'Todas') url += `categoria=${filter.categoria}&`;
    if (filter.estado !== 'Todos') url += `estado=${filter.estado}`;
    
    const res = await fetch(url);
    const data = await res.json();
    setTickets(data);
  };

  const fetchStats = async () => {
    const res = await fetch('http://localhost:5000/api/stats');
    const data = await res.json();
    setStats(data);
  };

  // Effects 
  useEffect(() => {
    fetchTickets();
    fetchStats();
  }, [filter]); // Recargar cuando cambian los filtros

  // Handlers
  const handleTicketCreated = () => {
    fetchTickets();
    fetchStats();
  };

  const handleUpdateStatus = async (id, newStatus) => {
    await fetch(`http://localhost:5000/api/tickets/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: newStatus })
    });
    fetchTickets();
    fetchStats();
  };

  const handleDelete = async (id) => {
    if(!window.confirm("¿Estás seguro de eliminar este ticket?")) return;
    await fetch(`http://localhost:5000/api/tickets/${id}`, { method: 'DELETE' });
    fetchTickets();
    fetchStats();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand href="#">🛠 HelpDesk Pro</Navbar.Brand>
          <div className="text-white">
            <span className="me-3">Abiertos: <strong>{stats.abiertos}</strong></span>
            <span className="me-3">Progreso: <strong>{stats.en_progreso}</strong></span>
            <span className="text-success">Resueltos: <strong>{stats.resueltos}</strong></span>
          </div>
        </Container>
      </Navbar>

      <Container>
        <Row>
          {/* Columna Izquierda: Formulario */}
          <Col md={4}>
            <TicketForm onTicketCreated={handleTicketCreated} />
          </Col>

          {/* Columna Derecha: Lista y Filtros */}
          <Col md={8}>
            <div className="bg-white p-3 rounded shadow-sm mb-4 flex gap-3">
                <Form.Select 
                  value={filter.categoria}
                  onChange={(e) => setFilter({...filter, categoria: e.target.value})}
                >
                  <option value="Todas">Todas las Categorías</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Software">Software</option>
                  <option value="Red">Red</option>
                </Form.Select>
                
                <Form.Select 
                  value={filter.estado}
                  onChange={(e) => setFilter({...filter, estado: e.target.value})}
                >
                  <option value="Todos">Todos los Estados</option>
                  <option value="Abierto">Abierto</option>
                  <option value="En Progreso">En Progreso</option>
                  <option value="Resuelto">Resuelto</option>
                </Form.Select>
            </div>

            <TicketList 
                tickets={tickets} 
                onUpdateStatus={handleUpdateStatus} 
                onDelete={handleDelete}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;