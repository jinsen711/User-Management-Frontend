import { memo } from 'react';
import {
  ActionType,
  ModalForm,
  ProFormText,
  ProFormSwitch,
  ProFormTextArea,
} from '@ant-design/pro-components';

import { handleCreateRole } from '../../services/api';

interface IProps {
  actionRef?: ActionType;
  visible: boolean;
  setVisible: (e: boolean) => void;
}

const CreateRoleForm: React.FC<IProps> = ({ actionRef, visible, setVisible }) => {
  return (
    <ModalForm
      title={'创建新角色'}
      width="600px"
      submitter={{
        searchConfig: {
          submitText: '创建',
        },
      }}
      open={visible}
      onOpenChange={setVisible}
      onFinish={async (values: Role.RoleCreate) => {
        const success = await handleCreateRole(values as Role.RoleCreate);
        if (success) {
          setVisible(false); // 关闭弹窗
          // 刷新列表
          if (actionRef) {
            actionRef.reload();
          }
        }
      }}
      modalProps={{
        maskClosable: true, // 点击蒙层关闭弹窗
        destroyOnClose: true, // 关闭时销毁 Modal 元素
        onCancel: () => {
          setVisible(false);
        },
      }}
    >
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
      <ProFormSwitch
        label={'用户状态'}
        name={'role_status'}
        tooltip={'默认禁用'}
        initialValue={false}
      />
    </ModalForm>
  );
};

// 使用 memo 优化性能, 并导出
export default memo(CreateRoleForm);
