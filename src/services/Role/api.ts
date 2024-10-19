import { request } from '@umijs/max';

/** 角色查询 GET /api/v1/admin/role */
export async function roleQuery(params: Role.RoleQuery) {
  return request<Role.RoleQueryRes>('/api/v1/admin/role', {
    method: 'GET',
    params: params,
  });
}

/** 角色创建 POST /api/v1/admin/role */
export async function roleCreate(data: Role.RoleCreate) {
  return request<Base.BaseRes>('/api/v1/admin/role', {
    method: 'POST',
    data: data,
  });
}

/** 角色基础信息更新 PUT /api/v1/admin/role/basic */
export async function roleBasicUpdate(data: Role.RoleBasicUpdate) {
  return request<Base.BaseRes>(`/api/v1/admin/role/basic`, {
    method: 'PUT',
    data: data,
  });
}

/** 角色状态更新 PUT /api/v1/admin/role/status */
export async function roleStatusUpdate(data: Role.RoleStatusUpdate) {
  return request<Base.BaseRes>(`/api/v1/admin/role/status`, {
    method: 'PUT',
    data: data,
  });
}

/** 角色删除 DELETE /api/v1/admin/role */
export async function roleDelete(params: Role.RoleDelete) {
  return request<Base.BaseRes>(`/api/v1/admin/role`, {
    method: 'DELETE',
    params: params,
  });
}

/** 角色权限更新 PUT /api/v1/admin/role/access */
export async function roleAccessUpdate(data: Role.RoleAccessUpdate) {
  return request<Base.BaseRes>(`/api/v1/admin/role/access`, {
    method: 'PUT',
    data: data,
  });
}

/** 获取指定 用户 角色信息 GET /api/v1/admin/role/info */
export async function getUserRole(params: Role.GetUserRole) {
  return request<Role.GetUserRoleRes>('/api/v1/admin/role/info', {
    method: 'GET',
    params: params,
  });
}
