import React, { useEffect, useState, useContext } from "react";
import useFetch from "../../hooks/useFetch";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import PaymentForm from "../../components/payment/PaymentForm";
import { AuthContext } from "../../context/AuthContext";
import { PayPalButton } from "react-paypal-button-v2";
import "./style.css";
import axios from "axios";
import { toast } from "react-toastify";

export default function MyRoom() {
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    new Promise(async () => {
      await getList();
    })
  }, []);

  useEffect(() => {
    if (data) {
       const totalPrice = data.reduce((acc, booking) => {
        const roomPrices = booking.idRoom.map((room) => room.price);
        const bookingTotalPrice = roomPrices.reduce((sum, price) => sum + price, 0);
        return acc + bookingTotalPrice;
       }, 0);
      
      setPrice(totalPrice)
    }
  },[data])

  const getList = async () => {
    try {
      const res = await axios.get(`/rooms/list-booking-by-user/${user._id}`);
      if (res) {

        const map = res.data.map((e) => {
          const roomPrices = e.idRoom.map((room) => room.price);
          const bookingTotalPrice = roomPrices.reduce((sum, price) => sum + price, 0);
          
          return {
            ...e,
            totalPrice : bookingTotalPrice
          }
        
        })

        setData(map);
      }
    } catch (error) {
      
    }
  }

  console.log(data);
 
  const handleDeleteRoom = async(id) => {
    try {
      const res = await axios.delete(`/rooms/delete-booking/${id}`);
      if (res.status === 200) {
        toast.success('Xóa Booking Thành Công');
        await getList();
      }
    } catch (error) {
      
    }
  };

  const handlePayment = () => {
    // Xử lý sự kiện sau khi thanh toán thành công
    console.log('Đã thanh toán thành công');
  };

  const showStatus = (pos) => {
    let text = '';
    switch (pos) {
      case 'pending':
        text = 'Pending';
        break;
        case 'success':
          text = 'Success';
        break;
        case 'cancel':
          text = 'Cancel';
          break;
      default:
        text = 'Pending';
        break;
    }
    return text;
  }

  const formatDate = (date) => {
    const formattedDate = date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return formattedDate;
  }

  const successPaymentHandler = async (id) => {
    const res = await axios.put(`/rooms/update/list-booking/${id}`, { statusPayment: 'success' });
    if (res.status === 200) {
      toast.success('Update status success');
      await getList();
    }

};

  return (
    <div>
      <Navbar />
      <React.Fragment type="list" />
      <div className="historyContainer">
        {data.length === 0 ? (
          <div className="noBooking">
            You haven't made your first booking yet!
          </div>
        ) : (
          <div className="historyList">
            <div className="historyItem historyHeader">
              <div>Hotel</div>
                <div className="nav-room">Room</div>
                <div className=""></div>
              <div className="nav-status">Status</div>
              <div className="nav-action">Action</div>
              <div className="nav">Payment</div>
              
            </div>
            {data?.map((item) => (
              <div key={item._id} className="historyItem">
                <div>{item?.idHotel?.name}</div>
                <div>
                  <>
                    <table>
                      <tr>
                        <th>Room</th>
                        <th>Des</th>
                        <th>Price</th>
                        <th>Max People</th>
                        <th>Date</th>
                      </tr>
                      {item?.idRoom?.map((it) => (
                      <tr>
                          <td>{it.title}</td>
                           <td>{it.desc}</td>
                          <td>{it.price}</td>
                          <td>{it.maxPeople}</td>
                          <td>{formatDate(it.updatedAt)}</td>
                      </tr>
                      ))}
                    </table>
                  </>
                </div>
 

                <div className="show-status">
                  <div className={`alert-${item.status}`}>
                    {showStatus(item.status)}
                  </div>
                </div>
                <div>
                
                
                  <button
                    className="btnCancel"
                    onClick={() => handleDeleteRoom(item?._id)}
                  >
                    Cancel
                  </button>
                
                </div>

                <div className="">
                  {
                    item.statusPayment !== 'success' ? (
                      item.totalPrice && (
                        <PayPalButton amount={item.totalPrice} onSuccess={()=>successPaymentHandler(item._id)} options={{ 
                          clientId:'AaiOR0UuKrkTaDWKtlae81PRr3enX2RBcxrcpX39uHH2VJy1ntxfIu3LuU8wOgey8oHm4SzH3cwqM5N5'
                        }} />
                      )
                    ) : (
                        <>
                           <div className={`alert-${item.statusPayment}`}>
                    {showStatus(item.statusPayment)}
                  </div>
                        </>
                    )
                        }
                </div>

              </div>
            ))}
          </div>
        )}
        <React.Fragment />
        <Footer className="footer" />
      </div>
    </div>
  );
}

//   return (
//     <>
//       <Navbar />
//       <div className="wrap-layout">
//         {data?.map((item) => (
//           <React.Fragment key={item?._id}>
//             <div>
//               <p>Name: {item?.title}</p>
//               <p>Price: {item?.price}</p>
//               <p>Max people: {item?.maxPeople}</p>
//             </div>
//             <button onClick={() => handleDeleteRoom(item?._id)}>
//               Cancel room
//             </button>
//             <hr />
//           </React.Fragment>
//         ))}
//       </div>
//     </>
//   );
// }