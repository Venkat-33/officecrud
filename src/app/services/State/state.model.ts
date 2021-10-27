export interface StateListResponse{
  status?: string;
  message?: string;
  states?: StatesList[]
}

export interface StatesList{
    id: number;
      stateGovCode?: string;
      stateName?: string;
      shortName?: string;
      isActive?: string;
      comments?: string;
      createdBy?: number;
      updatedBy?: number;
}