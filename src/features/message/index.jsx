import style from './index.module.scss';
import classNames from 'classnames/bind';
import logo from 'assets/images/text-logo.png';
import numberCoupon from 'assets/images/number-coupon.png';
import coc from 'assets/images/coc.png';
import whiteStar from 'assets/images/white-star.png';
import smWing from 'assets/images/sm-wing.png';
import cupid from 'assets/images/cupid.png';
import mua1tang1 from 'assets/images/1tang1.png';
import fiftyPercent from 'assets/images/50percent.png';
import mua2tang1 from 'assets/images/2tang1.png';
import {
    DownCircleTwoTone,
  } from '@ant-design/icons';
import { Button, Image, Space } from 'antd';
import { conditions, messages } from 'constants/index';
import moment from 'moment';

const cx = classNames.bind(style);
const cardImages = [cupid, mua1tang1, fiftyPercent, mua2tang1];
export default function Message({ card, coupon }) {
    const scrollToEndPageSmooth = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }

    const renderTitle = () => {
        switch (card) {
            case 1:
                return 'CHĂM CHỈ';
            case 2:
                return 'TÌNH YÊU';
            case 3:
                return 'SA NGÃ';
            default:
                return 'CHĂM CHỈ';
        }
    }

    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <div className={cx('flex-center')}>
                    <Image preview={false} src={logo} alt='logo' width={103} />
                </div>
                <div className={cx('footer')}>
                    <Image preview={false} src={whiteStar} alt='whiteStar' width={32} />
                    <Image preview={false} src={smWing} alt='smWing' width={130} />
                    <span>THÔNG ĐIỆP</span>
                    <h1>THIÊN THẦN {renderTitle(card)}</h1>
                    <h5>dành cho bạn</h5>
                    <div className={cx('divider')} />
                </div>
                <p className={cx('message')}>
                    {messages[card][Math.floor(Math.random() * messages[card].length)]}
                </p>
                <div className={cx('go-down')} onClick={scrollToEndPageSmooth}>
                    <Button size='large' icon={<DownCircleTwoTone style={{ fontSize: '24px' }} twoToneColor='#FFBA49'/>}>NHẤN VÀO ĐÂY - NHẬN VOUCHER</Button>
                </div>
                <Image preview={false} src={coc} alt='coc' maxWidth={430} />
               
                <div className={cx('header')}>
                    <Image
                        preview={false}
                        src={cardImages[card == 3 && coupon.programCode == '215334' ? 3 : card - 1]}
                        alt='cupid'
                        width={341}
                    />
                </div>
                <div className={cx('coupon-wrapper')}>
                    <span>MÃ COUPON</span>
                    <div>{coupon?.code}</div>
                </div>
                <div className={cx('coupon-wrapper')} style={{ marginTop: '10px' }}>
                    <span>HẠN SỬ DỤNG</span>
                    <div>{moment(coupon.startAt).format('D/MM')} - {moment(coupon.endAt).format('D/MM/YYYY')}</div>
                </div>
                <div className={cx('numb-coupon')}>
                    <Image preview={false} src={numberCoupon} alt='numberCoupon' width={262} />
                </div>
                <div className={cx('cond-wrapper')}>
                    <span className={cx('cond-title')}>Điều kiện áp dụng:</span>
                    <span className={cx('cond-desc')}>{conditions[coupon.programCode == '215334' ? 4 : card]}</span>
                    <span className={cx('cond-title')}>* Vui lòng chụp lại màn hình và xuất trình Voucher cho NVBH để áp dụng ưu đãi</span>
                </div>
            </div>
        </div>
    )
}