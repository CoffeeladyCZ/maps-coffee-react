import { FC, useEffect, useRef } from "react";
import { Alert, Snackbar } from '@mui/material';

type PositionProps = {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
};

type AlertProps = {
  message: string;
  severity: 'success' | 'warning' | 'error' | 'info';
  open: boolean;
  position?: PositionProps;
  onCloseAlert: (shouldClose: boolean) => void;
}

const SimpleAlert: FC<AlertProps> = ({ message, severity, open, position, onCloseAlert }) => {
  const durationRef = useRef<number | null>(6000);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    onCloseAlert(false);
  };

  useEffect(() => {
    if (severity === 'error') {
      durationRef.current = null;
      return;
    }
    durationRef.current = 6000;
  }, [severity])

  return (
    <Snackbar
      open={open}
      autoHideDuration={durationRef.current}
      anchorOrigin={position || { vertical: 'bottom', horizontal: 'left' }}
      onClose={handleClose}
    >
      <Alert
        severity={severity}
        variant="filled"
        sx={{ width: '100%' }}
        onClose={handleClose}
      >
        { message}
      </Alert>
    </Snackbar>
  );
};

export default SimpleAlert;
