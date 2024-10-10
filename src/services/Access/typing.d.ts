declare namespace Access {
  type GetRoleAccess = {
    id: number;
  };

  export interface GetRoleAccessRes extends Base.BaseRes {
    data: {
      all_access: [{ label: string; value: number }];
      role_access: number[];
    };
  }
}
