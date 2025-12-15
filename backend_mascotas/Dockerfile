# Usa una imagen base de Python ligera
FROM python:3.12-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo de dependencias (asumiendo que está en ./backend/requirements.txt)
# Nota: Si usas pipenv o poetry, reemplaza por el archivo de lock/toml correspondiente.
COPY requirements.txt .

# Instala todas las dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Copia el resto del código del backend (incluyendo app.py, config.py, y la carpeta routes)
# El '.' en el origen se refiere al contexto de construcción, que es la carpeta 'backend'
COPY . .

# Exponer el puerto 5000, usado por Flask y gunicorn
EXPOSE 5000

# Comando de inicio del servidor. Usaremos gunicorn (debe estar en requirements.txt)
# Esto es más robusto para producción que simplemente usar 'python app.py'
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]