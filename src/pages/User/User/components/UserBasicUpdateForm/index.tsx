import { ActionType, DrawerForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Form } from 'antd';
import { memo } from 'react';

import { handleUserBasicUpdate } from '../../services/api';

interface IProps {
  actionRef?: ActionType;
  visible: boolean;
  setVisible: (e: boolean) => void;
  userUpdateBasicInfo: User.UserBasicUpdate;
}

const UpdateUserForm: React.FC<IProps> = ({
  actionRef,
  visible,
  setVisible,
  userUpdateBasicInfo,
}: IProps) => {
  const [form] = Form.useForm<User.UserBasicUpdate>();

  return (
    <DrawerForm<User.UserBasicUpdate>
      title={'编辑用户'}
      open={visible}
      width="400px"
      submitter={{
        searchConfig: {
          submitText: '更新',
        },
      }}
      form={form}
      initialValues={userUpdateBasicInfo}
      onFinish={async (values: User.UserBasicUpdate) => {
        const success = await handleUserBasicUpdate(values);
        if (success) {
          // 关闭弹窗
          setVisible(false);
          // 刷新列表
          if (actionRef) {
            actionRef.reload();
          }
        }
      }}
      drawerProps={{
        destroyOnClose: true, // 点击蒙层关闭弹窗
        mask: true, // 关闭时销毁 Modal 元素
        onClose: () => {
          setVisible(false);
        },
      }}
    >
      <ProFormText name={'id'} label={'用户ID'} hidden={true} readonly />

      <ProFormText
        name={'username'}
        label={'用户名'}
        placeholder={'用户名3-10个字符'}
        rules={[
          {
            required: true,
            message: '请输入用户名!',
          },
          {
            min: 3,
            message: '用户名3-10个字符!',
          },
          {
            max: 10,
            message: '用户名3-10个字符!',
          },
        ]}
      />

      <ProFormText
        name="user_phone"
        placeholder="手机号"
        label={'手机号'}
        rules={[{ pattern: /^1[3456789][0-9]{9}$/, message: '请输入手机号' }]}
      />

      <ProFormText
        name="user_email"
        placeholder="邮箱"
        label={'邮箱'}
        rules={[
          { pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '请输入邮箱' },
        ]}
      />

      <ProFormTextArea
        label="备注"
        name="remarks"
        fieldProps={{ maxLength: 30, showCount: true }}
        rules={[{ max: 30, message: '备注长度输入30个字符以内' }]}
      />
    </DrawerForm>
  );
};

export default memo(UpdateUserForm);
