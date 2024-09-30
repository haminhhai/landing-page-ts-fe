import { Button, Col, Form, Input, Row, Select, Tooltip } from "antd";
import { SearchOutlined } from '@ant-design/icons';

const FormFilter = ({ form, submit, loading }) => {

  return (
    <>
      <Form layout="vertical" form={form} onFinish={submit}>
        <Row gutter={16}>
          <Col span={4}>
            <Form.Item
              name="isTook"
              label="Trạng thái"
            >
              <Select
                allowClear
                options={[
                  { label: "Chưa sử dụng", value: "0" },
                  { label: "Đã sử dụng", value: "1" },
                ]}
              />
          </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={2}>
              <Form.Item>
                <Tooltip title="Tìm kiếm">
                  <Button loading={loading} style={{ width: "100%" }} htmlType="submit" type="primary">
                    <SearchOutlined />
                  </Button>
                </Tooltip>
              </Form.Item>
            </Col>
        </Row>
      </Form>
    </>
  );
};

export default FormFilter;
