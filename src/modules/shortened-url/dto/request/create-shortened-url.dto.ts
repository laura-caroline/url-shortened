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

  @IsOptional()
  userId?: string;
}
