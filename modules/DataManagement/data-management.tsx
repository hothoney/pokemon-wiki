import React, { useCallback, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { type ProColumns } from "@ant-design/pro-components";
import { Button, FormInstance, Modal as AntdModal, ModalProps } from "antd";

const ProTable = dynamic(
  () => import("@ant-design/pro-components").then((mod) => mod.ProTable),
  { ssr: false, loading: () => <span>Loading...</span> }
);

const demoColumn: ProColumns<Record<string, any>, unknown>[] = [
  {
    key: "name",
    dataIndex: "name",
    title: "名称",
  },
  {
    key: "types",
    dataIndex: "types",
    title: "属性",
  },
];

const Modal: React.FC<{
  children: React.ReactNode;
  trigger?: JSX.Element;
  title?: React.ReactNode;
  modalProps?: Omit<ModalProps, "open">;
}> = ({ children, trigger, ...props }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const triggerDom = useMemo(() => {
    if (!trigger) {
      return null;
    }

    return React.cloneElement(trigger, {
      key: "trigger",
      ...trigger.props,
      onClick: async (e: any) => {
        openModal();
        trigger.props?.onClick?.(e);
      },
    });
  }, [trigger, isModalOpen]);

  return (
    <>
      <>{triggerDom}</>
      <AntdModal
        onCancel={closeModal}
        title={props.title}
        {...props.modalProps}
        open={isModalOpen}
      >
        {children}
      </AntdModal>
    </>
  );
};

const DataManagement = () => {
  const CreateData = () => {
    const formRef = useRef<FormInstance>();
    return (
      <Modal
        title="新建"
        trigger={<Button type="primary">+ 新建</Button>}
        modalProps={{
          onOk() {
            formRef.current?.submit();
          },
          okButtonProps: {
            loading: true,
          },
        }}
      >
        <ProTable
          formRef={formRef}
          columns={demoColumn}
          type="form"
          form={{
            submitter: {
              render: false,
            },
          }}
        />
      </Modal>
    );
  };
  return (
    <>
      <ProTable columns={demoColumn} toolBarRender={() => [<CreateData />]} />
    </>
  );
};

export default DataManagement;
