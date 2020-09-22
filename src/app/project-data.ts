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

export interface FoundObj {
    maturityScore: boolean,
    projectLead: boolean,
    ongoingStatus: boolean,
    statusSchedule: boolean,
    firstEngagement: boolean,
    interestedPartners: boolean,
    engagementType: boolean,
    seamlessInvestment: boolean
}