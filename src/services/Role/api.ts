import { request } from '@umijs/max';

/** 获取角色列表 GET /api/v1/admin/role */
export async function roleList(params: Role.RoleListQuery, options?: { [key: string]: any }) {
  return request<Role.ResRoleList>('/api/v1/admin/role', {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
}

/** 创建角色 POST /api/v1/admin/role */
export async function createRole(data: Role.RoleCreate, options?: { [key: string]: any }) {
  return request<Base.ResBase>('/api/v1/admin/role', {
    method: 'POST',
    data: data,
    ...(options || {}),
  });
}

/** 更新角色基础信息 PUT /api/v1/admin/role/basic */
export async function updateRoleBasic(
  data: Role.RoleUpdateBasic,
  options?: { [key: string]: any },
) {
  return request<Base.ResBase>(`/api/v1/admin/role/basic`, {
    method: 'PUT',
    data: data,
    ...(options || {}),
  });
}

/** 更新角色状态 PUT /api/v1/admin/role/status */
export async function updateRoleStatus(
  data: Role.RoleUpdateStatus,
  options?: { [key: string]: any },
) {
  return request<Base.ResBase>(`/api/v1/admin/role/status`, {
    method: 'PUT',
    data: data,
    ...(options || {}),
  });
}

/** 删除角色 DELETE /api/v1/admin/role */
export async function deleteRole(params: Role.RoleDelete, options?: { [key: string]: any }) {
  return request<Base.ResBase>(`/api/v1/admin/role`, {
    method: 'DELETE',
    params: params,
    ...(options || {}),
  });
}

/** 获取角色权限 GET /api/v1/admin/access/info */
export async function getRoleAccess(params: Role.GetRoleAccess, options?: { [key: string]: any }) {
  return request<Role.ResGetRoleAccess>('/api/v1/admin/access/info', {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
}

/** 设置角色权限 PUT /api/v1/admin/role/set_access */
export async function setRoleAccess(data: Role.SetRoleAccess, options?: { [key: string]: any }) {
  return request<Base.ResBase>(`/api/v1/admin/role/set_access`, {
    method: 'PUT',
    data: data,
    ...(options || {}),
  });
}
