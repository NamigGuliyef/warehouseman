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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("../../config/cloudinary");
const prisma_service_1 = require("../prisma/prisma.service");
let PortfolioService = class PortfolioService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createWarehouseman(WarehousemanData) {
        return this.prisma.warehouseman.create({
            data: WarehousemanData,
        });
    }
    async getWarehousemanProfile() {
        return this.prisma.warehouseman.findMany();
    }
    async getWarehousemanById(id) {
        return this.prisma.warehouseman.findUnique({
            where: { id },
        });
    }
    async updateWarehouseman(id, updateWarehousemanData) {
        return this.prisma.warehouseman.update({
            where: { id },
            data: updateWarehousemanData,
        });
    }
    async createWorkExperience(createWorkExperienceData) {
        return this.prisma.workExperience.create({
            data: createWorkExperienceData,
        });
    }
    async getWorkExperienceById(id) {
        return this.prisma.workExperience.findUnique({
            where: { id },
        });
    }
    async getAllWorkExperiences() {
        return this.prisma.workExperience.findMany();
    }
    async updateWorkExperience(id, updateWorkExperienceData) {
        return this.prisma.workExperience.update({
            where: { id },
            data: updateWorkExperienceData,
        });
    }
    async deleteWorkExperience(id) {
        return this.prisma.workExperience.delete({
            where: { id },
        });
    }
    async createSkill(createSkillData) {
        return this.prisma.skills.create({
            data: createSkillData,
        });
    }
    async getSkillById(id) {
        return this.prisma.skills.findUnique({
            where: { id },
        });
    }
    async getAllSkills() {
        return this.prisma.skills.findMany();
    }
    async updateSkill(id, updateSkillData) {
        return this.prisma.skills.update({
            where: { id },
            data: updateSkillData,
        });
    }
    async deleteSkill(id) {
        return this.prisma.skills.delete({
            where: { id },
        });
    }
    async createCertificate(certificateData, images) {
        const data = await cloudinary_1.default.uploader.upload(images.path, {
            public_id: images.originalname,
        });
        return this.prisma.certificate.create({
            data: { ...certificateData, image: data.secure_url },
        });
    }
    async updateCertificate(id, certificateData, image) {
        if (!image || image.path === '') {
            return this.prisma.certificate.update({
                where: { id },
                data: { ...certificateData },
            });
        }
        const data = await cloudinary_1.default.uploader.upload(image.path, {
            public_id: image.originalname,
        });
        return this.prisma.certificate.update({
            where: { id },
            data: { ...certificateData, image: data.secure_url },
        });
    }
    async getCertificateById(id) {
        return this.prisma.certificate.findUnique({
            where: { id },
        });
    }
    async getAllCertificates() {
        return this.prisma.certificate.findMany();
    }
    async deleteCertificate(id) {
        return this.prisma.certificate.delete({
            where: { id },
        });
    }
    async createBlogPost(BlogPostData, image) {
        const activeValue = BlogPostData.active === true ? true : false;
        const data = await cloudinary_1.default.uploader.upload(image.path, {
            public_id: image.originalname,
        });
        return this.prisma.blogPost.create({
            data: { ...BlogPostData, active: activeValue, image: data.secure_url },
        });
    }
    async updateBlog(id, BlogPostData, image) {
        const activeValue = BlogPostData.active === true ? true : false;
        if (!image || image.path === '') {
            return this.prisma.blogPost.update({
                where: { id },
                data: { ...BlogPostData, active: activeValue },
            });
        }
        const data = await cloudinary_1.default.uploader.upload(image.path, {
            public_id: image.originalname,
        });
        return this.prisma.blogPost.update({
            where: { id },
            data: { ...BlogPostData, image: data.secure_url, active: activeValue },
        });
    }
    async toggleBlogActiveStatus(id, isActive) {
        return this.prisma.blogPost.update({
            where: { id },
            data: { active: isActive },
        });
    }
    async getAllBlogs() {
        return this.prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
    }
    async getBlogById(id) {
        return this.prisma.blogPost.findUnique({
            where: { id },
        });
    }
    async deleteBlog(id) {
        return this.prisma.blogPost.delete({
            where: { id },
        });
    }
    async createVacancy(jobData) {
        return this.prisma.jobListing.create({
            data: jobData,
        });
    }
    async updateVacancy(id, jobData) {
        return this.prisma.jobListing.update({
            where: { id },
            data: jobData,
        });
    }
    async searchVacancies(city) {
        if (city) {
            return this.prisma.jobListing.findMany({
                where: { city }, orderBy: { deadline: 'desc' }
            });
        }
        return (await this.prisma.jobListing.findMany({ orderBy: { deadline: 'desc' } }));
    }
    async getVacancyById(id) {
        return this.prisma.jobListing.findUnique({
            where: { id },
        });
    }
    async deleteVacancy(id) {
        return this.prisma.jobListing.delete({
            where: { id },
        });
    }
};
exports.PortfolioService = PortfolioService;
exports.PortfolioService = PortfolioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PortfolioService);
//# sourceMappingURL=portfolio.service.js.map