import { memo, useState } from 'react';
import { ModalForm, ProFormCheckbox } from '@ant-design/pro-components';

import { handleUserRoles } from '../../services/api';

interface IProps {
  visible: boolean;
  setvisible: (e: boolean) => void;
  UserData: User.UserItem;
}

export default memo(({ visible, setvisible, UserData }: IProps) => {
  const [submit, setsubmit] = useState(true);

  return (
    <>
      {UserData && (
        <ModalForm
          title={'角色分配'}
          open={visible}
          width="400px"
          submitter={{
            searchConfig: { submitText: '设置' },
            submitButtonProps: { disabled: submit },
          }}
          onFinish={updateUserRole}
          modalProps={{
            destroyOnClose: true,
            mask: true,
            onCancel: () => setvisible(false),
          }}
        >
          <ProFormCheckbox.Group name={'roles'} layout={'vertical'} request={async () => {}} />
        </ModalForm>
      )}
    </>
  );
});
