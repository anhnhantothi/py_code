import { useToast } from '../contexts/ToastContext';

export const useCheckChatLimit = () => {
  const toast = useToast();

  const checkLimit = async (): Promise<boolean> => {
    const token = localStorage.getItem('token');

    if (!token || token.split('.').length !== 3) {
      toast.showError('Token không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại.');
      return false;
    }

    try {
      const res = await fetch('http://localhost:5000/api/check-chat-limit', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok || !data.allow) {
        if (data.require_vip) {
          toast.showWarn('Bạn đã dùng hết 7 lượt miễn phí. Hãy nâng cấp VIP để tiếp tục sử dụng AI.');
        } else {
          toast.showError(data.error || 'Có lỗi khi kiểm tra lượt sử dụng.');
        }
        return false;
      }

      return true;
    } catch (err) {
      toast.showError('Lỗi kết nối server khi kiểm tra lượt sử dụng.');
      return false;
    }
  };

  return { checkLimit };
};
