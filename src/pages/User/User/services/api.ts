import {
  setUserRoles,
  userBasicUpdate,
  userCreate,
  userDelete,
  userQuery,
  userStatusUpdate,
} from '@/services/User/api';

import { getUserRole } from '@/services/Role/api';

import { message } from 'antd';

/**
 * @description 创建用户
 * @author jin
 * @date 05/10/2024
 * @param {User.UserCreate} body
 * @return {*} Promise<boolean>
 */
export const handleUserCreate = async (body: User.UserCreate): Promise<boolean> => {
  const hide = message.loading('正在创建');
  try {
    await userCreate(body);
    hide();
    return true;
  } catch (error: any) {
    hide();
    message.error(error?.message);
    return false;
  }
};

/**
 * @description 获取用户列表
 * @author jin
 * @date 04/10/2024
 * @param {User.UserQuery} params
 * @return {*} Promise<User.ResGetUserList>
 */
export const handleUserQuery = async (params: User.UserQuery): Promise<User.UserQueryRes> => {
  const hide = message.loading('正在获取用户列表');
  try {
    const result = await userQuery(params);
    hide();
    return result;
  } catch (error: any) {
    hide();
    message.error(error.message);
    return {} as User.UserQueryRes;
  }
};

export /**
 * @description 更新用户基础信息
 * @author jin
 * @date 05/10/2024
 * @param {User.UserBasicUpdate} body
 * @return {*}  {Promise<boolean>}
 */
const handleUserBasicUpdate = async (body: User.UserBasicUpdate): Promise<boolean> => {
  const hide = message.loading('正在更新用户基础信息');
  try {
    await userBasicUpdate(body);
    hide();
    return true;
  } catch (error: any) {
    hide();
    message.error(error.message);
    return false;
  }
};

export /**
 * @description 更新用户状态
 * @author jin
 * @date 05/10/2024
 * @param {User.UserStatusUpdate} body
 * @return {*}  {Promise<boolean>}
 */
const handleUserStatusUpdate = async (body: User.UserStatusUpdate): Promise<boolean> => {
  // 修改用户状态
  const hide = message.loading('正在更新用户状态');
  try {
    await userStatusUpdate(body);
    hide();
    return true;
  } catch (error: any) {
    hide();
    message.error(error.message);
    return false;
  }
};

export /**
 * @description 删除用户
 * @author jin
 * @date 05/10/2024
 * @param {User.UserDelete} params
 * @return {*}  {Promise<boolean>}
 */
const handleUserDelete = async (params: User.UserDelete): Promise<boolean> => {
  const hide = message.loading('正在删除用户');
  try {
    await userDelete(params);
    hide();
    return true;
  } catch (error: any) {
    hide();
    message.error(error.message);
    return false;
  }
};

export /**
 * @description 获取用户角色
 * @author jin
 * @date 05/10/2024
 * @param {User.GetUserRole} params
 * @return {*}  {Promise<Role.GetUserRoleRes>}
 */
const handleGetUserRole = async (params: Role.GetUserRole): Promise<Role.GetUserRoleRes> => {
  const hide = message.loading('正在获取用户角色');
  try {
    const result = await getUserRole(params);
    hide();
    return result;
  } catch (error: any) {
    hide();
    message.error(error.message);
    return {} as Role.GetUserRoleRes;
  }
};

export /**
 * @description 设置用户角色
 * @author jin
 * @date 10/10/2024
 * @param {User.SetUserRole} body
 * @return {*}  {Promise<boolean>}
 */
const handleSetUserRoles = async (body: User.SetUserRole): Promise<boolean> => {
  const hide = message.loading('正在设置用户角色');
  try {
    await setUserRoles(body);
    hide();
    return true;
  } catch (error: any) {
    hide();
    message.error(error.message);
    return false;
  }
};
