import { Injectable } from '@nestjs/common';
import cloudinary from 'config/cloudinary';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  BlogPostDTO,
  CertificateDTO,
  JobDTO,
  WarehousemanDTO,
} from './dto/create-portfolio.dto';
import { CreateSkillDTO } from './dto/create-skill.dto';
import { CreateWorkExperienceDTO } from './dto/create-workexperience.dto';
import {
  UpdateSkillDTO,
  UpdateWarehousemanDTO,
} from './dto/update-portfolio.dto';
import { UpdateWorkExperienceDTO } from './dto/update-workexperience.dto';

@Injectable()
export class PortfolioService {
  constructor(private prisma: PrismaService) {}

  async createWarehouseman(WarehousemanData: WarehousemanDTO) {
    return this.prisma.warehouseman.create({
      data: WarehousemanData,
    });
  }

  // Anbardar profili əldə et
  async getWarehousemanProfile() {
    return this.prisma.warehouseman.findMany();
  }

  async getWarehousemanById(id: string) {
    return this.prisma.warehouseman.findUnique({
      where: { id },
    });
  }

  async updateWarehouseman(
    id: string,
    updateWarehousemanData: UpdateWarehousemanDTO,
  ) {
    return this.prisma.warehouseman.update({
      where: { id },
      data: updateWarehousemanData,
    });
  }

  async createWorkExperience(
    createWorkExperienceData: CreateWorkExperienceDTO,
  ) {
    return this.prisma.workExperience.create({
      data: createWorkExperienceData,
    });
  }

  async getWorkExperienceById(id: string) {
    return this.prisma.workExperience.findUnique({
      where: { id },
    });
  }

  async getAllWorkExperiences() {
    return this.prisma.workExperience.findMany();
  }

  async updateWorkExperience(
    id: string,
    updateWorkExperienceData: UpdateWorkExperienceDTO,
  ) {
    return this.prisma.workExperience.update({
      where: { id },
      data: updateWorkExperienceData,
    });
  }

  async deleteWorkExperience(id: string) {
    return this.prisma.workExperience.delete({
      where: { id },
    });
  }

  // Bacarıqlar

  async createSkill(createSkillData: CreateSkillDTO) {
    return this.prisma.skills.create({
      data: createSkillData,
    });
  }

  async getSkillById(id: string) {
    return this.prisma.skills.findUnique({
      where: { id },
    });
  }

  async getAllSkills() {
    return this.prisma.skills.findMany();
  }

  async updateSkill(id: string, updateSkillData: UpdateSkillDTO) {
    return this.prisma.skills.update({
      where: { id },
      data: updateSkillData,
    });
  }

  async deleteSkill(id: string) {
    return this.prisma.skills.delete({
      where: { id },
    });
  }

  // Sertifikatlar
  async createCertificate(
    certificateData: CertificateDTO,
    images: Express.Multer.File,
  ) {
    const data = await cloudinary.uploader.upload(images.path, {
      public_id: images.originalname,
    });
    return this.prisma.certificate.create({
      data: { ...certificateData, image: data.secure_url },
    });
  }

  // Sertifikat yeniləmə
  async updateCertificate(
    id: string,
    certificateData: CertificateDTO,
    image: Express.Multer.File,
  ) {
    if (!image || image.path === '') {
      return this.prisma.certificate.update({
        where: { id },
        data: { ...certificateData },
      });
    }
    const data = await cloudinary.uploader.upload(image.path, {
      public_id: image.originalname,
    });
    return this.prisma.certificate.update({
      where: { id },
      data: { ...certificateData, image: data.secure_url },
    });
  }

  async getCertificateById(id: string) {
    return this.prisma.certificate.findUnique({
      where: { id },
    });
  }

  async getAllCertificates() {
    return this.prisma.certificate.findMany();
  }

  async deleteCertificate(id: string) {
    return this.prisma.certificate.delete({
      where: { id },
    });
  }

  // Blog API- şəkildə əlavə olunacaq
  async createBlogPost(BlogPostData: BlogPostDTO, image: Express.Multer.File) {
    const activeValue = BlogPostData.active === true ? true : false;
    const data = await cloudinary.uploader.upload(image.path, {
      public_id: image.originalname,
    });
    return this.prisma.blogPost.create({
      data: { ...BlogPostData, active: activeValue, image: data.secure_url },
    });
  }

  // Blog dəyişdirmə

  async updateBlog(
    id: string,
    BlogPostData: BlogPostDTO,
    image: Express.Multer.File,
  ) {
    // active-i həmişə boolean-a çeviririk
    const activeValue = BlogPostData.active === true ? true : false;
    if (!image || image.path === '') {
      return this.prisma.blogPost.update({
        where: { id },
        data: { ...BlogPostData, active: activeValue },
      });
    }
    const data = await cloudinary.uploader.upload(image.path, {
      public_id: image.originalname,
    });
    return this.prisma.blogPost.update({
      where: { id },
      data: { ...BlogPostData, image: data.secure_url, active: activeValue },
    });
  }

  // Blog aktivliyini dəyişdirmə
  async toggleBlogActiveStatus(id: string, isActive: boolean) {
    return this.prisma.blogPost.update({
      where: { id },
      data: { active: isActive },
    });
  }

  // Blogları əldə et
  async getAllBlogs() {
    return this.prisma.blogPost.findMany({ where: { active: true }});
  }

  // Blogu ID ilə əldə et

  async getBlogById(id: string) {
    return this.prisma.blogPost.findUnique({
      where: { id },
    });
  }

  // Blogu sil
  async deleteBlog(id: string) {
    return this.prisma.blogPost.delete({
      where: { id },
    });
  }



  // Vakansiya əlavə et
  async createVacancy(jobData:JobDTO) {
    return this.prisma.jobListing.create({
      data: jobData,
    });
  }

  // Vakansiya yenilə
  async updateVacancy(id: string, jobData:JobDTO) {
    return this.prisma.jobListing.update({
      where: { id },
      data: jobData,
    });
  }




  // şəhər axtarışı ilə vakansiyaları əldə et və axtarış olmadıqda bütün vakansiyaları gətir
  async searchVacancies(city?: string) {
    if (city) { 
      return this.prisma.jobListing.findMany({
        where: { city} });
    } 
    return this.prisma.jobListing.findMany();
  }


  // Vakansiyanı ID ilə əldə et
  async getVacancyById(id: string)
  {
    return this.prisma.jobListing.findUnique({
      where: { id },
    });
  }


  // Vakansiyanı sil
  async deleteVacancy(id: string) {
    return this.prisma.jobListing.delete({
      where: { id },
    });
  }

}
