declare namespace Role {
  type RoleCreate = {
    role_name: string;
    role_status?: boolean;
    role_desc?: string;
  };

  type RoleBasicUpdate = {
    id: number;
    role_name?: string;
    role_desc?: string;
  };

  type RoleStatusUpdate = {
    id: number;
    role_status: boolean;
  };

  type GetUserRole = {
    id: number;
  };

  type RoleAccessUpdate = {
    id: number;
    access_id?: number[];
  };

  type RoleDelete = {
    id: number;
  };

  type RoleInfo = {
    key: number;
    id: number;
    role_name: string;
    role_status: boolean;
    role_desc: string;
    create_time: string;
    update_time: string;
  };

  type GetUserRole = {
    id: number;
  };

  type UserRoleUpdate = {
    id: number;
    roles_id: number[];
  };

  export interface RoleQuery extends Base.BaseQuery {
    role_name?: string;
    role_status?: boolean;
    create_time?: string;
  }

  export interface RoleQueryRes extends Base.BaseQueryRes {
    data: RoleInfo[];
  }

  export interface GetUserRoleRes extends Base.BaseRes {
    data: {
      all_roles: [{ label: string; value: number }];
      user_roles: number[];
    };
  }
}
