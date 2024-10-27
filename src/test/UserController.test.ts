import { Request, Response } from 'express';
import UserController from '../controllers/UserController';
import UserService from '../services/UserService';

jest.mock('../services/UserService');

describe('UserController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({ json: jsonMock }));
    req = {};
    res = { json: jsonMock, status: statusMock } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a new user and return 201 status', async () => {
      req.body = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        timeZone: 'UTC',
        birthDate: '1990-01-01',
      };

      const mockUser = { id: 1, ...req.body };
      (UserService.getUserOneSpecific as jest.Mock).mockResolvedValue(null);
      (UserService.createUser as jest.Mock).mockResolvedValue(mockUser);

      await UserController.createUser(req as Request, res as Response);

      expect(UserService.getUserOneSpecific).toHaveBeenCalledWith({
        email: req.body.email,
      });
      expect(UserService.createUser).toHaveBeenCalledWith(req.body);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith({ user: mockUser });
    });

    it('should return 409 if email already exists', async () => {
      req.body = {
        email: 'duplicate@example.com',
        firstName: 'John',
        lastName: 'Doe',
        timeZone: 'UTC',
        birthDate: '1990-01-01',
      };

      (UserService.getUserOneSpecific as jest.Mock).mockResolvedValue(req.body);

      await UserController.createUser(req as Request, res as Response);

      expect(UserService.getUserOneSpecific).toHaveBeenCalledWith({
        email: req.body.email,
      });
      expect(statusMock).toHaveBeenCalledWith(409);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'Email already exists' });
    });

    it('should return 500 if an error occurs', async () => {
      req.body = {
        email: 'error@example.com',
        firstName: 'Error',
        lastName: 'User',
        timeZone: 'UTC',
        birthDate: '1990-01-01',
      };

      (UserService.getUserOneSpecific as jest.Mock).mockRejectedValue(
        new Error('Database error')
      );

      await UserController.createUser(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'Failed to create user' });
    });
  });

  describe('getUserById', () => {
    it('should return a user if found', async () => {
      req.params = { id: '1' };
      const mockUser = { id: 1, email: 'found@example.com', firstName: 'Jane' };
      (UserService.getUserById as jest.Mock).mockResolvedValue(mockUser);

      await UserController.getUserById(req as Request, res as Response);

      expect(UserService.getUserById).toHaveBeenCalledWith(1);
      expect(jsonMock).toHaveBeenCalledWith({ user: mockUser });
    });

    it('should return 404 if user is not found', async () => {
      req.params = { id: '1' };
      (UserService.getUserById as jest.Mock).mockResolvedValue(null);

      await UserController.getUserById(req as Request, res as Response);

      expect(UserService.getUserById).toHaveBeenCalledWith(1);
      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('should return 500 if an error occurs', async () => {
      req.params = { id: '1' };
      (UserService.getUserById as jest.Mock).mockRejectedValue(new Error('Database error'));

      await UserController.getUserById(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'Failed to fetch user' });
    });
  });

  describe('deleteUser', () => {
    it('should delete a user and return 204 if successful', async () => {
      req.params = { id: '1' };
      (UserService.deleteUser as jest.Mock).mockResolvedValue(true);

      await UserController.deleteUser(req as Request, res as Response);

      expect(UserService.deleteUser).toHaveBeenCalledWith(1);
      expect(statusMock).toHaveBeenCalledWith(204);
    });

    it('should return 404 if user to delete is not found', async () => {
      req.params = { id: '1' };
      (UserService.deleteUser as jest.Mock).mockResolvedValue(false);

      await UserController.deleteUser(req as Request, res as Response);

      expect(UserService.deleteUser).toHaveBeenCalledWith(1);
      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('should return 500 if an error occurs', async () => {
      req.params = { id: '1' };
      (UserService.deleteUser as jest.Mock).mockRejectedValue(new Error('Database error'));

      await UserController.deleteUser(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'Failed to delete user' });
    });
  });
});
