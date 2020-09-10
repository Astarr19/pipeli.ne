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

// ProjectData is the parent, Project is a child, then last is ProjectChild
// Order matters (goes from bottom to top)