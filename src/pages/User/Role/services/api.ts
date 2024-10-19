import {
  roleAccessUpdate,
  roleBasicUpdate,
  roleCreate,
  roleDelete,
  roleQuery,
  roleStatusUpdate,
} from '@/services/Role/api';

import { getRoleAccess } from '@/services/Access/api';

import { message } from 'antd';

export /**
 * @description 获取角色列表
 * @author jin
 * @date 06/10/2024
 * @param {Role.RoleQuery} params
 * @return {*}  {Promise<Role.RoleQueryRes>}
 */
const handleRoleQuery = async (params: Role.RoleQuery): Promise<Role.RoleQueryRes> => {
  const hide = message.loading('正在获取角色列表...');
  try {
    const result = await roleQuery(params);
    hide();
    return result;
  } catch (error: any) {
    hide();
    message.error(error?.message);
    return {} as Role.RoleQueryRes;
  }
};

export /**
 * @description 创建角色
 * @author jin
 * @date 06/10/2024 09:50:52
 * @param {Role.RoleCreate} body
 * @return {*}  {Promise<boolean>}
 */
const handleRoleCreate = async (body: Role.RoleCreate): Promise<boolean> => {
  const hide = message.loading('正在创建角色...');
  try {
    await roleCreate(body);
    hide();
    message.success('创建角色成功');
    return true;
  } catch (error: any) {
    hide();
    message.error(error?.message);
    return false;
  }
};

export /**
 * @description 更新角色基本信息
 * @author jin
 * @date 06/10/2024 09:51:02
 * @param {Role.RoleBasicUpdate} body
 * @return {*}  {Promise<boolean>}
 */
const handleRoleBasicUpdate = async (body: Role.RoleBasicUpdate): Promise<boolean> => {
  const hide = message.loading('正在更新角色...');
  try {
    await roleBasicUpdate(body);
    hide();
    return true;
  } catch (error: any) {
    hide();
    message.error(error?.message);
    return false;
  }
};

export /**
 * @description 更新角色状态
 * @author jin
 * @date 06/10/2024 09:51:10
 * @param {Role.RoleStatusUpdate} body
 * @return {*}  {Promise<boolean>}
 */
const handleRoleStatusUpdate = async (body: Role.RoleStatusUpdate): Promise<boolean> => {
  const hide = message.loading('正在更新角色...');
  try {
    await roleStatusUpdate(body);
    hide();
    return true;
  } catch (error: any) {
    hide();
    message.error(error?.message);
    return false;
  }
};

export /**
 * @description 删除角色
 * @author jin
 * @date 06/10/2024 09:51:18
 * @param {number} params
 * @return {*}  {Promise<boolean>}
 */
const handleRoleDelete = async (params: Role.RoleDelete): Promise<boolean> => {
  const hide = message.loading('正在删除角色...');
  try {
    await roleDelete(params);
    hide();
    return true;
  } catch (error: any) {
    hide();
    message.error(error?.message);
    return false;
  }
};

export /**
 * @description 通过角色ID获取角色权限
 * @author jin
 * @date 07/10/2024
 * @param {Access.GetRoleAccess} params
 * @return {*}  {Promise<Access.GetRoleAccessRes>}
 */
const handleGetRoleAccessInfo = async (
  params: Access.GetRoleAccess,
): Promise<Access.GetRoleAccessRes> => {
  const hide = message.loading('正在获取角色权限...');
  try {
    const result = await getRoleAccess(params);
    hide();
    return result;
  } catch (error: any) {
    hide();
    message.error(error?.message);
    return {} as Access.GetRoleAccessRes;
  }
};

export /**
 * @description 设置角色权限
 * @author jin
 * @date 06/10/2024
 * @param {Role.RoleAccessUpdate} body
 * @return {*}  {Promise<boolean>}
 */
const handleSetRoleAccess = async (body: Role.RoleAccessUpdate): Promise<boolean> => {
  const hide = message.loading('正在设置角色权限...');
  try {
    await roleAccessUpdate(body);
    hide();
    return true;
  } catch (error: any) {
    hide();
    message.error(error?.message);
    return false;
  }
};
