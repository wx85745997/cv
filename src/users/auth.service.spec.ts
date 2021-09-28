import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

const fakeUsersService: Partial<UsersService> = {
  find: () => Promise.resolve([]),
  create: (email: string, password: string) =>
    Promise.resolve({ id: 1, email, password } as User),
};

it('can create an instance of auth service', async () => {
  const module = await Test.createTestingModule({
    providers: [
      AuthService,
      {
        provide: UsersService,
        useValue: fakeUsersService,
      },
    ],
  }).compile();

  const service = module.get(AuthService);
  expect(service).toBeDefined();
});
