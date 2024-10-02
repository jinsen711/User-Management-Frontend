import React from 'react';
import { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Table, Row, Col, Card, Button, Space, Pagination } from 'antd';
import styles from './index.less';

const index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  // 获取用户列表

  // 搜索
  const searchLayout = () => {
    return <div>searchLayout</div>;
  };
  // 工具栏
  const berforeTableLayout = () => {
    return (
      <div>
        <Row>
          <Col xs={24} sm={12}>
            ...
          </Col>
          <Col xs={24} sm={12} className={styles.tableToolbar}>
            {/* Space 组件可以让元素之间有一定间距 */}
            <Space>
              <Button type="primary">Add</Button>
              <Button type="primary">Edit</Button>
            </Space>
          </Col>
        </Row>
      </div>
    );
  };
  // 换页
  const afterTableLayout = () => {
    return (
      <div>
        <Row>
          <Col xs={24} sm={12}>
            ...
          </Col>
          <Col xs={24} sm={12} className={styles.tableToolbar}>
            {/* 换页 */}
            <Pagination align="end" />
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <PageContainer>
      {searchLayout()}
      {/* card 卡片, 改变底色 */}
      <Card>
        {berforeTableLayout()}
        <Table dataSource={dataSource} columns={columns} pagination={false} />
        {afterTableLayout()}
      </Card>
    </PageContainer>
  );
};

export default index;
