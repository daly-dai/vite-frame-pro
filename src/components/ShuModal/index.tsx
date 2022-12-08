import React, {
  Children,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState
} from 'react';
import { Button, Modal } from 'antd';
import './index.less';
import { findIndex, isArray, isObject } from 'lodash-es';

interface Props {
  /**
   * 垂直居中展示 Modal
   */
  centered?: boolean;
  /**
   * 确认文案
   */
  okText?: string;
  /**
   * 取消文案
   */
  cancelText?: string;
  /**
   * 点击确定回调
   */
  onOk?: (e: React.MouseEvent<HTMLElement>) => void;
  /**
   * 点击取消回调
   */
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void;

  children?: React.ReactNode;
  trigger?: React.ReactNode;
  triggerText?: string;
  // ref?: any;
}

/**
 * Modal 组件
 * @link [antd modal](https://ant.design/components/modal-cn/)
 */
const BaseModal = forwardRef((props: Props, ref: any) => {
  const { centered, onOk, okText, cancelText, children, trigger, triggerText } =
    props;

  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      showModal: () => {
        setVisible(true);
      },
      closeModal: () => {
        setVisible(false);
      }
    };
  });

  const showModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <>
      {trigger ? trigger : <Button onClick={showModal}>{triggerText}</Button>}
      <Modal
        // {...props}
        className="base-modal"
        open={visible}
        okText={okText}
        cancelText={cancelText}
        centered={centered}
        onOk={onOk}
        onCancel={closeModal}
      >
        {children}
      </Modal>
    </>
  );
});

export default BaseModal;
