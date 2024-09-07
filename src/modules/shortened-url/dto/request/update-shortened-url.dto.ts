import { PartialType } from "@nestjs/mapped-types";
import { CreateShortenedUrlDto } from "./create-shortened-url.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateShortenedUrlDto extends PartialType(CreateShortenedUrlDto) {
  @ApiProperty({
    example: "1",
    description: "ID da URL encurtada",
  })
  @IsNotEmpty({ message: "O Id da url encurtada  é obrigatório" })
  idShortenedUrl: string;

  @IsOptional()
  countAccessUrl?: number;
}
