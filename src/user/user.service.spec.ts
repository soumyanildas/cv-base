import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UsersService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UsersService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
