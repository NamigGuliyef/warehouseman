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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const multer_1 = require("../../config/multer");
const create_portfolio_dto_1 = require("./dto/create-portfolio.dto");
const create_skill_dto_1 = require("./dto/create-skill.dto");
const create_workexperience_dto_1 = require("./dto/create-workexperience.dto");
const update_portfolio_dto_1 = require("./dto/update-portfolio.dto");
const update_skill_dto_1 = require("./dto/update-skill.dto");
const update_workexperience_dto_1 = require("./dto/update-workexperience.dto");
const portfolio_service_1 = require("./portfolio.service");
let PortfolioController = class PortfolioController {
    portfolioService;
    constructor(portfolioService) {
        this.portfolioService = portfolioService;
    }
    async createWarehouseman(warehousemanData) {
        return this.portfolioService.createWarehouseman(warehousemanData);
    }
    async getWarehousemanProfile() {
        return this.portfolioService.getWarehousemanProfile();
    }
    async getWarehousemanById(id) {
        return this.portfolioService.getWarehousemanById(id);
    }
    async updateWarehouseman(id, updateWarehousemanData) {
        return this.portfolioService.updateWarehouseman(id, updateWarehousemanData);
    }
    async createWorkExperience(createWorkExperienceDTO) {
        return this.portfolioService.createWorkExperience(createWorkExperienceDTO);
    }
    async getWorkExperienceById(id) {
        return this.portfolioService.getWorkExperienceById(id);
    }
    async getAllWorkExperiences() {
        return this.portfolioService.getAllWorkExperiences();
    }
    async updateWorkExperience(id, updateWorkExperienceDTO) {
        return this.portfolioService.updateWorkExperience(id, updateWorkExperienceDTO);
    }
    async deleteWorkExperience(id) {
        return this.portfolioService.deleteWorkExperience(id);
    }
    async createSkill(createSkillDTO) {
        return this.portfolioService.createSkill(createSkillDTO);
    }
    async getSkillById(id) {
        return this.portfolioService.getSkillById(id);
    }
    async getAllSkills() {
        return this.portfolioService.getAllSkills();
    }
    async updateSkill(id, updateSkillDTO) {
        return this.portfolioService.updateSkill(id, updateSkillDTO);
    }
    async deleteSkill(id) {
        return this.portfolioService.deleteSkill(id);
    }
    async createCertificate(createCertificateDTO, image) {
        return this.portfolioService.createCertificate(createCertificateDTO, image);
    }
    async updateCertificate(id, updateCertificateDTO, image) {
        return this.portfolioService.updateCertificate(id, updateCertificateDTO, image);
    }
    async getCertificateById(id) {
        return this.portfolioService.getCertificateById(id);
    }
    async getAllCertificates() {
        return this.portfolioService.getAllCertificates();
    }
    async deleteCertificate(id) {
        return this.portfolioService.deleteCertificate(id);
    }
    async createBlogPost(BlogPostData, image) {
        return this.portfolioService.createBlogPost(BlogPostData, image);
    }
    async updateBlog(id, BlogPostData, image) {
        return this.portfolioService.updateBlog(id, BlogPostData, image);
    }
    async toggleBlogActiveStatus(id, isActive) {
        return this.portfolioService.toggleBlogActiveStatus(id, isActive);
    }
    async getBlogById(id) {
        return this.portfolioService.getBlogById(id);
    }
    async getAllBlogs() {
        return this.portfolioService.getAllBlogs();
    }
    async deleteBlog(id) {
        return this.portfolioService.deleteBlog(id);
    }
    async createVacancy(jobData) {
        return this.portfolioService.createVacancy(jobData);
    }
    async updateVacancy(id, jobData) {
        return this.portfolioService.updateVacancy(id, jobData);
    }
    async getVacancyById(id) {
        return this.portfolioService.getVacancyById(id);
    }
    async searchVacancies(city) {
        return this.portfolioService.searchVacancies(city);
    }
    async deleteVacancy(id) {
        return this.portfolioService.deleteVacancy(id);
    }
};
exports.PortfolioController = PortfolioController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Yeni anbardar profili yarat" }),
    (0, common_1.Post)('dashboard/warehouseman'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object", properties: {
                fullName: { type: "string", maxLength: 100, example: "Namiq Quliyev" },
                email: { type: "string", format: "email", example: "namiq.quliyev@example.com" },
                phone: { type: "string", maxLength: 15, example: "+994 50 123 45 67" },
                position: { type: "string", maxLength: 100, example: "Warehouse Manager" },
                profBackground: { type: "string", example: "Logistics Specialist" },
                technologyFocus: { type: "string", example: "Supply Chain Management" },
                experienceYears: { type: "string", maxLength: 50, example: "5" },
                managedProducts: { type: "string", example: "5K" },
                solvedLogistics: { type: "string", minimum: 0, example: "10" },
                efficiencyRate: { type: "string", minimum: 0, maximum: 100, example: "85" },
            }
        }
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_portfolio_dto_1.WarehousemanDTO]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "createWarehouseman", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Anbardar profili əldə et" }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('dashboard/warehouseman'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "getWarehousemanProfile", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Anbardar profilini ID ilə əldə et" }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('dashboard/warehouseman/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "getWarehousemanById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Anbardar profilini yenile" }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Patch)('dashboard/warehouseman/:id'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object", properties: {
                fullName: { type: "string", maxLength: 100, example: "Quliyev Namiq" },
                position: { type: "string", maxLength: 100, example: "Warehouse Manager" },
                email: { type: "string", format: "email", example: "namiq.quliyev@example.com" },
                phone: { type: "string", maxLength: 15, example: "+994 50 123 45 67" },
                profBackground: { type: "string", example: "Logistics Specialist" },
                technologyFocus: { type: "string", example: "Supply Chain Management" },
                experienceYears: { type: "string", maxLength: 50, example: "5" },
                managedProducts: { type: "string", example: "5K" },
                solvedLogistics: { type: "string", minimum: 0, example: "10" },
                efficiencyRate: { type: "string", minimum: 0, maximum: 100, example: "85" },
            }
        }
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_portfolio_dto_1.UpdateWarehousemanDTO]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "updateWarehouseman", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Yeni iş təcrübəsi əlavə et" }),
    (0, common_1.Post)('dashboard/work-experience'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object", properties: {
                company: { type: "string", maxLength: 100, example: "ABC Logistics" },
                position: { type: "string", maxLength: 100, example: "Warehouse Manager" },
                period: { type: "string", maxLength: 50, example: "2018-2022" },
                description: { type: "string", example: "Managed warehouse operations and logistics." },
                location: { type: "string", maxLength: 100, example: "Baku, Azerbaijan" },
            }
        }
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_workexperience_dto_1.CreateWorkExperienceDTO]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "createWorkExperience", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "İş təcrübəsini əldə et" }),
    (0, common_1.Get)('dashboard/work-experience/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "getWorkExperienceById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Bütün iş təcrübələrini əldə et" }),
    (0, common_1.Get)('dashboard/work-experience'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "getAllWorkExperiences", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "İş təcrübəsini yenilə" }),
    (0, common_1.Patch)('dashboard/work-experience/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object", properties: {
                company: { type: "string", maxLength: 100, example: "ABC Logistics" },
                position: { type: "string", maxLength: 100, example: "Warehouse Manager" },
                period: { type: "string", maxLength: 50, example: "2018-2022" },
                description: { type: "string", example: "Managed warehouse operations and logistics." },
                location: { type: "string", maxLength: 100, example: "Baku, Azerbaijan" },
            }
        }
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_workexperience_dto_1.UpdateWorkExperienceDTO]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "updateWorkExperience", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "İş təcrübəsini sil" }),
    (0, common_1.Delete)('dashboard/work-experience/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "deleteWorkExperience", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Yeni bacarıq əlavə et" }),
    (0, common_1.Post)('dashboard/skills'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_skill_dto_1.CreateSkillDTO]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "createSkill", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Bacarıq əldə et" }),
    (0, common_1.Get)('dashboard/skills/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "getSkillById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Bütün bacarıqları əldə et" }),
    (0, common_1.Get)('dashboard/skills'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "getAllSkills", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Bacarıq yenilə" }),
    (0, common_1.Patch)('dashboard/skills/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_skill_dto_1.UpdateSkillDTO]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "updateSkill", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Bacarıq sil" }),
    (0, common_1.Delete)('dashboard/skills/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "deleteSkill", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Yeni sertifikat əlavə et" }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.Post)('dashboard/certificates'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', multer_1.MulterOptions)),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object", properties: {
                name: { type: "string", maxLength: 100, example: "Certified Logistics Professional" },
                date: { type: "string", example: "2022-01-01" },
                organization: { type: "string", maxLength: 100, example: "Logistics Academy" },
                image: { type: "string", format: "binary" }
            }
        }
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_portfolio_dto_1.CertificateDTO, Object]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "createCertificate", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Sertifikatı yenilə" }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.Patch)('dashboard/certificates/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', multer_1.MulterOptions)),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object", properties: {
                name: { type: "string", maxLength: 100, example: "Certified Logistics Professional" },
                date: { type: "string", example: "2022-01-01" },
                organization: { type: "string", maxLength: 100, example: "Logistics Academy" },
                image: { type: "string", format: "binary" }
            }
        }
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_portfolio_dto_1.CertificateDTO, Object]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "updateCertificate", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Sertifikatı ID ilə əldə et" }),
    (0, common_1.Get)('dashboard/certificates/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "getCertificateById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Bütün sertifikatları əldə et" }),
    (0, common_1.Get)('dashboard/certificates'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "getAllCertificates", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Sertifikatı sil" }),
    (0, common_1.Delete)('dashboard/certificates/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "deleteCertificate", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Yeni blog postu əlavə et" }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.Post)('dashboard/blog-posts'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', multer_1.MulterOptions)),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object", properties: {
                author: { type: "string", maxLength: 100, example: "Namiq Quliyev" },
                title: { type: "string", maxLength: 200, example: "The Future of Warehouse Management" },
                category: { type: "string", maxLength: 100, example: "Logistics" },
                description: { type: "string", maxLength: 500, example: "An overview of upcoming trends in warehouse management." },
                readTime: { type: "string", maxLength: 50, example: "5 min read" },
                active: { type: "boolean", example: false },
                image: { type: "string", format: "binary" }
            }
        }
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_portfolio_dto_1.BlogPostDTO, Object]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "createBlogPost", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Blog postu yenilə" }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.Patch)('dashboard/blog-posts/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', multer_1.MulterOptions)),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object", properties: {
                author: { type: "string", maxLength: 100, example: "Namiq Quliyev" },
                title: { type: "string", maxLength: 200, example: "The Future of Warehouse Management" },
                category: { type: "string", maxLength: 100, example: "Logistics" },
                description: { type: "string", maxLength: 500, example: "An overview of upcoming trends in warehouse management." },
                readTime: { type: "string", maxLength: 50, example: "5 min read" },
                active: { type: "boolean", example: false },
                image: { type: "string", format: "binary" }
            }
        }
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_portfolio_dto_1.BlogPostDTO, Object]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "updateBlog", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Blog postunun aktivlik statusunu dəyiş" }),
    (0, common_1.Patch)('dashboard/blog-posts/:id/toggle-active'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('active')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "toggleBlogActiveStatus", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Blog postu ID ilə əldə et" }),
    (0, common_1.Get)('dashboard/blog-posts/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "getBlogById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Bütün blog postlarını əldə et" }),
    (0, common_1.Get)('dashboard/blog-posts'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "getAllBlogs", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Blog postu sil" }),
    (0, common_1.Delete)('dashboard/blog-posts/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "deleteBlog", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Yeni vakansiya əlavə et" }),
    (0, common_1.Post)('dashboard/vacancies'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object", properties: {
                company: { type: "string", maxLength: 100, example: "ABC Logistics" },
                position: { type: "string", maxLength: 100, example: "Warehouse Supervisor" },
                city: { type: "string", maxLength: 100, example: "Baku" },
                salary: { type: "string", maxLength: 100, example: "$3000 - $4000" },
                deadline: { type: "string", example: "2024-12-31" },
                link: { type: "string", example: "https://example.com/apply" },
                priority: { type: "string", example: "High" },
                work_schedule: { type: "string", example: "Full-time" },
                description: { type: "string", example: "Responsible for overseeing warehouse operations." },
                requirements: { type: "string", example: "3+ years in warehouse management." },
                status: { type: "string", example: "Open" },
            }
        }
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_portfolio_dto_1.JobDTO]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "createVacancy", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Vakansiyanı yenilə" }),
    (0, common_1.Patch)('dashboard/vacancies/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object", properties: {
                company: { type: "string", maxLength: 100, example: "ABC Logistics" },
                position: { type: "string", maxLength: 100, example: "Warehouse Supervisor" },
                city: { type: "string", maxLength: 100, example: "Baku" },
                salary: { type: "string", maxLength: 100, example: "$3000 - $4000" },
                deadline: { type: "string", example: "2024-12-31" },
                link: { type: "string", example: "https://example.com/apply" },
                priority: { type: "string", example: "High" },
                work_schedule: { type: "string", example: "Full-time" },
                description: { type: "string", example: "Responsible for overseeing warehouse operations." },
                requirements: { type: "string", example: "3+ years in warehouse management." },
                status: { type: "string", example: "Open" },
            }
        }
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_portfolio_dto_1.JobDTO]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "updateVacancy", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Vakansiyanı ID ilə əldə et" }),
    (0, common_1.Get)('dashboard/vacancies/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "getVacancyById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Vakansiyaları əldə et və axtar" }),
    (0, common_1.Get)('dashboard/vacancies'),
    (0, swagger_1.ApiQuery)({ name: 'city', required: false, type: String, description: 'Şəhər adı ilə axtarış' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)('city')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "searchVacancies", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Vakansiyanı sil" }),
    (0, common_1.Delete)('dashboard/vacancies/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "deleteVacancy", null);
exports.PortfolioController = PortfolioController = __decorate([
    (0, swagger_1.ApiTags)("Portfolio"),
    (0, common_1.Controller)('portfolio'),
    __metadata("design:paramtypes", [portfolio_service_1.PortfolioService])
], PortfolioController);
//# sourceMappingURL=portfolio.controller.js.map