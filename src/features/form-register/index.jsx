import style from './index.module.scss';
import classNames from 'classnames/bind';
import star from 'assets/images/star.png'
import mustache from 'assets/images/mustache.png'
import { Form, Image, Radio, Space } from 'antd';
import { listFrequency, listStoreAddress } from 'constants/index';

const cx = classNames.bind(style);
export default function FormRegister() {
    const [form] = Form.useForm();
    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <Image preview={false} src={star} alt='star' width={30} />
                    <span>Nơi</span>
                    <span style={{ color: '#FFAD05' }}>Mua Hàng</span>
                </div>

                <Form className={cx('form-signup')} form={form} layout='vertical'>
                    <Form.Item name='store_address'>
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
                    <Form.Item name='frequency'>
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

                    <Form.Item>
                        <button className={cx('btn-signup')}>Đăng ký</button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}