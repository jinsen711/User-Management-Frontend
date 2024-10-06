import {
  roleList,
  createRole,
  updateRoleBasic,
  updateRoleStatus,
  deleteRole,
  setRoleAccess,
  getRoleAccess,
} from '@/services/Role/api';

import { message } from 'antd';

export /**
 * @description 获取角色列表
 * @author jin
 * @date 06/10/2024
 * @param {Role.RoleListQuery} roleListInfo
 * @return {*}  {Promise<Role.ResRoleList>}
 */
const handleRoleList = async (roleListInfo: Role.RoleListQuery): Promise<Role.ResRoleList> => {
  const hide = message.loading('正在获取角色列表...');
  try {
    const result = await roleList(roleListInfo);
    hide();
    return result;
  } catch (error: any) {
    hide();
    message.error(error?.message);
    return {} as Role.ResRoleList;
  }
};

export /**
 * @description 创建角色
 * @author jin
 * @date 06/10/2024 09:50:52
 * @param {Role.RoleCreate} roleInfo
 * @return {*}  {Promise<boolean>}
 */
const handleCreateRole = async (roleInfo: Role.RoleCreate): Promise<boolean> => {
  const hide = message.loading('正在创建角色...');
  try {
    await createRole(roleInfo);
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
 * @param {Role.RoleUpdateBasic} roleInfo
 * @return {*}  {Promise<boolean>}
 */
const handleUpdateRoleBasic = async (roleInfo: Role.RoleUpdateBasic): Promise<boolean> => {
  const hide = message.loading('正在更新角色...');
  try {
    await updateRoleBasic(roleInfo);
    hide();
    message.success('更新角色成功');
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
 * @param {Role.RoleUpdateStatus} roleInfo
 * @return {*}  {Promise<boolean>}
 */
const handleUpdateRoleStatus = async (roleInfo: Role.RoleUpdateStatus): Promise<boolean> => {
  const hide = message.loading('正在更新角色...');
  try {
    await updateRoleStatus(roleInfo);
    hide();
    message.success('更新角色成功');
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
 * @param {number} roleId
 * @return {*}  {Promise<boolean>}
 */
const handleDeleteRole = async (deleteInfo: Role.RoleDelete): Promise<boolean> => {
  const hide = message.loading('正在删除角色...');
  try {
    await deleteRole(deleteInfo);
    hide();
    message.success('删除角色成功');
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
 * @param {Role.GetRoleAccess} getRoleAccessInfo
 * @return {*}  {Promise<Role.ResGetRoleAccess>}
 */
const handleGetRoleAccess = async (
  getRoleAccessInfo: Role.GetRoleAccess,
): Promise<Role.ResGetRoleAccess> => {
  const hide = message.loading('正在获取角色权限...');
  try {
    const result = await getRoleAccess(getRoleAccessInfo);
    hide();
    return result;
  } catch (error: any) {
    hide();
    message.error(error?.message);
    return {} as Role.ResGetRoleAccess;
  }
};

export /**
 * @description 设置角色权限
 * @author jin
 * @date 06/10/2024
 * @param {Role.SetRoleAccess} setRoleAccessInfo
 * @return {*}  {Promise<boolean>}
 */
const handleSetRoleAccess = async (setRoleAccessInfo: Role.SetRoleAccess): Promise<boolean> => {
  const hide = message.loading('正在设置角色权限...');
  try {
    await setRoleAccess(setRoleAccessInfo);
    hide();
    return true;
  } catch (error: any) {
    hide();
    message.error(error?.message);
    return false;
  }
};
