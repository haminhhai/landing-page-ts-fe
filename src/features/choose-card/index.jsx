import style from './index.module.scss';
import classNames from 'classnames/bind';
import logo from 'assets/images/text-logo.png';
import bgHeader from 'assets/images/bg-header.png';
import divider from 'assets/images/divider.png';
import { Image, Space } from 'antd';

const cx = classNames.bind(style);
export default function ChooseCard() {
    return (
        <div className= {cx('container')}>
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
            <Image preview={false} src={divider} alt='logo' height={13} />
        </div>
    )
}