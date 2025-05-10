import React from 'react';
import { Modal, Spin } from 'antd';

interface CertificatePreviewModalProps {
  visible: boolean;
  pdfUrl: string;
  onCancel: () => void;
}

const CertificatePreviewModal: React.FC<CertificatePreviewModalProps> = ({
  visible,
  pdfUrl,
  onCancel,
}) => {
  return (
    <Modal
      title="Certificate Preview"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width="80vw"
      style={{ top: 20 }}
      styles={{body: { height: '80vh', padding: 0 }}}
      destroyOnClose
    >
      {pdfUrl ? (
        <iframe
          src={pdfUrl}
          title="Certificate"
          width="100%"
          height="100%"
          style={{ border: 0 }}
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <Spin tip="Loading document..." />
        </div>
      )}
    </Modal>
  );
};

export default CertificatePreviewModal;
