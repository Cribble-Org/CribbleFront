import { Toaster } from 'react-hot-toast';

const Toast = () => {
  return (
    <Toaster
      toastOptions={{
        style: { borderRadius: 4 },
      }}
    />
  );
};

export default Toast;
