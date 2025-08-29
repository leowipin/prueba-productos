# Prueba Técnica

## Prerequisitos

- Node.js v22.13
- npm v11.5.2
- PostgreSQL v17.5

## Instalación

Primero, clonar el proyecto:

```bash
git clone https://github.com/leowipin/prueba-productos.git
cd prueba-productos
```

## Sección 1: Backend - API REST con Node.js (Express)

### Configuración

1. Navegar al directorio del backend:
   ```bash
   cd backend
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Crear base de datos PostgreSQL:
   - Crear una base de datos llamada `productos`

4. Configurar variables de entorno:
   - Editar el archivo `.env` en la raíz del proyecto
   - Actualizar las siguientes variables:
     - `DB_USERNAME`: usuario de la base de datos
     - `DB_PASSWORD`: contraseña de la base de datos
   - Mantener el resto de variables estándar

5. Ejecutar migración de la base de datos:
   ```bash
   npm run migration:run
   ```

6. Levantar la API:
   ```bash
   npm run dev
   ```

## Sección 2: Frontend - Cliente en React

### Configuración

1. Navegar al directorio del frontend:
   ```bash
   cd frontend
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Levantar el Frontend:
   ```bash
   npm run dev
   ```

## Sección 3: SQL - Optimización de consultas

### Consulta SQL:
```sql
SELECT * FROM cabeceraventas WHERE CODIGOCLIENTE = '123' ORDER BY FECHA DESC;
```

### Mejora:
Para mejorar el rendimiento de la consulta, se debe crear un índice compuesto que incluya tanto `CODIGOCLIENTE` como `FECHA`:

## Sección 4: Algoritmos - Procesamiento de datos

### Configuración

1. Navegar al directorio:
   ```bash
   cd seccion-4
   ```

2. Instalar tsx globalmente si no está disponible:
   ```bash
   npm install -g tsx
   ```

3. Ejecutar el código TypeScript:
   ```bash
   tsx main.ts
   ```

## Sección 5: Refactorización - Buenas prácticas

La refactorización se encuentra en:
```
seccion-5/refactorizacion
```
La explicación se encuentra comentada dentro del archivo.