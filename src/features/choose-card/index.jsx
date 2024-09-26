import style from './index.module.scss';
import classNames from 'classnames/bind';
import logo from 'assets/images/text-logo.png';
import bgHeader from 'assets/images/bg-header.png';
import divider from 'assets/images/divider.png';
import card1 from 'assets/images/card1.png';
import card2 from 'assets/images/card2.png';
import card3 from 'assets/images/card3.png';
import square from 'assets/images/square.png';
import mImg from 'assets/images/m.png';
import omega from 'assets/images/omega.png';
import khampha from 'assets/images/khampha.png';
import { Image, Space } from 'antd';

const cx = classNames.bind(style);
const listImage = [card1, card2, card3];
export default function ChooseCard() {
    return (
        <div className= {cx('container')}>
            <div className={cx('wrapper')}>
                <div className = {cx('header')}>
                    <div className={cx('logo-section')}>
                        <Image preview={false} src={logo} alt='logo' width={78} />
                        <Space>
                            <div className={cx('tag')}>2024</div>
                            <div className={cx('tag')}>playfull</div>
                        </Space>
                    </div>
                    <p className={cx('title')}>{'THÔNG ĐIỆP\nTHIÊN THẦN\nDÀNH CHO BẠN'}</p>
                    <Image preview={false} src={bgHeader} alt='logo' width={372} />
                </div>
                <Image preview={false} src={divider} alt='logo' width="100%" />
                <div className={cx('content')}>
                    <Image preview={false} src={square} alt='square' width={68} />
                    <Image preview={false} src={khampha} alt='khampha' width={95} />
                    <Image preview={false} src={mImg} alt='m' width={63} />
                    <Image preview={false} src={omega} alt='omega' width={66} />
                    <div className={cx('image-wrapper')}>
                        {
                            listImage.map((item, index) => (
                                <Image key={index} preview={false} src={item} alt='card' width={120} />
                            ))
                        }
                    </div>
                </div>
                <div className={cx('footer')} />
            </div>
        </div>
    )
}