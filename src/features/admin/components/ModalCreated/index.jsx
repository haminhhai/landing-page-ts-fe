import { Button, Col, Form, Input, Modal, Radio, Row, Select } from "antd";
import couponApi from "api/coupon";
import DatePicker from "components/Datepicker";
import moment from "moment";
import { useEffect } from "react";

export default function ModalCreated({
  openModal,
  setOpenModal,
  openNotificationWithIcon,
  setSelected,
  selected,
  getCoupon,
}) {
  const [form] = Form.useForm();

  const onSubmit = async (values) => {
    try {
      if (!selected) {
        const res = await couponApi.create({
          data: [{
            ...values,
            startAt: values.startAt.format('YYYY-MM-DD HH:mm:ss'),
            endAt: values.endAt.format('YYYY-MM-DD HH:mm:ss'),
          }]
        });
        if (res?.success) {
          onCancel();
          openNotificationWithIcon("success", 'Thông báo', 'Thêm mã khuyến mãi thành công !');
          getCoupon();
        }
      } else {
        const res = await couponApi.update({
          ...values,
          startAt: values.startAt.format('YYYY-MM-DD HH:mm:ss'),
          endAt: values.endAt.format('YYYY-MM-DD HH:mm:ss'),
          _id: selected._id
        });
        if (res?.success) {
          onCancel();
          openNotificationWithIcon("success", 'Thông báo', 'Cập nhật mã khuyến mãi thành công !');
          getCoupon();
        }
      }
    } catch (error) {
      openNotificationWithIcon("error", 'Lỗi', error?.response?.data?.message || 'Có lỗi xảy ra !');
    }
  };

  const onCancel = () => {
    setOpenModal(false);
    setSelected(null);
    form.resetFields();
  };

  useEffect(() => {
    if (selected) {
      form.setFieldsValue({
        programCode: selected.programCode,
        programName: selected.programName,
        code: selected.code,
        startAt: moment(selected.startAt),
        endAt: moment(selected.endAt),
      });
    }
  }, [selected, form]);

  return (
    <Modal
      title={!selected ? 'Thêm mới': 'Cập nhật'}
      centered
      open={openModal}
      footer={null}
      onCancel={onCancel}
      width={768}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          name="programCode"
          label="Mã chương trình"
          required
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="programName"
          label="Tên chương trình"
          required
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="code"
          label="Mã khuyến mãi"
          required
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="startAt"
          label="Ngày bắt đầu"
          required
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker placeholder=""/>
        </Form.Item>
        <Form.Item
          name="endAt"
          label="Ngày kết thúc"
          required
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker placeholder=""/>
        </Form.Item>
        <Row gutter={16}>
          <Col span={4} offset={8}>
            <Form.Item>
              <Button style={{ width: "100%" }} htmlType="submit">
                Ok
              </Button>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Button style={{ width: "100%" }} onClick={onCancel}>
              Huỷ
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
