import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'RefreshToken',
    example: '$2b$10$4X8Zd6APQdyX17cXhqqsnuoiFHQtKZVIsio3I9P048IPnRB.rKk2K',
  })
  refreshToken: string;
}
