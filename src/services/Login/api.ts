// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/v1/admin/user/info */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: User.UserInfo;
  }>('/api/v1/admin/user/info', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/v1/admin/user/account/login */
export async function login(body: User.AccountLogin, options?: { [key: string]: any }) {
  return request<User.ResLogin>('/api/v1/admin/user/account/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户列表 GET /api/v1/admin/user */
export async function userList(params: User.GetUserListQuery, options?: { [key: string]: any }) {
  return request<User.ResGetUserList>('/api/v1/admin/user', {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
}

/** 用户创建 POST /api/v1/admin/user */
export async function userCreate(body: User.UserCreate, options?: { [key: string]: any }) {
  return request<Base.ResBase>('/api/v1/admin/user', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 用户更新 PUT /api/v1/admin/user */
export async function userUpdate(body: User.UserUpdate, options?: { [key: string]: any }) {
  return request<Base.ResBase>('/api/v1/admin/user', {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}
