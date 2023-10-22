import { UpdateUserDto } from "src/users/dtos/update-user.dto";

export class UpdatePatientDto extends UpdateUserDto {
    dateOfBirth?: Date
    address?: string
}
