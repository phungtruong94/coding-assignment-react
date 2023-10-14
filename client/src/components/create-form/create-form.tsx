import { Button, Form, Input, message } from 'antd';

import styles from './create-form.module.css'
import { memo, useState } from 'react';
import clsx from 'clsx';
import ticketServices from 'client/src/services/ticket';
import { CreateDataType } from 'client/src/types';

export interface ICreateForm {
  className?: string,
  onCreateSuccess: Function
}

const CreateForm = (props: ICreateForm) => {
  const { className, onCreateSuccess } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)

  const onFinish = async () => {
    setLoading(true)
    try {
      const data = form.getFieldsValue() as CreateDataType;
      const resp = await ticketServices.create(data);
      if (!resp.error) {
        onCreateSuccess()
        message.success('Create success!');
        form.resetFields();
      } else {
        message.error(resp.statusText);
      }
    } catch (error) {
      message.error("Unknown Error")
    } finally {
      setLoading(false)
    }
  };

  return (
    <Form
      form={form}
      layout="inline"
      onFinish={onFinish}
      autoComplete="off"
      className={clsx(styles['form'], className && className)}
      size='middle'
    >
      <Form.Item
        name="description"
        rules={[{ required: true }]}
        className={styles['input']}
      >
        <Input placeholder="Types description to create ticket" />
      </Form.Item>
      <Form.Item className={styles['button']}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default memo(CreateForm);