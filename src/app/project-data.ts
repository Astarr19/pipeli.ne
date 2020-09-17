export interface Project {
    fields: object,
    id: string
}

export interface ProjectData {
    records: Project[],
    offset: string

}

export interface Startup {
    fields: object,
    id: string
}

export interface StartupData {
    records: Startup[]
    offset: string
}
