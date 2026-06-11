import { Injectable } from '@nestjs/common';
import { PrismaService } from '@octergo/database';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
