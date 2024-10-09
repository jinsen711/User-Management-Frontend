declare namespace Role {
  type RoleCreate = {
    role_name: string;
    role_status: boolean;
    role_desc: string;
  };

  type RoleUpdateBasic = {
    id: number;
    role_name: string;
    role_desc: string;
  };

  type RoleUpdateStatus = {
    id: number;
    role_status: boolean;
  };

  type RoleAccess = {
    id: number;
    role_name: string;
  };

  type GetUserRole = {
    id: number;
  };

  type SetRoleAccess = {
    id: number;
    access_id: number[];
  };

  type GetRoleAccess = {
    id: number;
  };

  type RoleDelete = {
    id: number;
  };

  type RoleItem = {
    key: number;
    id: number;
    role_name: string;
    role_status: boolean;
    role_desc: string;
    create_time: string;
    update_time: string;
  };

  type GetUserRoles = {
    id: number;
  };

  type UserRoles = {
    all_roles: [{ label: string; value: number }];
    user_roles: number[];
  };

  type SetUserRoles = {
    id: number;
    roles_id: number[];
  };

  export interface RoleListQuery extends Base.BaseQuery {
    role_name?: string;
    role_status?: boolean;
    create_time?: string;
  }

  export interface ResRoleList extends Base.BaseQueryRes {
    data: RoleItem[];
  }

  export interface ResUserRoles extends Base.BaseRes {
    data: UserRoles;
  }

  export interface ResGetRoleAccess extends Base.BaseRes {
    data: {
      all_access: [{ label: string; value: number }];
      role_access: number[];
    };
  }
}
