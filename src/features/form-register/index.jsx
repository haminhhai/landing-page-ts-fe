import style from './index.module.scss';
import classNames from 'classnames/bind';
import star from 'assets/images/star.png'
import mustache from 'assets/images/mustache.png'
import { Button, Form, Image, Modal, Radio, Space } from 'antd';
import { listFrequency, listStoreAddress } from 'constants/index';
import couponApi from 'api/coupon';
import { useState } from 'react';

const cx = classNames.bind(style);
export default function FormRegister({ onClose, open }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (values) => {
        try {
            setLoading(true);
            await couponApi.collectData(values);
            onClose();
        } catch (error) {
            console.log("🚀 ~ error:", error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal
            open={open}
            footer={null}
            closable={false}
            centered
            style={{ width: '400px' }}
            className={cx('modal')}
        >
            <div className={cx('container')}>
                <div className={cx('wrapper')}>
                    <div className={cx('header')}>
                        <Image preview={false} src={star} alt='star' width={30} />
                        <span>Nơi</span>
                        <span style={{ color: '#FFAD05' }}>Mua Hàng</span>
                    </div>

                    <Form onFinish={onSubmit} className={cx('form-signup')} form={form} layout='vertical'>
                        <Form.Item name='addressStore' rules={[{ required: true }]}>
                            <Radio.Group>
                                <Space direction='vertical'>
                                    {
                                        listStoreAddress.map((item, index) => (
                                            <Radio key={index} value={item.value}>{item.label}</Radio>
                                        ))
                                    }
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                        <div className={cx('footer')}>
                            <Image preview={false} src={star} alt='star' width={25} />
                            <span>Tần suất sử dụng</span>
                            <span style={{ color: '#FFAD05' }}>Mr Good Tea</span>
                        </div>
                        <Form.Item name='frequency' rules={[{ required: true }]}>
                            <Radio.Group>
                                <Space direction='vertical'>
                                    {
                                        listFrequency.map((item, index) => (
                                            <Radio key={index} value={item.value}>{item.label}</Radio>
                                        ))
                                    }
                                </Space>
                            </Radio.Group>
                        </Form.Item>

                        <span className={cx('antherAnswer')}>*Câu trả lời khác</span>
                        <div className={cx('quote')}>
                            <span>A morning coffee can chat illuminate many cool ideas for your brands. Are you up for one?</span>
                            <Image preview={false} src={mustache} alt='mustache' width={57} />
                        </div>

                        <Form.Item className={cx("btn-signup")}>
                            <Button type="primary" htmlType="submit" size="large" loading={loading}>
                                DONE !
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}