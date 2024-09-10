import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateShortenedUrlDto {
  @ApiProperty({
    example: 'www.google.com',
    description: 'URL de origem',
  })
  @IsNotEmpty({ message: 'A URL de origem é obrigatória' })
  originalUrl: string;

  @IsOptional()
  shortUrl?: string;

  @ApiProperty({
    example: 'a995cb05-a2cd-40ba-a29c-11b375cf8184',
    description: 'Id do usuário',
    required: false,
  })
  @IsOptional()
  userId?: string;
}
