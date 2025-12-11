import { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';

const TicketForm = ({ onTicketCreated }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    categoria: 'Hardware',
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Error al crear ticket');

      const data = await response.json();
      onTicketCreated(data); 
      setFormData({ titulo: '', descripcion: '', categoria: 'Hardware' }); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Header className="bg-white font-bold text-lg">Nuevo Ticket</Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Título del Problema</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Ej: Error en servidor SQL" 
              value={formData.titulo}
              onChange={(e) => setFormData({...formData, titulo: e.target.value})}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Select 
              value={formData.categoria}
              onChange={(e) => setFormData({...formData, categoria: e.target.value})}
            >
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
              <option value="Red">Red</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción (Opcional)</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              value={formData.descripcion}
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-full">
            Crear Ticket
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default TicketForm;