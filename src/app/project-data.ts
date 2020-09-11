export interface ProjectChild {
    companyName: string,
    companyWebsite: string,
    country: string,
    alignment: string,
    theme: string,
    summary: string
}

export interface Project {
    fields: ProjectChild
}

export interface ProjectData {
    records: Project[]
}