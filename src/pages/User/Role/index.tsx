import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumnType } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import moment from 'moment';
import { Button, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';

import { handleRoleList, handleDeleteRole, handleUpdateRoleStatus } from './services/api';

import CreateRoleForm from './components/CreateRoleForm';
import UpdateRoleForm from './components/UpdateRoleForm';
import SetAccess from './components/SetAccess';

const TableList: React.FC = () => {
  // 角色基础信息弹窗
  const [updateBasicOpen, setUpdateBasicOpen] = useState<boolean>(false);
  // 角色基础信息
  const [roleUpdateBasicInfo, setRoleBasicInfo] = useState<Role.RoleUpdateBasic>({
    id: 0,
    role_name: '',
    role_desc: '',
  });
  // 角色权限弹窗
  const [setAccessOpen, setSetAccessOpen] = useState<boolean>(false);
  // 角色权限信息
  const [roleUpdateAccessInfo, setRoleAccessInfo] = useState<Role.GetRoleAccess>({
    id: 0,
  });

  const [createFormOpen, setCreateFormOpen] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();

  // 定义表头
  const columns: ProColumnType<Role.RoleItem>[] = [
    {
      title: '角色名称',
      dataIndex: 'role_name',
      valueType: 'text',
    },
    {
      title: '备注',
      dataIndex: 'role_desc',
      valueType: 'text',
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'role_status',
      width: 100,
      valueEnum: {
        false: { text: '已禁用', status: 'Error' },
        true: { text: '已启用', status: 'Success' },
      },
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
        ranges: {
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
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (dom, roleItem: Role.RoleItem) => {
        return [
          <Button
            key={'disable'}
            type={roleItem.role_status ? 'link' : 'link'}
            danger={roleItem.role_status}
            onClick={async () => {
              // 更新状态
              await handleUpdateRoleStatus({ id: roleItem.id, role_status: !roleItem.role_status });
              // 刷新列表
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }}
          >
            {roleItem.role_status ? '禁用' : '启用'}
          </Button>,
          <Button
            key={'edit'}
            type="link"
            onClick={() => {
              // 设置更新角色基础信息
              setRoleBasicInfo({
                id: roleItem.id,
                role_name: roleItem.role_name,
                role_desc: roleItem.role_desc,
              });
              // 打开更新角色弹窗
              setUpdateBasicOpen(true);
            }}
          >
            编辑
          </Button>,
          <Button
            key={'set_access'}
            type="link"
            onClick={() => {
              // 设置角色权限信息
              setRoleAccessInfo({
                id: roleItem.id,
              });
              // 打开设置角色权限弹窗
              setSetAccessOpen(true);
            }}
          >
            权限
          </Button>,
          <Popconfirm
            key={'delete'}
            title="删除不可逆，谨慎操作！"
            onConfirm={async () => {
              // 删除
              await handleDeleteRole({ id: roleItem.id });
              // 刷新列表
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }}
            placement="leftTop"
          >
            <Button danger type="link">
              删除
            </Button>
          </Popconfirm>,
        ];
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable
        headerTitle="角色列表"
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
              setCreateFormOpen(true);
            }}
          >
            <PlusOutlined />
            创建角色
          </Button>,
        ]}
        request={async (params) => handleRoleList({ ...params })}
        columns={columns}
      />

      {/* 创建角色弹窗 */}
      <CreateRoleForm
        actionRef={actionRef.current}
        visible={createFormOpen}
        setVisible={setCreateFormOpen}
      />

      {/* 更新角色弹窗 */}
      <UpdateRoleForm
        actionRef={actionRef.current}
        visible={updateBasicOpen}
        setVisible={setUpdateBasicOpen}
        roleUpdateBasicInfo={roleUpdateBasicInfo}
      />

      {/* 设置角色权限弹窗 */}
      <SetAccess
        visible={setAccessOpen}
        setVisible={setSetAccessOpen}
        getRoleAccessInfo={roleUpdateAccessInfo}
      />
    </PageContainer>
  );
};

export default TableList;
