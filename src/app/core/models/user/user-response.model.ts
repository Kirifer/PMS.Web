
export interface BaseResponse {
    data: UserDataModel[];
    totalCount: number;
    errors: { code: string; message: string }[];
    code: number;
    succeeded: boolean;
}


export interface UserDataModel {
  id: string;
  createdOn: string;
  creatorId: string;
  updatedOn: string;
  updaterId: string;
  firstName: string;
  lastName: string;
  position: string;
  email: string;
  password: string;
  isSupervisor: boolean;
  isActive: boolean;
  isDeleted: boolean;
  itsReferenceId: string;
  fullName: string;
}