import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=Đà Nẵng,Sài Gòn,Hà Nội"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://i.pinimg.com/564x/65/49/a8/6549a81aa9d32ca497e773a350e49835.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Da Nang City</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://i.pinimg.com/564x/50/4a/33/504a33b642866989d581bd01a33e2335.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Sai Gon City</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://i.pinimg.com/564x/d7/66/af/d766af192bb9d950217076a96f5a7801.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Ha Noi Capital</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
