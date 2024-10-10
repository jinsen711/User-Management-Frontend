import { FormInstance, ModalForm, ProFormCheckbox } from '@ant-design/pro-components';
import { memo, useRef, useState } from 'react';

import { handleGetUserRole, handleSetUserRoles } from '../../services/api';

interface IProps {
  visible: boolean;
  setVisible: (e: boolean) => void;
  getUserRolesInfo: User.GetUserRole;
}

const SetRole: React.FC<IProps> = ({ visible, setVisible, getUserRolesInfo }) => {
  const formRef = useRef<FormInstance>();
  const [submit, setsubmit] = useState(true);

  return (
    <ModalForm
      title={'角色分配'}
      open={visible}
      width="400px"
      submitter={{
        searchConfig: { submitText: '设置' },
        submitButtonProps: { disabled: submit },
      }}
      formRef={formRef}
      onFinish={async (values) => {
        const success = await handleSetUserRoles({
          ...getUserRolesInfo,
          roles_id: values.roles,
        });
        if (success) {
          // 关闭弹窗
          setVisible(false);
        }
      }}
      modalProps={{
        destroyOnClose: true, // 关闭时销毁表单
        mask: true, // 点击蒙层时关闭
        onCancel: () => setVisible(false),
      }}
    >
      <ProFormCheckbox.Group
        name={'roles'}
        layout={'vertical'}
        request={async () => {
          const result = await handleGetUserRole(getUserRolesInfo);
          // 判断 result 是否存在
          if (Object.keys(result).length) {
            formRef.current?.setFieldsValue({ roles: result.data.user_roles });
            if (result.data.all_roles.length) {
              setsubmit(false);
            }
            return result.data.all_roles;
          }
          return [];
        }}
      />
    </ModalForm>
  );
};

export default memo(SetRole);
