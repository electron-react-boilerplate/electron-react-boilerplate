export interface ConfirmActionProps {
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variation?: 'standard' | 'danger';
}
