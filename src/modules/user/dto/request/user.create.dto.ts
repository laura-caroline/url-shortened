import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class UserCreateDto {
  @ApiProperty({
    example: 'emailusuario@gmail.com',
    description: 'E-mail do usuário',
  })
  @IsNotEmpty({ message: 'O campo de email deve ser preenchido' })
  @IsEmail({}, { message: 'O campo de email deve ser um e-mail válido' })
  @MaxLength(200, {
    message: 'O campo de email deve ter menos de 200 caracteres',
  })
  email: string;
  @ApiProperty({
    example: 'Breno Silva',
    description: 'Nome do usuário',
  })
  @IsNotEmpty({ message: 'O campo de nome deve ser preenchido' })
  @IsString({ message: 'O campo de nome deve ser uma string' })
  @MaxLength(200, {
    message: 'O campo de nome deve ter menos de 200 caracteres',
  })
  name: string;
  @ApiProperty({
    type: String,
    description: 'Senha do usuário na plataforma.',
  })
  @IsNotEmpty({
    message: "O campo 'Senha' precisa ser preenchido.",
  })
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?=.*\d).{8,}$/, {
    message:
      'A senha deve conter pelo menos 1 letra maiúscula, 1 caractere especial, 1 número e ter no mínimo 8 caracteres.',
  })
  password: string;
}
