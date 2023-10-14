import { ReactNode } from 'react';
import Layout, { Header } from 'antd/es/layout/layout';

import styles from './custom-layout.module.css';
import Container from '../components/container/container';

export interface ILayout {
  children?: ReactNode
}

const CustomLayout = (props: ILayout) => {
  const { children } = props
  return (
    <Layout className={styles['root']}>
      <Container>
        <Header className={styles['header']}>
          <h1>Ticketing App</h1>
        </Header>
      </Container>
      {children}
    </Layout>
  );
};

export default CustomLayout;
