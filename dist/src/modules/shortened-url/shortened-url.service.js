"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ShortenedUrlService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortenedUrlService = void 0;
const common_1 = require("@nestjs/common");
const shortened_url_repository_1 = require("./shortened-url.repository");
const crypto_1 = require("crypto");
let ShortenedUrlService = ShortenedUrlService_1 = class ShortenedUrlService {
    constructor(shortenedUrlRepository) {
        this.shortenedUrlRepository = shortenedUrlRepository;
        this.logger = new common_1.Logger(ShortenedUrlService_1.name);
    }
    async createShortenedUrl(createShortenedUrlDto) {
        try {
            createShortenedUrlDto.shortUrl = (0, crypto_1.randomUUID)();
            return await this.shortenedUrlRepository.createShortenedUrl(createShortenedUrlDto);
        }
        catch (err) {
            this.logger.error(`Error ao criar a URL encurtada ${createShortenedUrlDto}`);
            throw err;
        }
    }
    async findAllShortenedUrlByUser(userId) {
        try {
            return await this.shortenedUrlRepository.listShortenedUrlByUser(userId);
        }
        catch (err) {
            this.logger.error(`Error ao obter todas as url encurtadas para o usuário ${userId}`);
            throw err;
        }
    }
    async findOneShortenedUrlByUser(userId, idShortenedUrl) {
        try {
            return await this.shortenedUrlRepository.findByIdByUser(userId, idShortenedUrl);
        }
        catch (err) {
            this.logger.error(`Error ao obter a URL encurtada do id ${idShortenedUrl} utilizando o usuário ${userId}`);
            throw err;
        }
    }
    async updateNumberAccessUrl(idShortenedUrl) {
        const alreadyExistShortenedUrl = await this.shortenedUrlRepository.findById(idShortenedUrl);
        if (!alreadyExistShortenedUrl) {
            this.logger.debug(`URL encurtada com id ${idShortenedUrl} não foi encontrada`);
            throw new common_1.NotFoundException("URL encurtada não foi encontrada");
        }
        const dataUpdate = {
            ...alreadyExistShortenedUrl,
            countAccessUrl: alreadyExistShortenedUrl.countAccessUrl + 1,
            idShortenedUrl: alreadyExistShortenedUrl.id,
        };
        return await this.shortenedUrlRepository.updateShortenedUrl(null, dataUpdate);
    }
    async updateShortenedUrlByUser(userId, updateShortenedUrlDto) {
        try {
            const alreadyExistShortenedUrl = await this.shortenedUrlRepository.findByIdByUser(userId, updateShortenedUrlDto.idShortenedUrl);
            if (!alreadyExistShortenedUrl) {
                this.logger.debug(`URL encurtada com id ${updateShortenedUrlDto.idShortenedUrl} utilizando o usuário ${userId} não foi encontrada`);
                throw new common_1.NotFoundException("URL encurtada não foi encontrada");
            }
            updateShortenedUrlDto.shortUrl = (0, crypto_1.randomUUID)();
            return await this.shortenedUrlRepository.updateShortenedUrl(userId, updateShortenedUrlDto);
        }
        catch (err) {
            this.logger.error(`Error ao deletar url encurtada com id ${updateShortenedUrlDto.idShortenedUrl} utilizando o usuário ${userId}`);
            throw err;
        }
    }
    async removeShortenedUrlByUser(userId, shortenedUrlId) {
        try {
            const alreadyExistShortenedUrl = await this.shortenedUrlRepository.findByIdByUser(userId, shortenedUrlId);
            if (!alreadyExistShortenedUrl) {
                this.logger.debug(`URL encurtada com id ${shortenedUrlId} utilizando o usuário ${userId} não foi encontrada`);
                throw new common_1.NotFoundException("URL encurtada não foi encontrada");
            }
            return await this.shortenedUrlRepository.deleteShortenedUrlByUser(userId, shortenedUrlId);
        }
        catch (err) {
            this.logger.error(`Error ao deletar url encurtada com id ${shortenedUrlId} utilizando o usuário ${userId}`);
            throw err;
        }
    }
};
exports.ShortenedUrlService = ShortenedUrlService;
exports.ShortenedUrlService = ShortenedUrlService = ShortenedUrlService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [shortened_url_repository_1.ShortenedUrlRepository])
], ShortenedUrlService);
//# sourceMappingURL=shortened-url.service.js.map