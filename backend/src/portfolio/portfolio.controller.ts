import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MulterOptions } from 'config/multer';
import { BlogPostDTO, CertificateDTO, JobDTO, WarehousemanDTO } from './dto/create-portfolio.dto';
import { CreateSkillDTO } from './dto/create-skill.dto';
import { CreateWorkExperienceDTO } from './dto/create-workexperience.dto';
import { UpdateWarehousemanDTO } from './dto/update-portfolio.dto';
import { UpdateSkillDTO } from './dto/update-skill.dto';
import { UpdateWorkExperienceDTO } from './dto/update-workexperience.dto';
import { PortfolioService } from './portfolio.service';
import { link } from 'fs';


@ApiTags("Portfolio")
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) { }



  @ApiOperation({ summary: "Yeni anbardar profili yarat" })
  @Post('dashboard/warehouseman')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
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
  })
  async createWarehouseman(@Body() warehousemanData: WarehousemanDTO) {
    return this.portfolioService.createWarehouseman(warehousemanData);
  }


  @ApiOperation({ summary: "Anbardar profili əldə et" })
  @HttpCode(HttpStatus.OK)
  @Get('dashboard/warehouseman')
  async getWarehousemanProfile() {
    return this.portfolioService.getWarehousemanProfile();
  }


  @ApiOperation({ summary: "Anbardar profilini ID ilə əldə et" })
  @HttpCode(HttpStatus.OK)
  @Get('dashboard/warehouseman/:id')
  async getWarehousemanById(@Param('id') id: string) {
    return this.portfolioService.getWarehousemanById(id);
  }


  @ApiOperation({ summary: "Anbardar profilini yenile" })
  @HttpCode(HttpStatus.OK)
  @Patch('dashboard/warehouseman/:id')
  @ApiBody({
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
  })
  async updateWarehouseman(@Param('id') id: string, @Body() updateWarehousemanData: UpdateWarehousemanDTO) {
    return this.portfolioService.updateWarehouseman(id, updateWarehousemanData);
  }


  // İş təcrübəsi
  @ApiOperation({ summary: "Yeni iş təcrübəsi əlavə et" })
  @Post('dashboard/work-experience')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: "object", properties: {
        company: { type: "string", maxLength: 100, example: "ABC Logistics" },
        position: { type: "string", maxLength: 100, example: "Warehouse Manager" },
        period: { type: "string", maxLength: 50, example: "2018-2022" },
        description: { type: "string", example: "Managed warehouse operations and logistics." },
        location: { type: "string", maxLength: 100, example: "Baku, Azerbaijan" },
      }
    }
  })
  async createWorkExperience(@Body() createWorkExperienceDTO: CreateWorkExperienceDTO) {
    return this.portfolioService.createWorkExperience(createWorkExperienceDTO);
  }



  @ApiOperation({ summary: "İş təcrübəsini əldə et" })
  @Get('dashboard/work-experience/:id')
  @HttpCode(HttpStatus.OK)
  async getWorkExperienceById(@Param('id') id: string) {
    return this.portfolioService.getWorkExperienceById(id);
  }


  @ApiOperation({ summary: "Bütün iş təcrübələrini əldə et" })
  @Get('dashboard/work-experience')
  @HttpCode(HttpStatus.OK)
  async getAllWorkExperiences() {
    return this.portfolioService.getAllWorkExperiences();
  }



  @ApiOperation({ summary: "İş təcrübəsini yenilə" })
  @Patch('dashboard/work-experience/:id')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    schema: {
      type: "object", properties: {
        company: { type: "string", maxLength: 100, example: "ABC Logistics" },
        position: { type: "string", maxLength: 100, example: "Warehouse Manager" },
        period: { type: "string", maxLength: 50, example: "2018-2022" },
        description: { type: "string", example: "Managed warehouse operations and logistics." },
        location: { type: "string", maxLength: 100, example: "Baku, Azerbaijan" },
      }
    }
  })
  async updateWorkExperience(@Param('id') id: string, @Body() updateWorkExperienceDTO: UpdateWorkExperienceDTO) {
    return this.portfolioService.updateWorkExperience(id, updateWorkExperienceDTO);
  }


  @ApiOperation({ summary: "İş təcrübəsini sil" })
  @Delete('dashboard/work-experience/:id')
  @HttpCode(HttpStatus.OK)
  async deleteWorkExperience(@Param('id') id: string) {
    return this.portfolioService.deleteWorkExperience(id);
  }



  // Bacarıqlar

  @ApiOperation({ summary: "Yeni bacarıq əlavə et" })
  @Post('dashboard/skills')
  @HttpCode(HttpStatus.CREATED)
  async createSkill(@Body() createSkillDTO: CreateSkillDTO) {
    return this.portfolioService.createSkill(createSkillDTO);
  }


  @ApiOperation({ summary: "Bacarıq əldə et" })
  @Get('dashboard/skills/:id')
  @HttpCode(HttpStatus.OK)
  async getSkillById(@Param('id') id: string) {
    return this.portfolioService.getSkillById(id);
  }


  @ApiOperation({ summary: "Bütün bacarıqları əldə et" })
  @Get('dashboard/skills')
  @HttpCode(HttpStatus.OK)
  async getAllSkills() {
    return this.portfolioService.getAllSkills();
  }


  @ApiOperation({ summary: "Bacarıq yenilə" })
  @Patch('dashboard/skills/:id')
  @HttpCode(HttpStatus.OK)
  async updateSkill(@Param('id') id: string, @Body() updateSkillDTO: UpdateSkillDTO) {
    return this.portfolioService.updateSkill(id, updateSkillDTO);
  }


  @ApiOperation({ summary: "Bacarıq sil" })
  @Delete('dashboard/skills/:id')
  @HttpCode(HttpStatus.OK)
  async deleteSkill(@Param('id') id: string) {
    return this.portfolioService.deleteSkill(id);
  }


  // Sertifikatlar
  @ApiOperation({ summary: "Yeni sertifikat əlavə et" })
  @ApiConsumes('multipart/form-data')
  @Post('dashboard/certificates')
  @UseInterceptors(FileInterceptor('image', MulterOptions))
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: "object", properties: {
        name: { type: "string", maxLength: 100, example: "Certified Logistics Professional" },
        date: { type: "string", example: "2022-01-01" },
        organization: { type: "string", maxLength: 100, example: "Logistics Academy" },
        image: { type: "string", format: "binary" }
      }
    }
  })
  async createCertificate(@Body() createCertificateDTO: CertificateDTO, @UploadedFile() image: Express.Multer.File) {
    return this.portfolioService.createCertificate(createCertificateDTO, image);
  }


  @ApiOperation({ summary: "Sertifikatı yenilə" })
  @ApiConsumes('multipart/form-data')
  @Patch('dashboard/certificates/:id')
  @UseInterceptors(FileInterceptor('image', MulterOptions))
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    schema: {
      type: "object", properties: {
        name: { type: "string", maxLength: 100, example: "Certified Logistics Professional" },
        date: { type: "string", example: "2022-01-01" },
        organization: { type: "string", maxLength: 100, example: "Logistics Academy" },
        image: { type: "string", format: "binary" }
      }
    }
  })
  async updateCertificate(@Param('id') id: string, @Body() updateCertificateDTO: CertificateDTO, @UploadedFile() image: Express.Multer.File) {
    return this.portfolioService.updateCertificate(id, updateCertificateDTO, image);
  }



  @ApiOperation({ summary: "Sertifikatı ID ilə əldə et" })
  @Get('dashboard/certificates/:id')
  @HttpCode(HttpStatus.OK)
  async getCertificateById(@Param('id') id: string) {
    return this.portfolioService.getCertificateById(id);
  }



  // Sertifikatları əldə et
  @ApiOperation({ summary: "Bütün sertifikatları əldə et" })
  @Get('dashboard/certificates')
  @HttpCode(HttpStatus.OK)
  async getAllCertificates() {
    return this.portfolioService.getAllCertificates();
  }


  @ApiOperation({ summary: "Sertifikatı sil" })
  @Delete('dashboard/certificates/:id')
  @HttpCode(HttpStatus.OK)
  async deleteCertificate(@Param('id') id: string) {
    return this.portfolioService.deleteCertificate(id);
  }


  // Blog Postları
  @ApiOperation({ summary: "Yeni blog postu əlavə et" })
  @ApiConsumes('multipart/form-data')
  @Post('dashboard/blog-posts')
  @UseInterceptors(FileInterceptor('image', MulterOptions))
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
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
  })
  async createBlogPost(@Body() BlogPostData: BlogPostDTO, @UploadedFile() image: Express.Multer.File) {
    return this.portfolioService.createBlogPost(BlogPostData, image);
  }



  @ApiOperation({ summary: "Blog postu yenilə" })
  @ApiConsumes('multipart/form-data')
  @Patch('dashboard/blog-posts/:id')
  @UseInterceptors(FileInterceptor('image', MulterOptions))
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(HttpStatus.OK)
  @ApiBody({
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
  })
  async updateBlog(@Param('id') id: string, @Body() BlogPostData: BlogPostDTO, @UploadedFile() image: Express.Multer.File) {
    return this.portfolioService.updateBlog(id, BlogPostData, image);
  }



  // Blog aktivliyini dəyişdirmə
  @ApiOperation({ summary: "Blog postunun aktivlik statusunu dəyiş" })
  @Patch('dashboard/blog-posts/:id/toggle-active')
  @HttpCode(HttpStatus.OK)
  async toggleBlogActiveStatus(@Param('id') id: string, @Body('active') isActive: boolean) {
    return this.portfolioService.toggleBlogActiveStatus(id, isActive);
  }



  @ApiOperation({ summary: "Blog postu ID ilə əldə et" })
  @Get('dashboard/blog-posts/:id')
  @HttpCode(HttpStatus.OK)
  async getBlogById(@Param('id') id: string) {
    return this.portfolioService.getBlogById(id);
  }



  @ApiOperation({ summary: "Bütün blog postlarını əldə et" })
  @Get('dashboard/blog-posts')
  @HttpCode(HttpStatus.OK)
  async getAllBlogs() {
    return this.portfolioService.getAllBlogs();
  }


  @ApiOperation({ summary: "Blog postu sil" })
  @Delete('dashboard/blog-posts/:id')
  @HttpCode(HttpStatus.OK)
  async deleteBlog(@Param('id') id: string) {
    return this.portfolioService.deleteBlog(id);
  }


  // Vakansiyalar CRUD API

  // Vakansiya əlavə et
  @ApiOperation({ summary: "Yeni vakansiya əlavə et" })
  @Post('dashboard/vacancies')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
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
  })
  async createVacancy(@Body() jobData: JobDTO) {
    return this.portfolioService.createVacancy(jobData);
  }
 

  // Vakansiyanı yenilə
  @ApiOperation({ summary: "Vakansiyanı yenilə" })
  @Patch('dashboard/vacancies/:id')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
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
  })
  async updateVacancy(@Param('id') id: string, @Body() jobData: JobDTO) {
    return this.portfolioService.updateVacancy(id, jobData);
  }


  // Vakansiyanı ID ilə əldə et
  @ApiOperation({ summary: "Vakansiyanı ID ilə əldə et" })
  @Get('dashboard/vacancies/:id')
  @HttpCode(HttpStatus.OK)
  async getVacancyById(@Param('id') id: string) {
    return this.portfolioService.getVacancyById(id);
  }

  // Bütün vakansiyaları əldə et
  @ApiOperation({ summary: "Vakansiyaları əldə et və axtar" })
  @Get('dashboard/vacancies')
  @ApiQuery({ name: 'city', required: false, type: String, description: 'Şəhər adı ilə axtarış' })
  @HttpCode(HttpStatus.OK)
  async searchVacancies(@Query('city') city?: string) {
    return this.portfolioService.searchVacancies(city);
  }


  // Vakansiyanı sil
  @ApiOperation({ summary: "Vakansiyanı sil" })
  @Delete('dashboard/vacancies/:id')
  @HttpCode(HttpStatus.OK)
  async deleteVacancy(@Param('id') id: string) {
    return this.portfolioService.deleteVacancy(id);
  }


}
