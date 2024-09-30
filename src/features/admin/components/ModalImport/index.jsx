import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Modal, Row, Space, Upload } from "antd";
import { normFile } from "utils/";

export default function ModalImport({ form, loading, onFinish, show, onCancel }) {
    return (
        <Modal
            open={show}
            onCancel={onCancel}
            title='Nhập liệu'
            footer=''
            width={800}
        >
            <Form form={form} onFinish={onFinish} layout='vertical'>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="upload"
                            rules={[{ required: true }]}
                            label="File excel"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                        >
                            <Upload
                                name="logo"
                                listType="picture"
                                accept=".xlsx"
                                maxCount={1}>
                                <Button icon={<UploadOutlined />}>Upload file</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Form.Item>
                        <Space>
                            <Button loading={loading} htmlType="submit" type='primary' size='large'>
                                Nhập liệu
                            </Button>
                            <Button loading={loading} size='large' onClick={onCancel}>
                                Huỷ
                            </Button>
                        </Space>
                    </Form.Item>
                </Row>
            </Form >
        </Modal >
    )
}