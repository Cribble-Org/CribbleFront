import toast from 'react-hot-toast';

const handleAppEvents = (message: string, type: 'error' | 'success') => {
  const toastFunc = {
    error: toast.error,
    success: toast.success,
  }[type];

  toast.dismiss();
  if (toastFunc) {
    toastFunc(message);
  }
};

export default handleAppEvents;
