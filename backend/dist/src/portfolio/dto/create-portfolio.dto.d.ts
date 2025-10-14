export declare class WarehousemanDTO {
    fullName: string;
    position: string;
    email: string;
    phone: string;
    profBackground?: string;
    technologyFocus?: string;
    experienceYears?: string;
    managedProducts?: string;
    solvedLogistics?: string;
    efficiencyRate?: string;
}
export declare class SkillDTO {
    name: string;
    level: string;
    category: string;
    warehousemanId: string;
}
export declare class WorkExperienceDTO {
    company: string;
    position: string;
    period: string;
    description: string;
    location: string;
    warehousemanId: string;
}
export declare class CertificateDTO {
    name: string;
    date: string;
    organization: string;
    image: string;
}
export declare class BlogPostDTO {
    author?: string;
    title: string;
    category: string;
    description: string;
    readTime: string;
    image: string;
    active: boolean;
}
export declare class JobDTO {
    company: string;
    position: string;
    city: string;
    salary: string;
    deadline: string;
    link: string;
    work_schedule: string;
    priority: string;
    description: string;
    requirements: string;
    status: string;
}
