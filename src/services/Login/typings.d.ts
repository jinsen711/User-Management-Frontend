declare namespace User {
  type LoginParams = {
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
    token: string;
  };

  type UserInfo = {
    username: string;
    age: number;
    user_type: boolean; // true:管理员 false:普通用户
    nickname: string;
    user_phone: string;
    user_email: string;
    full_name: string;
    scopes: string[];
    user_status: boolean;
    header_img: string;
    sex: string;
  };

  type ResBase = {
    code?: number;
    msg?: string;
    data?: any;
  };

  export interface ResLogin extends ResBase {
    date?: Token;
  }

  export interface ResUserInfo extends ResBase {
    data?: UserInfo;
  }
}
