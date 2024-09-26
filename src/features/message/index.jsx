import style from './index.module.scss';
import classNames from 'classnames/bind';
import logo from 'assets/images/text-logo.png';
import surprise from 'assets/images/surprise.png';
import wing from 'assets/images/wing.png';
import star from 'assets/images/star.png';
import numberCoupon from 'assets/images/number-coupon.png';
import coc from 'assets/images/coc.png';
import whiteStar from 'assets/images/white-star.png';
import smWing from 'assets/images/sm-wing.png';
import yellowSquare from 'assets/images/yellow-square.png';


import { Image, Space } from 'antd';
import { messages } from 'constants/index';

const cx = classNames.bind(style);
export default function Message() {
    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <div className={cx('flex-center')}>
                    <Image preview={false} src={logo} alt='logo' width={103} />
                </div>
                <div className={cx('header')}>
                    <Image preview={false} src={surprise} alt='surprise' width={24} />
                    <Image preview={false} src={star} alt='star' width={28} />
                    <Image preview={false} src={wing} alt='wing' width={150} />
                    <h3>TẶNG BẠN MÃ</h3>
                    <h1>FREE UPSIZE</h1>
                    <h5>cho đồ uống Cupic</h5>
                </div>
                <div className={cx('coupon-wrapper')}>
                    <span>MÃ COUPON</span>
                    <div>CUSTOM... </div>
                </div>
                <div className={cx('coupon-wrapper')} style={{ marginTop: '10px' }}>
                    <span>HẠN SỬ DỤNG</span>
                    <div>5/10 - 5/11/2024</div>
                </div>
                <div className={cx('numb-coupon')}>
                    <Image preview={false} src={numberCoupon} alt='numberCoupon' width={262} />
                </div>
                <Image preview={false} src={coc} alt='coc' maxWidth={430} />
                <div className={cx('footer')}>
                    <Image preview={false} src={whiteStar} alt='whiteStar' width={32} />
                    <Image preview={false} src={smWing} alt='smWing' width={130} />
                    <Image preview={false} src={yellowSquare} alt='yellowSquare' width={50} />
                    <span>THÔNG ĐIỆP</span>
                    <h1>THIÊN THẦN CHĂM CHỈ</h1>
                    <h5>dành cho bạn</h5>
                    <div className={cx('divider')} />
                </div>
                <p className={cx('message')}>
                    {messages[1][0]}
                </p>
            </div>
        </div>
    )
}