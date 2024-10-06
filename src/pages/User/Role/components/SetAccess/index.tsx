import { memo, useState, useRef } from 'react';
import { ActionType } from '@ant-design/pro-components';
import { ModalForm, ProFormCheckbox, FormInstance } from '@ant-design/pro-components';

import { handleGetRoleAccess, handleSetRoleAccess } from '../../services/api';

interface IProps {
  visible: boolean;
  setVisible: (e: boolean) => void;
  getRoleAccessInfo: Role.GetRoleAccess;
}

const SetRole: React.FC<IProps> = ({ visible, setVisible, getRoleAccessInfo }) => {
  const formRef = useRef<FormInstance>();
  const [submit, setsubmit] = useState(true);

  return (
    <ModalForm
      title={'权限分配'}
      open={visible}
      width="400px"
      submitter={{
        searchConfig: { submitText: '设置' },
        submitButtonProps: { disabled: submit },
      }}
      formRef={formRef}
      onFinish={async (values) => {
        console.log(values);
        const success = await handleSetRoleAccess({
          ...getRoleAccessInfo,
          access_id: values.access,
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
        name={'access'}
        layout={'vertical'}
        request={async () => {
          const result = await handleGetRoleAccess(getRoleAccessInfo);
          console.log(result);
          // 判断 result 是否存在
          if (Object.keys(result).length) {
            formRef.current?.setFieldsValue({ access: result.data.role_access });
            if (result.data.all_access.length) {
              setsubmit(false);
            }
            return result.data.all_access;
          }
          return [];
        }}
      />
    </ModalForm>
  );
};

export default memo(SetRole);
