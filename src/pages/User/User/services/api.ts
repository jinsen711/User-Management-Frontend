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
 * @param {User.UserCreate} createInfo
 * @return {*} Promise<boolean>
 */
export const handleUserCreate = async (createInfo: User.UserCreate): Promise<boolean> => {
  const hide = message.loading('正在创建');
  try {
    await userCreate(createInfo);
    hide();
    message.success('创建成功');
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
 * @param {User.GetUserListQuery} listQuery
 * @return {*} Promise<User.ResGetUserList>
 */
export const handleUserList = async (listQuery: User.UserQuery): Promise<User.UserQueryRes> => {
  const hide = message.loading('正在获取用户列表');
  try {
    const result = await userQuery(listQuery);
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
 * @param {User.UserBasicUpdate} basicInfo
 * @return {*}  {Promise<boolean>}
 */
const handleUserUpdateBasic = async (basicInfo: User.UserBasicUpdate): Promise<boolean> => {
  const hide = message.loading('正在更新用户基础信息');
  try {
    await userBasicUpdate(basicInfo);
    hide();
    message.success('更新成功');
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
 * @param {User.UserStatusUpdate} statusInfo
 * @return {*}  {Promise<boolean>}
 */
const handleUserUpdateStatus = async (statusInfo: User.UserStatusUpdate): Promise<boolean> => {
  // 修改用户状态
  const hide = message.loading('正在更新用户状态');
  try {
    await userStatusUpdate(statusInfo);
    hide();
    message.success('更新成功');
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
 * @param {User.UserDelete} user
 * @return {*}  {Promise<boolean>}
 */
const handleUserDelete = async (user: User.UserDelete): Promise<boolean> => {
  const hide = message.loading('正在删除用户');
  try {
    await userDelete(user);
    hide();
    message.success('删除成功');
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
 * @param {User.GetUserRoles} id
 * @return {*}  {Promise<User.ResUserRoles>}
 */
const handleGetUserRoles = async (userInfo: Role.GetUserRoles): Promise<User.ResUserRoles> => {
  const hide = message.loading('正在获取用户角色');
  try {
    const result = await getUserRole(userInfo);
    hide();
    return result;
  } catch (error: any) {
    hide();
    message.error(error.message);
    return {} as User.ResUserRoles;
  }
};

export const handleSetUserRoles = async (rolesInfo: User.SetUserRoles): Promise<boolean> => {
  const hide = message.loading('正在设置用户角色');
  try {
    await setUserRoles(rolesInfo);
    hide();
    return true;
  } catch (error: any) {
    hide();
    message.error(error.message);
    return false;
  }
};
