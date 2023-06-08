import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import react,{useEffect, useState} from 'react';

const Single = () => {
  const  [user,setUser] = useState (null)
  useEffect(()=>{
    const saved = localStorage.getItem("user");
    const initialValue = JSON.parse(saved);
    setUser(initialValue )
  },[localStorage.getItem("user")])
  console.log("initialValue",user)
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={user?.img ? user?.img :
                 "https://scontent.fdad1-1.fna.fbcdn.net/v/t39.30808-6/326822085_1614485892401089_1802332875703281896_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=174925&_nc_ohc=9X1NiUavTUQAX-t811n&_nc_ht=scontent.fdad1-1.fna&oh=00_AfAAyuxDTWFoq7d5zhE-S6bZIrTTJavsHDnfq9jTYDMbmg&oe=646E458D"}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">Quang Doanh</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">lequangdoanh888@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+84.38.787.0788</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    254 Nguyễn Văn Linh, Đà Nẵng
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">Việt Nam</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <List/>
        </div>
      </div>
    </div>
  );
};

export default Single;
