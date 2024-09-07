import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'E-mail de login do usuário',
    example: 'user@user.com',
    default: 'user@user.com',
  })
  @IsNotEmpty({ message: 'e-mail é obrigatório' })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'admin@123',
    default: 'admin@123',
  })
  @IsNotEmpty({ message: 'Password é obrigatório' })
  password: string;
}
