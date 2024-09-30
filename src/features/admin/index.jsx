import { Button, Space, Table, notification, Tooltip, Popconfirm, Form, Badge } from "antd";
import style from "./index.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import ModalCreated from "./components/ModalCreated";
import { PlusCircleOutlined, EditOutlined, FileExcelOutlined } from '@ant-design/icons';
import couponApi from "api/coupon";
import moment from "moment";
import { isUserLoggedIn } from "utils/index";
import { Navigate } from "react-router-dom";
import * as XLSX from 'xlsx';
import ModalImport from "./components/ModalImport";
import FormFilter from "./components/FormFilter";

const cx = classNames.bind(style);
const CHUNK_SIZE = 500; // Adjust the chunk size as needed

export default function AdminPage() {
  const [formSearch] = Form.useForm();
  const [formImport] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message, description) => {
    api[type]({ message, description });
  };

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataShop, setSelected] = useState();
  const [listCoupon, setListCoupon] = useState([]);
  const [openImport, setOpenImport] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const getCoupon = async (currentPage = pagination.current) => {
    try {
      setLoading(true)
      const res = await couponApi.getPaginate({
        currentPage,
        pageSize: pagination.pageSize,
        isTook: formSearch.getFieldValue("isTook"),
      });
      setListCoupon(res.data);
      setPagination({
        ...pagination,
        current: currentPage,
        total: res.total,
      });
    } catch (error) {
      console.log("🚀 ~ error:", error)
    } finally {
      setLoading(false)
    }
  }

  const onOpenImport = () => {
    setOpenImport(true)
  }

  const closeModalImport = () => {
    setOpenImport(false)
    formImport.resetFields()
  }

  const onConfirm = async (id) => {
    await couponApi.delete(id);
    openNotificationWithIcon("success", "Thông báo", "Xóa mã khuyến mãi thành công !")
    getCoupon();
  };

  const columns = [
    {
      title: 'Mã chương trình',
      dataIndex: "programCode",
      key: "programCode",
    },
    {
      title: 'Tên chương trình',
      dataIndex: "programName",
      key: "programName",
    },
    {
      title: 'Mã khuyến mại',
      dataIndex: "code",
      key: "code",
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: "startAt",
      key: "startAt",
      render: (_) => moment(_).format("YYYY/MM/DD HH:mm:ss")
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: "endAt",
      key: "endAt",
      render: (_) => moment(_).format("YYYY/MM/DD HH:mm:ss")
    },
    {
      title: 'Trạng thái',
      dataIndex: "status",
      key: "status",
      render: (_, record) => record.tookAt ? <Badge status="success" text="Đã sử dụng" /> : <Badge status="processing" text="Chưa sử dụng" />
    },
    {
      title: 'Ngày sử dụng',
      dataIndex: "tookAt",
      key: "tookAt",
      render: (_) => _ ? moment(_).format("YYYY/MM/DD HH:mm:ss") : ''
    },
    {
      title: 'Hành động',
      dataIndex: "action",
      key: "aciton",
      render: (text, row) => {
        return (
          <Space>
            {/* <Button
              onClick={() => {
                setOpenModal(true);
                setSelected(row);
              }}
            >
              <Tooltip title="Chỉnh sửa">
                <EditOutlined />
              </Tooltip>

            </Button> */}
            <Popconfirm
              title="Bạn chắc chắn muốn xóa mã khuyến mại?"
              description=""
              onConfirm={() => onConfirm(row._id)}
            >
              <Button danger>Xóa</Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  

  const splitArrayIntoChunks = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const onImport = async (values) => {
    try {
      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;
      reader.onload = async (e) => {
        /* Parse data */
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        if (Array.isArray(data) && data.length >= 4) {
          let payload = []
          let error = ''
          data.filter(item => item.length > 0 && item).forEach((item, idx) => {
            if (idx > 1) {
              const [
                programCode,
                programName,
                code,
                startAt,
                endAt,
              ] = item

              payload.push({
                programCode,
                programName,
                code,
                startAt: moment(startAt).format("YYYY/MM/DD HH:mm:ss"),
                endAt: moment(endAt).format("YYYY/MM/DD HH:mm:ss"),
              })
            }
          })
          if (!error) {
            try {
              setLoading(true)
              const chunks = splitArrayIntoChunks(payload, CHUNK_SIZE);
              await Promise.all(chunks.map(chunk => couponApi.create({ data: chunk })));
              openNotificationWithIcon("success", "Thông báo", "Nhập liệu thành công !")
              getCoupon()
              closeModalImport()
            } catch (error) {
              openNotificationWithIcon("error", "Lỗi", "Lỗi nhập liệu")
            } finally {
              setLoading(false)
            }
          } else {
            openNotificationWithIcon("error", "Lỗi", "Lỗi nhập liệu")
          }

        } else openNotificationWithIcon("error", "Lỗi", "Lỗi nhập liệu")

        /* Update state */
      };
      if (rABS) reader.readAsBinaryString(values.upload[0].originFileObj);
      else reader.readAsArrayBuffer(values.upload[0].originFileObj);
    } catch (error) {
      // toast.error(error?.response?.data || ERROR_OCCUR)
    } finally {
    }
  }

  useEffect(() => {
    getCoupon()
  }, []);

  if (!isUserLoggedIn()) {
    return <Navigate to="/login" />;
  }

  return (
    <div className={cx("page-shop")}>
      {contextHolder}
      <ModalImport loading={loading} show={openImport} onFinish={onImport} form={formImport} onCancel={closeModalImport} />
      <div className={cx("title")}>
        <p>Quản lý mã khuyến mãi</p>
        <Space>
          <Button onClick={() => setOpenModal(true)} size="large" icon={<PlusCircleOutlined />}>
            Thêm mới
          </Button>
          <Button type="primary" onClick={onOpenImport} size="large" icon={<FileExcelOutlined />}>
            Nhập liệu
          </Button>
        </Space>
      </div>
      <FormFilter
        form={formSearch}
        submit={(values) => {
          getCoupon(1);
        }}
        loading={loading}
      />
      <Table
        loading={loading}
        columns={columns}
        dataSource={listCoupon}
        bordered
        pagination={{
          onChange: (page) => {
            getCoupon(page);
          },
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: false,
          showTotal: (total) => `Tổng số ${total} mã khuyến mãi`,
          showQuickJumper: true,
        }}
      />
      <ModalCreated
        openNotificationWithIcon={openNotificationWithIcon}
        setOpenModal={setOpenModal}
        setSelected={setSelected}
        dataShop={dataShop}
        openModal={openModal}
        getCoupon={getCoupon}
      />
    </div>
  );
}
