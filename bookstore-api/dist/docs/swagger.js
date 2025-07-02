"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Bookstore REST API',
            version: '1.0.0',
            description: 'API documentation for the Bookstore API',
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                Book: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        title: { type: 'string' },
                        author: { type: 'string' },
                        genre: { type: 'string' },
                        publishedYear: { type: 'integer' },
                        userId: { type: 'string' },
                    },
                },
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                        password: { type: 'string' },
                    },
                },
                AuthRequest: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: { type: 'string' },
                        password: { type: 'string' },
                    },
                },
                AuthResponse: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        message: { type: 'string' },
                        token: { type: 'string' },
                    },
                },
            },
        },
        paths: {
            '/login': {
                post: {
                    tags: ['Auth'],
                    summary: 'Login a user',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/AuthRequest' },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: 'Login success',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/AuthResponse' },
                                },
                            },
                        },
                        401: {
                            description: 'Invalid credentials',
                        },
                    },
                },
            },
            '/regiser': {
                post: {
                    tags: ['Auth'],
                    summary: 'Register a user',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['name', 'email', 'password'],
                                    properties: {
                                        name: { type: 'string' },
                                        email: { type: 'string' },
                                        password: { type: 'string' },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        201: {
                            description: 'User registered successfully',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/AuthResponse' },
                                },
                            },
                        },
                        409: {
                            description: 'Email already exists',
                        },
                    },
                },
            },
            '/books': {
                get: {
                    tags: ['Books'],
                    summary: 'Get all books for logged in user',
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: {
                            description: 'List of books',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/Book' },
                                    },
                                },
                            },
                        },
                    },
                },
                post: {
                    tags: ['Books'],
                    summary: 'Add a new book',
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['title', 'author', 'genre', 'publishedYear'],
                                    properties: {
                                        title: { type: 'string' },
                                        author: { type: 'string' },
                                        genre: { type: 'string' },
                                        publishedYear: { type: 'integer' },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        201: {
                            description: 'Book created',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/Book' },
                                },
                            },
                        },
                    },
                },
            },
            '/books/{id}': {
                get: {
                    tags: ['Books'],
                    summary: 'Get book by ID (if owned by user)',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            schema: { type: 'string' },
                        },
                    ],
                    responses: {
                        200: {
                            description: 'Book found',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/Book' },
                                },
                            },
                        },
                        404: { description: 'Book not found' },
                    },
                },
                put: {
                    tags: ['Books'],
                    summary: 'Update a book by ID',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            schema: { type: 'string' },
                        },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        title: { type: 'string' },
                                        author: { type: 'string' },
                                        genre: { type: 'string' },
                                        publishedYear: { type: 'integer' },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        200: { description: 'Book updated successfully' },
                        403: { description: 'Not allowed to update this book' },
                    },
                },
                delete: {
                    tags: ['Books'],
                    summary: 'Delete a book by ID',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            schema: { type: 'string' },
                        },
                    ],
                    responses: {
                        200: { description: 'Book deleted successfully' },
                        403: { description: 'Not allowed to delete this book' },
                    },
                },
            },
        },
    },
    apis: [],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
