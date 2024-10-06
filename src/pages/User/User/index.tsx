import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Avatar, Popconfirm } from 'antd';
import moment from 'moment';

import CreateUserForm from './components/CreateUserForm';
import UpdateUserForm from './components/UpdateUserForm';
import SetRole from './components/SetRole';
import { handleUserList, handleUserDelete, handleUserUpdateStatus } from './services/api';

const TableList: React.FC = () => {
  // 添加用户弹窗
  const [userCreateOpen, setUserCreateOpen] = useState<boolean>(false);
  // 更新用户弹窗
  const [userUpdateOpen, setUserUpdateOpen] = useState<boolean>(false);
  // 角色管理弹窗
  const [roleOpen, setRoleOpen] = useState<boolean>(false);
  // 更新用户基础信息
  const [userUpdateBasicInfo, setUserBasicInfo] = useState<User.UserUpdateBasic>({ id: 0 });
  // 设置角色信息
  const [getUserRolesInfo, setGetUserRolesInfo] = useState<User.GetUserRoles>({ id: 0 });

  const actionRef = useRef<ActionType>();

  // 表格列
  const columns: ProColumns<User.UserItem>[] = [
    {
      title: '头像',
      dataIndex: 'header_img',
      search: false,
      width: 60,
      // render: (_, d) => <Avatar src={d.header_img} />,
      render: () => (
        <Avatar src="https://s1.imagehub.cc/images/2024/10/03/20005e6d544e9a0543edfe27a7e4e398.jpg"></Avatar>
      ),
    },
    {
      title: '用户名',
      dataIndex: 'username',
      valueType: 'text',
    },
    {
      title: '手机号',
      dataIndex: 'user_phone',
      valueType: 'text',
      copyable: true,
    },
    {
      title: '邮箱',
      dataIndex: 'user_email',
      valueType: 'text',
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      valueType: 'text',
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'dateTime',
      width: 150,
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'dateTimeRange',
      fieldProps: {
        presets: {
          今天: [moment().startOf('day'), moment().endOf('day')],
          昨天: [
            moment().subtract(1, 'days').startOf('day'),
            moment().subtract(1, 'days').endOf('day'),
          ],
          '3天内': [moment().subtract(2, 'days').startOf('day'), moment().endOf('day')],
          '7天内': [moment().subtract(6, 'days').startOf('day'), moment().endOf('day')],
          本周: [moment().subtract('weeks').startOf('week'), moment().endOf('week')],
          本月: [moment().subtract('months').startOf('month'), moment().endOf('month')],
          上月: [
            moment().subtract(1, 'months').startOf('month'),
            moment().subtract(1, 'months').endOf('month'),
          ],
        },
        showTime: {
          defaultValue: [moment('00:00:00', 'hh:mm:ss'), moment('23:59:59', 'hh:mm:ss')],
        },
      },
      hideInTable: true,
    },
    {
      title: '状态',
      dataIndex: 'user_status',
      width: 100,
      valueEnum: {
        0: { text: '已禁用', status: 'Error' },
        1: { text: '已启用', status: 'Success' },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (dom, userItem: User.UserItem) => {
        return [
          <Button
            key={'disable'}
            type={userItem.user_status ? 'dashed' : 'primary'}
            danger={userItem.user_status}
            onClick={async () => {
              // 更新状态
              await handleUserUpdateStatus({ ...userItem, user_status: !userItem.user_status });
              // 刷新列表
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }}
          >
            {userItem.user_status ? '禁用' : '启用'}
          </Button>,

          <Button
            key={'setrole'}
            type={'dashed'}
            onClick={() => {
              setGetUserRolesInfo({ id: userItem.id });
              // 打开角色管理弹窗
              setRoleOpen(true);
            }}
          >
            角色
          </Button>,

          <Button
            key={'edit'}
            ghost
            type="primary"
            onClick={() => {
              setUserBasicInfo({
                id: userItem.id,
                username: userItem.username,
                user_phone: userItem.user_phone,
                user_email: userItem.user_email,
                remarks: userItem.remarks,
              });
              // 打开更新用户弹窗
              setUserUpdateOpen(true);
            }}
          >
            编辑
          </Button>,
          <Popconfirm
            key={'delete'}
            title="删除不可逆，谨慎操作！"
            onConfirm={async () => {
              await handleUserDelete({ ...userItem });
              // 刷新列表
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }}
            placement="leftTop"
          >
            <Button danger>删除</Button>
          </Popconfirm>,
        ];
      },
    },
  ];

  return (
    <PageContainer>
      {/* 数据表格 */}
      <ProTable
        headerTitle="用户列表"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setUserCreateOpen(true);
            }}
          >
            <PlusOutlined />
            创建用户
          </Button>,
        ]}
        request={async (params) => handleUserList({ ...params })} // 获取数据
        columns={columns} // 表格列配置
        pagination={{
          defaultPageSize: 10, // 默认每页条数
          pageSizeOptions: ['5', '10', '20', '30', '50'], // 可选择的每页条数
          showSizeChanger: true, // 显示每页条数切换器
        }}
      />

      {/* 创建新用户弹窗 */}
      <CreateUserForm
        actionRef={actionRef.current}
        visible={userCreateOpen}
        setVisible={setUserCreateOpen}
      />
      {/* 更新用户弹窗 */}
      <UpdateUserForm
        actionRef={actionRef.current}
        visible={userUpdateOpen}
        setVisible={setUserUpdateOpen}
        userUpdateBasicInfo={userUpdateBasicInfo}
      />
      {/* 角色管理弹窗 */}
      <SetRole visible={roleOpen} setVisible={setRoleOpen} getUserRolesInfo={getUserRolesInfo} />
    </PageContainer>
  );
};

export default TableList;
