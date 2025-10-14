export declare class UpdateWarehousemanDTO {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    profBackground?: string;
    technologyFocus?: string;
    experienceYears?: string;
    managedProducts?: string;
    solvedLogistics?: string;
    efficiencyRate?: string;
}
export declare class UpdateSkillDTO {
    name: string;
    level: string;
    category: string;
    warehousemanId: string;
}
export declare class UpdateWorkExperienceDTO {
    company: string;
    position: string;
    period: string;
    description: string;
    location: string;
    warehousemanId: string;
}
export declare class UpdateCertificateDTO {
    name: string;
    date: string;
    issuer: string;
    image: string;
    warehousemanId: string;
}
export declare class UpdateBlogPostDTO {
    title: string;
    description: string;
    date: Date;
    readTime: string;
    category: string;
    image: string;
    content: string;
    author?: string;
}
export declare class UpdateJobDTO {
    company: string;
    position: string;
    city: string;
    deadline: string;
    type: string;
    salary: string;
    description: string;
    requirements: string;
    link: string;
    postedDate: string;
    status: string;
    urgent: boolean;
}
