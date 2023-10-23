import { ApiProperty } from '@nestjs/swagger';
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

  constructor(admin: Admin) {
    this.id = admin.userId;
    this.name = admin.user.name;
    this.email = admin.user.email;
    this.superAdmin = admin.superAdmin ? true : false;
  }
}
