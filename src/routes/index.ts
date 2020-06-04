import Router from 'express';

const routes = Router();

routes.get('/users', (request, response) => {
  const { name, email } = request.body;
  response.json({ user: { name, email } });
});

export default routes;
