/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       required:
 *         - user
 *         - password
 *       properties:
 *         user:
 *           type: string
 *           description: Nombre de usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *       example:
 *         user: admin
 *         password: password123
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - user
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del usuario (0 para nuevo usuario)
 *         user:
 *           type: string
 *           description: Nombre de usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario (solo para creación/actualización)
 *       example:
 *         id: 1
 *         user: john_doe
 *         password: secure_password123
 *     Product:
 *       type: object
 *       required:
 *         - nombre
 *         - peso
 *         - altura
 *         - ancho
 *         - id_categoria
 *         - pais_origen
 *         - pais_destino
 *         - id_medio_transporte
 *       properties:
 *         nombre:
 *           type: string
 *         peso:
 *           type: number
 *         altura:
 *           type: number
 *         ancho:
 *           type: number
 *         id_categoria:
 *           type: integer
 *         pais_origen:
 *           type: string
 *         pais_destino:
 *           type: string
 *         id_medio_transporte:
 *           type: integer
 *       example:
 *         nombre: Caja de madera
 *         peso: 3.5
 *         altura: 20
 *         ancho: 15
 *         id_categoria: 2
 *         pais_origen: "3"
 *         pais_destino: "2"
 *         id_medio_transporte: 1
 * 
 * tags:
 *   - name: Autenticación
 *     description: Operaciones de autenticación de usuarios
 *   - name: Usuarios
 *     description: Operaciones con usuarios
 *   - name: Products
 *     description: Operaciones relacionadas con productos
 * 
 * /api/authentication/Login:
 *   post:
 *     summary: Login de usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       200:
 *         description: Token de autenticación generado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 body:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error del servidor
 * 
 * /api/users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos los usuarios
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 *   post:
 *     summary: Crea o actualiza un usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado o actualizado exitosamente
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 *   delete:
 *     summary: Elimina un usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID del usuario a eliminar
 *             example:
 *               id: 1
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 * 
 * /api/users/{id}:
 *   get:
 *     summary: Obtiene un usuario específico
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Detalles del usuario
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 *
 * /api/productos:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Datos faltantes o inválidos
 *       500:
 *         description: Error interno del servidor
 */
