export interface BioType {
    name: string;
    roles: string[];
    description: string;
    github: string;
    resume: string;
    telegram: string;
    vk: string;
}

export interface SkillsType {
    titleSection: string;
    descriptionSection: string;
    categoryList: SkillCategoryType[]
}

export interface SkillItemType {
    name: string;
    image: string;
}

export interface SkillCategoryType {
    title: string;
    stack: SkillItemType[];
}

export interface ExperienceType {
    titleSection: string;
    descriptionSection: string;
    experienceList: ExperienceItem[];
}

export interface ExperienceItem {
    id: number;
    img: string;
    role: string;
    company: string;
    date: string;
    desc: string;
    skills: string[];
}

export interface ProjectsType {
    titleSection: string;
    descriptionSection: string;
    visit: string;
    projectList: ProjectType[];
}
export interface ProjectType {
    id: number;
    title: string;
    date: string;
    description: string;
    image: string;
    tags: string[];
    category: string;
    webapp: string;
}

export interface HeroType {
    hello: string;
    check_resume: string;
}

export interface ContactType {
    title: string;
    desc: string;
    titleForm: string;
    email: string;
    name: string;
    subject: string;
    message: string;
    send: string;
    emailRequired: string;
    invalidEmail: string;
    nameRequired: string;
    messageRequired: string;
    failedSendMessage: string;
    successSendMessage: string;
    sendingMessage: string;
    unknownError: string;
    errors?: {
        emailRequired?: string;
        emailInvalid?: string;
        nameRequired?: string;
        messageRequired?: string;
        submitFailed?: string;
    };
    successMessage?: string;
    sending?: string;
}

export interface UserData {
    email: string;
    name: string;
    message: string;
}

export interface FormErrors {
    email?: string;
    name?: string;
    message?: string;
}

export interface FormMessage {
    status: string;
    message: string;
}

export interface MenuItems {
    about: string;
    skills: string;
    experience: string;
    projects: string;
    githubProfile: string;
}

export interface MobileMenuProps {
    isOpen: boolean;
}