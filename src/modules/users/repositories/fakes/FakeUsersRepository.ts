import { uuid } from 'uuidv4';

import User from '../../infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDto from '@modules/users/dtos/ICreateUserDto';
import IFindAllProviderDTO from '@modules/users/dtos/IFindAllProvidersDTO';

class FakeUsersRepository implements IUsersRepository {
  users: User[] = [];

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async findAllProviders({
    exceptUserId,
  }: IFindAllProviderDTO): Promise<User[]> {
    let { users } = this;

    if (exceptUserId) {
      users = this.users.filter(user => user.id !== exceptUserId);
    }

    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async create(userData: ICreateUserDto): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
