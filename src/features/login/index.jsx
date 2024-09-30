import classNames from "classnames/bind";
import styles from "./index.module.scss";
import { Card, Form, Input, Button, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import authApi from "api/auth";
import { Navigate, useNavigate } from 'react-router-dom';
import { isUserLoggedIn, setToken, setUser } from "utils";
import { setHeader } from "api/axiosService";
import { TOKEN } from "constants/index";

const cx = classNames.bind(styles);

export default function LoginPage() {
	const navigate = useNavigate();
	const [api, contextHolder] = notification.useNotification();
	const [form] = Form.useForm();

	const openNotificationWithIcon = (type, message, description) => {
		api[type]({ message, description });
	};

	const onFinish = async (values) => {
		try {
			// await authApi.login(values);
			openNotificationWithIcon('success', 'Thông báo', 'Đăng nhập thành công')
			setUser(values)
			setToken(TOKEN)
			setHeader('Authorization', TOKEN)
			navigate('/admin')
		} catch (error) {
			openNotificationWithIcon('error',"Lỗi", "Sai tên đăng nhập hoặc mật khẩu")
		}
	};

	if (isUserLoggedIn()) {
		return <Navigate to="/admin" />;
	}

	return (
		<div className={cx("page-login")}>
			{contextHolder}
			<Card className={cx("login-card")} style={{ width: 500 }}>
				<p className={cx("title")}>Đăng nhập</p>
				<Form form={form} onFinish={onFinish}>
					<Form.Item
						name="user_name"
						rules={[
							{
								required: true,
							},
						]}
					>
						<Input
							prefix={<UserOutlined className="site-form-item-icon" />}
							placeholder="Tên đăng nhập"
							size="large"
						/>
					</Form.Item>
					<Form.Item
						name="password"
						rules={[
							{
								required: true,
							},
						]}
					>
						<Input.Password
							prefix={<LockOutlined className="site-form-item-icon" />}
							placeholder="Mật khẩu"
							size="large"
						/>
					</Form.Item>
					<Button type="primary" htmlType="submit" className={cx("login-form-button")} size="large">
						Đăng nhập
					</Button>
				</Form>
			</Card>
		</div>
	);
}
