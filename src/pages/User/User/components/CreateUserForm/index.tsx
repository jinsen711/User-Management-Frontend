import {
  ActionType,
  ModalForm,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { memo } from 'react';

import { handleUserCreate } from '../../services/api';

interface IProps {
  actionRef?: ActionType;
  visible: boolean;
  setVisible: (e: boolean) => void;
}

const CreateUserForm: React.FC<IProps> = ({ actionRef, visible, setVisible }) => {
  return (
    <ModalForm
      title={'创建新用户'}
      width="600px"
      submitter={{
        searchConfig: {
          submitText: '创建',
        },
      }}
      open={visible}
      onOpenChange={setVisible}
      onFinish={async (values) => {
        const success = await handleUserCreate(values as User.UserCreate);
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
      }}
    >
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
      <ProFormText.Password
        name={'password'}
        label={'密码'}
        placeholder={'密码长度6-12位'}
        rules={[
          {
            required: true,
            message: '请输入密码！',
          },
          {
            min: 6,
            message: '密码长度6-12位',
          },
          {
            max: 12,
            message: '密码长度6-12位',
          },
        ]}
      />

      <ProFormText
        name="user_phone"
        placeholder="手机号"
        label={'手机号'}
        rules={[{ pattern: /^1[3456789][0-9]{9}$/, message: '请输入手机号' }]}
      />

      {/* TODO 在邮箱中输入后清除, 表达中会出现 user_email: "" 字样, 与后端不符, 会导致 pydantic 验证失败 */}
      <ProFormText
        name="user_email"
        placeholder="邮箱"
        label={'邮箱'}
        rules={[
          { pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '请输入邮箱' },
        ]}
      />

      <ProFormSwitch
        label={'用户状态'}
        tooltip={'默认禁用'}
        name={'user_status'}
        initialValue={false}
      />

      <ProFormTextArea
        label="备注"
        name="remarks"
        fieldProps={{ maxLength: 30, showCount: true }}
        rules={[{ max: 30, message: '备注长度输入30个字符以内' }]}
      />
    </ModalForm>
  );
};

// 使用 memo 优化性能, 并导出
export default memo(CreateUserForm);
