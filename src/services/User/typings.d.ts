declare namespace User {
  type UserLogin = {
    username: string;
    password: string;
  };

  type UserCreate = {
    username: string;
    password: string;
    user_type?: boolean;
    user_status?: boolean;
    user_phone?: string;
    user_email?: string;
    nickname?: string;
    full_name?: string;
    header_img?: string;
    remarks?: string;
  };

  type UserBasicUpdate = {
    id: number;
    username?: string;
    sex?: string;
    user_phone?: string;
    user_email?: string;
    nickname?: string;
    full_name?: string;
    header_img?: string;
    remarks?: string;
  };

  type UserPasswordUpdate = {
    id: number;
    old_password: string;
    new_password: string;
  };

  type UserStatusUpdate = {
    id: number;
    user_status: boolean;
  };

  type UserDelete = {
    id: number;
  };

  type _TokenRes = {
    token: string;
  };

  export interface LoginRes extends Base.ResBase {
    date: _TokenRes;
  }

  type _UserInfoRes = {
    id: number;
    key: number;
    username: string;
    user_type: boolean;
    user_status: boolean;
    user_phone: string;
    user_email: string;
    header_img: string;
    full_name: string;
    sex: string;
    scopes: string[];
    remarks: string;
    nickname: string;
    create_time: string;
    update_time: string;
  };

  export interface GetCurrentUserInfoRes extends Base.ResBase {
    data: _UserInfoRes;
  }

  export interface UserQuery extends Base.BaseQuery {
    username?: string;
    user_status?: boolean;
    sex?: string;
    user_phone?: string;
    user_email?: string;
    nickname?: string;
    full_name?: string;
    remarks?: string;
  }

  export interface UserQueryRes extends Base.ResTableQueryBase {
    data: _UserInfoRes[];
  }

  type UserRoles = {
    all_roles: [{ label: string; value: number }];
    user_roles: number[];
  };

  type SetUserRoles = {
    id: number;
    roles_id?: number[];
  };

  export interface ResUserRoles extends Base.ResBase {
    data: UserRoles;
  }
}
