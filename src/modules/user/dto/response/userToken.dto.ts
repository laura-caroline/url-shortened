import { ApiProperty } from '@nestjs/swagger';

export class UserToken {
  @ApiProperty({
    description: 'Token de acesso',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Token de atualização',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkJDISY73IkpXVCJ9',
  })
  refreshToken: string;
}