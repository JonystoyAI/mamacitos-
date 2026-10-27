import React from 'react';
import SecureEncryptedChatModal, { SecureEncryptedChatModalProps } from '../messaging/SecureEncryptedChatModal';

export interface DirectMessagingModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
  recipientAvatar?: string;
  recipientCode?: string;
  recipientRole?: string;
  recipientLocation?: string;
  recipientIsVerified?: boolean;
}

export const DirectMessagingModal: React.FC<DirectMessagingModalProps> = (props) => {
  return <SecureEncryptedChatModal {...props} />;
};

export default DirectMessagingModal;
