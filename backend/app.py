from flask import Flask, request, jsonify
from flask_cors import CORS
from colorama import init, Fore
from config import Config
from models import db, Ticket
from sqlalchemy import func

init(autoreset=True)

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

# Inicializar DB con la app
db.init_app(app)

# Crear tablas al inicio (si no existen)
with app.app_context():
    try:
        db.create_all()
        print(Fore.GREEN + "[*] Conectado a SQL Server. Tablas verificadas.")
    except Exception as e:
        print(Fore.RED + f"[!] Error conectando a SQL Server: {e}")

# Validaciones
def validate_ticket_data(data, is_update=False):
    errors = []
    if not is_update and not data.get('titulo'):
        errors.append("El título es obligatorio.")
    
    if 'categoria' in data and data['categoria'] not in Config.VALID_CATEGORIES:
        errors.append(f"Categoría inválida.")
        
    if 'estado' in data and data['estado'] not in Config.VALID_STATUSES:
        errors.append(f"Estado inválido.")
    return errors

# Endpoints 
@app.route('/api/tickets', methods=['POST'])
def create_ticket():
    data = request.json
    errors = validate_ticket_data(data)
    if errors: return jsonify({"errors": errors}), 400

    new_ticket = Ticket(
        titulo=data['titulo'],
        descripcion=data.get('descripcion', ''),
        categoria=data['categoria'],
        estado="Abierto"
    )

    try:
        db.session.add(new_ticket)
        db.session.commit()
        print(Fore.CYAN + f"[+] Nuevo Ticket ID {new_ticket.id}")
        return jsonify(new_ticket.to_json()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/api/tickets', methods=['GET'])
def get_tickets():
    categoria = request.args.get('categoria')
    estado = request.args.get('estado')
    
    # Construccion de query dinamico
    query = Ticket.query
    if categoria and categoria != "Todas":
        query = query.filter_by(categoria=categoria)
    if estado and estado != "Todos":
        query = query.filter_by(estado=estado)
    
    tickets = query.order_by(Ticket.fecha_creacion.desc()).all()
    return jsonify([t.to_json() for t in tickets]), 200

@app.route('/api/tickets/<int:id>', methods=['PUT'])
def update_ticket(id):
    ticket = Ticket.query.get_or_404(id)
    data = request.json
    
    errors = validate_ticket_data(data, is_update=True)
    if errors: return jsonify({"errors": errors}), 400

    if 'estado' in data: ticket.estado = data['estado']
    if 'categoria' in data: ticket.categoria = data['categoria']
    if 'descripcion' in data: ticket.descripcion = data['descripcion']
    
    db.session.commit()
    
    color = Fore.GREEN if ticket.estado == 'Resuelto' else Fore.YELLOW
    print(f"[*] Ticket {id} actualizado a {color}{ticket.estado}")
    return jsonify(ticket.to_json()), 200

@app.route('/api/tickets/<int:id>', methods=['DELETE'])
def delete_ticket(id):
    ticket = Ticket.query.get_or_404(id)
    db.session.delete(ticket)
    db.session.commit()
    print(Fore.RED + f"[-] Ticket {id} eliminado")
    return jsonify({"msg": "Eliminado"}), 200

@app.route('/api/stats', methods=['GET'])
def get_stats():
    # SQL: SELECT estado, COUNT(*) FROM tickets GROUP BY estado
    results = db.session.query(Ticket.estado, func.count(Ticket.id)).group_by(Ticket.estado).all()
    
    stats = {
        "total": Ticket.query.count(),
        "abiertos": 0,
        "en_progreso": 0,
        "resueltos": 0
    }
    
    # Mapear resultados de tuplas SQL a diccionario
    for estado, count in results:
        if estado == "Abierto": stats["abiertos"] = count
        elif estado == "En Progreso": stats["en_progreso"] = count
        elif estado == "Resuelto": stats["resueltos"] = count
        
    return jsonify(stats), 200

if __name__ == '__main__':
    app.run(port=5000, debug=Config.DEBUG)