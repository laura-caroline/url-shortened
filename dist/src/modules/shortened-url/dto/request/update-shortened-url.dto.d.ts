import { CreateShortenedUrlDto } from "./create-shortened-url.dto";
declare const UpdateShortenedUrlDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateShortenedUrlDto>>;
export declare class UpdateShortenedUrlDto extends UpdateShortenedUrlDto_base {
    idShortenedUrl: string;
    countAccessUrl?: number;
}
export {};
