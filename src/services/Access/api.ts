import { request } from '@umijs/max';

/** 角色权限 GET /api/v1/admin/access/info */
export async function getRoleAccess(params: Access.GetRoleAccess) {
  return request<Access.GetRoleAccessRes>('/api/v1/admin/access/info', {
    method: 'GET',
    params: params,
  });
}
