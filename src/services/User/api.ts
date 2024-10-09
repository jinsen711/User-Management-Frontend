import { request } from '@umijs/max';

/** 登录接口 POST /api/v1/admin/user/login */
export async function login(body: User.UserLogin) {
  return request<User.LoginRes>('/api/v1/admin/user/login', {
    method: 'POST',
    data: body,
  });
}

/** 获取当前的用户信息 GET /api/v1/admin/user/cur_user_info */
export async function getCurrentUserInfo() {
  return request<User.GetCurrentUserInfoRes>('/api/v1/admin/user/cur_user_info', {
    method: 'GET',
  });
}

/** 用户查询 GET /api/v1/admin/user */
export async function userQuery(params: User.UserQuery) {
  return request<User.UserQueryRes>('/api/v1/admin/user', {
    method: 'GET',
    params: params,
  });
}

/** 用户创建 POST /api/v1/admin/user */
export async function userCreate(body: User.UserCreate) {
  return request<Base.BaseRes>('/api/v1/admin/user', {
    method: 'POST',
    data: body,
  });
}

/** 用户基础信息更新 PUT /api/v1/admin/user/basic */
export async function userBasicUpdate(body: User.UserBasicUpdate) {
  return request<Base.BaseRes>('/api/v1/admin/user/basic', {
    method: 'PUT',
    data: body,
  });
}

/** 用户密码更新 PUT /api/v1/admin/user/password */
export async function userPasswordUpdate(body: User.UserPasswordUpdate) {
  return request<Base.BaseRes>('/api/v1/admin/user/password', {
    method: 'PUT',
    data: body,
  });
}

/** 用户状态更新 PUT /api/v1/admin/user/status */
export async function userStatusUpdate(body: User.UserStatusUpdate) {
  return request<Base.BaseRes>('/api/v1/admin/user/status', {
    method: 'PUT',
    data: body,
  });
}

/** 用户删除 DELETE /api/v1/admin/user */
export async function userDelete(params: User.UserDelete) {
  return request<Base.BaseRes>('/api/v1/admin/user', {
    method: 'DELETE',
    params: params,
  });
}

/** 设置用户角色 PUT /api/v1/admin/user/set_role */
export async function setUserRoles(body: User.SetUserRoles) {
  return request<Base.BaseRes>('/api/v1/admin/user/set_role', {
    method: 'PUT',
    data: body,
  });
}
