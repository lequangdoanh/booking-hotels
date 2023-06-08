import React, { useState } from 'react';

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleExpiryDateChange = (event) => {
    setExpiryDate(event.target.value);
  };

  const handleCvvChange = (event) => {
    setCvv(event.target.value);
  };

  const handlePayment = () => {
    // Kiểm tra thông tin thanh toán hợp lệ trước khi gửi
    if (cardNumber.trim() === '' || expiryDate.trim() === '' || cvv.trim() === '') {
      console.log('Vui lòng điền đầy đủ thông tin thanh toán.');
      return;
    }

    // Gửi thông tin thanh toán đến máy chủ hoặc xử lý theo yêu cầu
    // Ví dụ: gọi API hoặc thực hiện các bước thanh toán
    console.log('Thông tin thanh toán:', cardNumber, expiryDate, cvv);

    // Xóa dữ liệu trong biểu mẫu sau khi hoàn thành
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
  };

  return (
    <div>
      <form>
        <label>
          Số thẻ:
          <input type="text" value={cardNumber} onChange={handleCardNumberChange} />
        </label>
        <br />
        <label>
          Ngày hết hạn:
          <input type="text" value={expiryDate} onChange={handleExpiryDateChange} />
        </label>
        <br />
        <label>
          CVV:
          <input type="text" value={cvv} onChange={handleCvvChange} />
        </label>
        <br />
      </form>
      <button onClick={handlePayment}>Thanh toán</button>
    </div>
  );
};

export default PaymentForm;
