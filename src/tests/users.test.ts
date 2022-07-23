import { Sequelize } from 'sequelize';
import request from 'supertest';
import App from '@/app';
import UserRoute from '@routes/users.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Users', () => {
  describe('[GET] /users', () => {
    it('response findAll users', async () => {
      const usersRoute = new UserRoute();
      const users = usersRoute.usersController.userService.users;

      users.findAll = jest.fn().mockReturnValue([
        {
          id: 1,
          email: 'a@email.com',
          name: 'a',
        },
        {
          id: 2,
          email: 'b@email.com',
          name: 'b',
        },
        {
          id: 3,
          email: 'c@email.com',
          name: 'c',
        },
      ]);

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).get(`${usersRoute.path}`).expect(200);
    });
  });

  describe('[GET] /users/:id', () => {
    it('response findOne user', async () => {
      const userId = 1;

      const usersRoute = new UserRoute();
      const users = usersRoute.usersController.userService.users;

      users.findByPk = jest.fn().mockReturnValue({
        id: 1,
        email: 'a@email.com',
        name: 'a',
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).get(`${usersRoute.path}/${userId}`).expect(200);
    });
  });
});
