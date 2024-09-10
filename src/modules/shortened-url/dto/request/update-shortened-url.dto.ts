import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateShortenedUrlDto {
  @IsOptional()
  idShortenedUrl?: string;

  @IsOptional()
  countAccessUrl?: number;

  @ApiProperty({
    example: 'www.google.com',
    description: 'Url original',
    required: true,
  })
  @IsNotEmpty({ message: 'Url original  é obrigatório' })
  originalUrl: string;
}
