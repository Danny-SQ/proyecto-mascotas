
from flask import Blueprint, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from database import db
from werkzeug.security import generate_password_hash, check_password_hash # Agrega esta línea

cuidador_bp = Blueprint('cuidador', __name__)

class Cuidador(db.Model):
    __tablename__ = 'cuidador'
    id = db.Column(db.Integer, primary_key=True)
    nombre_completo = db.Column(db.String(100), nullable=False)
    correo = db.Column(db.String(100), unique=True, nullable=False)
    contrasena = db.Column(db.Text, nullable=False)
    telefono = db.Column(db.String(20))
    rol = db.Column(db.String(20))
    direccion = db.Column(db.Text)
    foto_perfil = db.Column(db.Text)


# Crear cuidador
@cuidador_bp.route('/cuidadores', methods=['POST'])
def crear_cuidador():
    data = request.json
    # Hashear la contraseña antes de guardarla
    data['contrasena'] = generate_password_hash(data['contrasena'])
    
    nuevo = Cuidador(**data)
    db.session.add(nuevo)
    db.session.commit()
    return jsonify({'mensaje': 'Cuidador creado', 'id': nuevo.id}), 201

# Obtener cuidador por ID
@cuidador_bp.route('/cuidadores/<int:id>', methods=['GET'])
def obtener_cuidador(id):
    cuidador = Cuidador.query.get_or_404(id)
    return jsonify({
        'id': cuidador.id,
        'nombre_completo': cuidador.nombre_completo,
        'correo': cuidador.correo,
        'telefono': cuidador.telefono,
        'rol': cuidador.rol,
        'direccion': cuidador.direccion,
        'foto_perfil': cuidador.foto_perfil
    })

# Actualizar cuidador
@cuidador_bp.route('/cuidadores/<int:id>', methods=['PUT'])
def actualizar_cuidador(id):
    cuidador = Cuidador.query.get_or_404(id)
    data = request.json

    # Actualizar campos de forma segura, excluyendo la contraseña por ahora
    cuidador.nombre_completo = data.get('nombre_completo', cuidador.nombre_completo)
    cuidador.correo = data.get('correo', cuidador.correo)
    cuidador.telefono = data.get('telefono', cuidador.telefono)
    cuidador.rol = data.get('rol', cuidador.rol)
    cuidador.direccion = data.get('direccion', cuidador.direccion)
    cuidador.foto_perfil = data.get('foto_perfil', cuidador.foto_perfil)
    
    # Manejo especial para la contraseña
    nueva_contrasena = data.get('contrasena')
    if nueva_contrasena:
        # Si se proporciona una nueva contraseña, hashearla y actualizarla
        cuidador.contrasena = generate_password_hash(nueva_contrasena)

    db.session.commit()
    return jsonify({'mensaje': 'Cuidador actualizado correctamente'})

# Eliminar cuidador
@cuidador_bp.route('/cuidadores/<int:id>', methods=['DELETE'])
def eliminar_cuidador(id):
    cuidador = Cuidador.query.get_or_404(id)
    db.session.delete(cuidador)
    db.session.commit()
    return jsonify({'mensaje': 'Cuidador eliminado'})

# Obtener todos los cuidadores
@cuidador_bp.route('/cuidadores', methods=['GET'])
def obtener_cuidadores():
    cuidadores = Cuidador.query.all()
    resultado = []
    for c in cuidadores:
        resultado.append({
            'id': c.id,
            'nombre_completo': c.nombre_completo,
            'correo': c.correo,
            'telefono': c.telefono,
            'rol': c.rol,
            'direccion': c.direccion,
            'foto_perfil': c.foto_perfil
        })
    return jsonify(resultado)


@cuidador_bp.route('/login', methods=['POST'])
def login_cuidador():
    data = request.json
    correo = data.get('correo', '').strip()
    contrasena_ingresada = data.get('contrasena', '').strip()

    # Paso 1: Buscar el cuidador solo por el correo
    cuidador = Cuidador.query.filter_by(correo=correo).first()
    
    # Paso 2: Verificar si el cuidador existe y si la contraseña es correcta
    if cuidador and check_password_hash(cuidador.contrasena, contrasena_ingresada):
        return jsonify({
            'id': cuidador.id,
            'nombre_completo': cuidador.nombre_completo,
            'correo': cuidador.correo,
            'telefono': cuidador.telefono,
            'rol': cuidador.rol,
            'direccion': cuidador.direccion,
            'foto_perfil': cuidador.foto_perfil
        })
    else:
        return jsonify({'error': 'Credenciales incorrectas'}), 401
