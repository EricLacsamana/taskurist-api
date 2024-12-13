import { AppError } from './AppError.js';

export class ConflictError extends AppError {
    constructor(message = 'Conflict during operation') {
        super(message, 409);
    }
}
