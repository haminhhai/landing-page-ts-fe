import React from 'react';
import { Layout } from 'antd';
import style from './index.module.scss'
import classNames from 'classnames/bind';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;
const cx = classNames.bind(style);
export default function AdminLayout() {
    return (
        <Layout className={cx('layout')} >
            <Content className={cx('admin-content')}>
                <Outlet />
            </Content>
        </Layout>
    );
}