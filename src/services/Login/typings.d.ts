declare namespace User {
  type LoginInfo = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
  };

  // 用户账号和密码
  type AccountLogin = {
    username?: string;
    password?: string;
  };

  type Token = {
    token?: string;
  };

  type UserInfo = {
    username: string;
    user_type: boolean; // true:管理员 false:普通用户
    user_status: boolean;
    nickname?: string;
    user_phone?: string;
    user_email?: string;
    full_name?: string;
    scopes?: string[];
    header_img?: string;
    sex?: string;
  };

  type UserItem = {
    key: number;
    id: number;
    username?: string;
    user_type: boolean; // true:管理员 false:普通用户
    nickname?: string;
    user_phone?: string;
    user_email?: string;
    user_status: boolean;
    full_name?: string;
    header_img?: string;
    sex?: number;
    remarks?: string;
    create_time: string;
    update_time: string;
  };

  type UserCreate = {
    username: string;
    password: string;
    user_phone?: string;
    user_email?: string;
    user_status: boolean;
    remarks?: string;
    roles?: number[];
  };

  type UserUpdateBasic = {
    id: number;
    username?: string;
    user_phone?: string;
    user_email?: string;
    remarks?: string;
  };

  type UserUpdatePassword = {
    id: number;
    old_password: string;
    new_password: string;
  };

  type UserUpdateStatus = {
    id: number;
    user_status: boolean;
  };

  type UserDelete = {
    id: number;
  };

  export interface ResLogin extends Base.ResBase {
    date?: Token;
  }

  export interface ResUserInfo extends Base.ResBase {
    data?: UserInfo;
  }

  export interface GetUserListQuery extends Base.TableQuery {
    username?: string; // 用户名
    user_phone?: string; // 手机号
    user_email?: string; // 邮箱
    user_status?: boolean; // 账号状态
  }

  export interface ResGetUserList extends Base.ResTableQueryBase {
    data?: UserItem[];
  }

  type GetUserRoles = {
    id: number;
  };

  type UserRoles = {
    all_roles: [{ label: string; value: number }];
    user_roles: number[];
  };

  export interface ResUserRoles extends Base.ResBase {
    data?: UserRoles;
  }
}
