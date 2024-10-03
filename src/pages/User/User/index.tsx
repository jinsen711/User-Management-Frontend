import { addRule, removeRule, rule, updateRule } from '@/services/ant-design-pro/api';
import { userList, userUpdate } from '@/services/Login/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useParams } from '@umijs/max';
import { Button, Drawer, Input, message, Avatar, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';
import moment from 'moment';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import AddUserForm from './components/CreateUserForm';

/**
 * @description 获取用户列表
 * @author jin
 * @date 04/10/2024
 * @param {User.GetUserListQuery} listQuery
 * @return {*} Promise<User.ResGetUserList>
 */
const handleUserList = async (listQuery: User.GetUserListQuery): Promise<User.ResGetUserList> => {
  const hide = message.loading('正在获取用户列表');
  try {
    const result = await userList(listQuery);
    hide();
    return result;
  } catch (error: any) {
    hide();
    message.error(error.message);
    return {} as User.ResGetUserList;
  }
};

/**
 * @description 更新用户信息
 * @author jin
 * @date 04/10/2024
 * @param {User.UserUpdate} updateInfo
 * @return {*}  {Promise<boolean>}
 */
const handleUserUpdate = async (updateInfo: User.UserUpdate): Promise<boolean> => {
  const hide = message.loading('正在更新信息');
  try {
    await userUpdate(updateInfo);
    hide();
    message.success('更新成功');
    return true;
  } catch (error: any) {
    hide();
    message.error(error.message);
    return false;
  }
};

/**
 * @description 修改用户状态
 * @author jin
 * @date 04/10/2024
 * @param {User.UserUpdate} updateInfo
 * @return {*} {Promise<boolean>}
 */
const changeUserStatus = async (updateInfo: User.UserUpdate): Promise<boolean> => {
  // 修改用户状态
  updateInfo.user_status = !updateInfo.user_status;
  // 更新用户信息
  return await handleUserUpdate(updateInfo);
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.RuleListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<User.UserItem>();
  const [selectedRowsState, setSelectedRows] = useState<User.UserItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

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
        // defaultValue:[moment().subtract(1, 'days').startOf('day'), moment()],
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
      render: (_dom, d) => {
        return [
          <Button
            key={'disable'}
            type={d.user_status ? 'dashed' : 'primary'}
            danger={d.user_status}
            onClick={async () => {
              // 更新状态
              await changeUserStatus({ ...d });
              // 刷新列表
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }}
          >
            {d.user_status ? '禁用' : '启用'}
          </Button>,
          <Button
            key={'setrole'}
            type={'dashed'}
            onClick={() => {
              setUserData(d);
              setroleVisible(true);
            }}
          >
            角色
          </Button>,
          <Button
            key={'edit'}
            ghost
            type="primary"
            onClick={() => {
              setUserData(d);
              setEditVisible(true);
            }}
          >
            编辑
          </Button>,
          <Popconfirm
            key={'delete'}
            title="😫删除不可逆，谨慎操作！"
            onConfirm={() => deletUser(d)}
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
        headerTitle="所有用户"
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
              handleModalOpen(true);
            }}
          >
            <PlusOutlined />
            创建用户
          </Button>,
        ]}
        request={async (params) => handleUserList({ ...params })} // 获取数据
        columns={columns} // 表格列配置
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        pagination={{
          defaultPageSize: 10, // 默认每页条数
          pageSizeOptions: ['5', '10', '20', '30', '50'], // 可选择的每页条数
          showSizeChanger: true, // 显示每页条数切换器
        }}
      />

      {/* 批量删除功能 */}
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="Total number of service calls"
                />{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="Batch approval"
            />
          </Button>
        </FooterToolbar>
      )}

      {/* 创建新用户弹窗 */}
      <AddUserForm
        actionRef={actionRef.current}
        visible={createModalOpen}
        setVisible={handleModalOpen}
      />

      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalOpen={updateModalOpen}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.username && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.username}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.username,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
