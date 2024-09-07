import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { hashData } from 'src/utils/hash';
import { UserCreateDto } from './dto/request/user.create.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {}

  async createUser(data: UserCreateDto): Promise<UserEntity> {
    try {
      const alreadyExistsUserThisEmail = await this.userRepository.findByEmail(
        data.email
      );

      if (alreadyExistsUserThisEmail) {
        throw new BadRequestException(
          `Usuário já existe com esse email ${data.email}`
        );
      }

      const passwordEncrypted = await hashData(data.password);
      data.password = passwordEncrypted;
      return await this.userRepository.createUser(data);
    } catch (err) {
      this.logger.error(
        `Error ao criar um usuário com ${data}: ${err.message}`
      );
      throw err;
    }
  }

  async findById(id: string): Promise<UserEntity> {
    try {
      return await this.userRepository.findById(id);
    } catch (err) {
      this.logger.error(`Error ao buscar usuário com id ${id}: ${err.message}`);
      throw err;
    }
  }

  async findByEmail(email: string): Promise<UserEntity> {
    try {
      return await this.userRepository.findByEmail(email);
    } catch (err) {
      this.logger.error(
        `Error ao buscar um usuário com email ${email}, ${err.message}`
      );
      throw err;
    }
  }
}
