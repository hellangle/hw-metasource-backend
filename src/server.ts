import App from '@/app';
import AuthRoute from '@routes/auth.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';

validateEnv();
try {
  const usersRoute = new UsersRoute();
  const authRoute = new AuthRoute();
  const app = new App([usersRoute, authRoute]);

  app.listen();
} catch (error) {
  console.log(error);
}
