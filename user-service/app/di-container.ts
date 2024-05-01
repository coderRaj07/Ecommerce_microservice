import { container } from 'tsyringe';
import { UserRepository } from './repository/userRepository';
import { UserService } from './service/userService';

// make the UserRepository and UserService injectable into other classes
container.register('UserRepository', { useClass: UserRepository });
container.register('UserService', { useClass: UserService });