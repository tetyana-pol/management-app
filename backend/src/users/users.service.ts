import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findAll() {
    return await this.userRepo.find();
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
    });

    if (!user) throw new NotFoundException();
    return user;
  }

  async create(dto: CreateUserDto) {
    return await this.userRepo.save(dto);
  }

  async update(id: number, dto: UpdateUserDto) {
    return await this.userRepo.update({ id }, dto);
  }

  async delete(id: number) {
    return await this.userRepo.delete({ id });
  }
}
