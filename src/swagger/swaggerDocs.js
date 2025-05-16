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
 *     Customer:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del cliente (0 para nuevo cliente)
 *       example:
 *         id: 1
 *         nombre: Cliente Ejemplo
 *         email: cliente@ejemplo.com
 * 
 * tags:
 *   - name: Autenticación
 *     description: Operaciones de autenticación de usuarios
 *   - name: Usuarios
 *     description: Operaciones con usuarios
 *   - name: Clientes
 *     description: Operaciones con clientes
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
 * /api/costumers:
 *   get:
 *     summary: Obtiene todos los clientes
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos los clientes
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 *   post:
 *     summary: Crea o actualiza un cliente
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       201:
 *         description: Cliente creado o actualizado exitosamente
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 *   delete:
 *     summary: Elimina un cliente
 *     tags: [Clientes]
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
 *                 description: ID del cliente a eliminar
 *             example:
 *               id: 1
 *     responses:
 *       200:
 *         description: Cliente eliminado exitosamente
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 * 
 * /api/costumers/{id}:
 *   get:
 *     summary: Obtiene un cliente específico
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Detalles del cliente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error del servidor
 */