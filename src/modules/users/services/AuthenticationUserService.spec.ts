import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import AuthenticationUserService from './AuthenticationUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticationUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authenticateUser = new AuthenticationUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Joh Doe',
      email: 'johndoe@example.com',
      password: '123546',
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123546',
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  // it('should not be able to authenticate with invalid email', async () => {});

  // it('should not be able to authenticate with incorrect password', async () => {});
});
