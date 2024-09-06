import React from 'react';
import { Modal as BaseModal } from '@mui/base';
import { Box, Typography, Stack } from '@mui/material';
import { Button } from './Button';

interface ModalProps {
  title?: string;
  description?: string;
  currentStep?: number;
  totalSteps?: number;
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit: () => void;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel?: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  actionLabelvariant?: 'default' | 'destructive' | 'outline';
}

const Modal: React.FC<ModalProps> = ({
  title,
  description,
  currentStep,
  totalSteps,
  isOpen = false,
  onClose,
  onSubmit,
  body,
  footer,
  actionLabel = 'Submit',
  disabled = false,
  secondaryAction,
  secondaryActionLabel,
  actionLabelvariant="default",
}) => {
  return (
    <BaseModal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className={`fixed inset-0 z-[999] flex items-center justify-center ${isOpen ? "modal-open" : ""}`}
    >
        <>
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[999]" onClick={onClose} />
        
       
      <Box
        className="bg-white rounded-lg shadow-none p-6 max-w-lg w-full z-[9999]"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 0,
          p: 4,
          width: '90%',
          maxWidth: 500,
        }}
      >
        {title && (
          <Typography style={{ fontWeight: 'bold' }} id="modal-title" variant="h6" component="h2" gutterBottom>
            {title}
          </Typography>
        )}
        {description && (
          <Typography style={{ fontWeight: 'semibold' }} id="modal-description" variant="body2" gutterBottom>
            {description}
          </Typography>
        )}
        
        {body}

        {footer || (
          <Stack direction="row" justifyContent="flex-end" spacing={2} mt={3}>
            {secondaryAction && (
              <Button 
                onClick={secondaryAction}
                variant='outline'
                disabled={disabled}
            >
                {secondaryActionLabel}
              </Button>
            )}
            <Button variant={actionLabelvariant} onClick={onSubmit} disabled={disabled}>
              {actionLabel}
            </Button>
          </Stack>
        )}
      </Box>
       </>
    </BaseModal>
  );
};

export default Modal;