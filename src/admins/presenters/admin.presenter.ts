import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { Admin } from '../entities/admin.entity';

export class AdminPresenter {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  superAdmin: boolean;

  constructor(user: User, admin: Admin) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.superAdmin = admin.superAdmin ? true : false;
  }
}
