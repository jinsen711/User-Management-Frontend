import { ActionType, ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { memo } from 'react';

import { handleRoleBasicUpdate } from '../../services/api';

interface IProps {
  actionRef?: ActionType;
  visible: boolean;
  setVisible: (e: boolean) => void;
  roleUpdateBasicInfo: Role.RoleBasicUpdate;
}

const UpdateRoleForm: React.FC<IProps> = ({
  actionRef,
  visible,
  setVisible,
  roleUpdateBasicInfo,
}: IProps) => {
  return (
    <ModalForm<Role.RoleBasicUpdate>
      title={'编辑角色'}
      open={visible}
      width="400px"
      submitter={{
        searchConfig: {
          submitText: '更新',
        },
      }}
      initialValues={roleUpdateBasicInfo}
      onFinish={async (values: Role.RoleBasicUpdate) => {
        const success = await handleRoleBasicUpdate(values);
        if (success) {
          // 关闭弹窗
          setVisible(false);
          // 刷新列表
          if (actionRef) {
            actionRef.reload();
          }
        }
      }}
      modalProps={{
        destroyOnClose: true, // 点击蒙层关闭弹窗
        mask: true, // 关闭时销毁 Modal 元素
        onCancel: () => {
          setVisible(false);
        },
      }}
    >
      <ProFormText name={'id'} label={'角色ID'} hidden={true} readonly />

      <ProFormText
        name={'role_name'}
        label={'角色名'}
        rules={[
          {
            required: true,
            message: '请输入角色名!',
          },
          {
            max: 15,
            message: '角色名1-15个字符!',
          },
        ]}
      />

      <ProFormTextArea
        label="角色描述"
        name="role_desc"
        fieldProps={{ maxLength: 255, showCount: true }}
        rules={[{ max: 255, message: '备注长度输入255个字符以内' }]}
      />
    </ModalForm>
  );
};

export default memo(UpdateRoleForm);
