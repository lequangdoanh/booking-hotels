import useFetch from "../../hooks/useFetch";
import "./propertyList.css";

const PropertyList = () => {
  const { data, loading, error } = useFetch("/hotels/countByType");

  const images = [
    "https://i.pinimg.com/564x/84/ce/50/84ce50f71dfd4a4b3db86b04eb810177.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    "https://i.pinimg.com/236x/5e/69/ba/5e69ba26282a2a2ee53d5257d56cf3d1.jpg",
    "https://i.pinimg.com/236x/02/f0/8d/02f08d0014fc0d505bff6e861653af95.jpg",
    "https://i.pinimg.com/564x/fc/50/df/fc50df38c060b706b32dd2aff1f54415.jpg",
  ];
  return (
    <div className="pList">
      {loading ? (
        "loading"
      ) : (
        <>
          {data &&
            images.map((img,i) => (
              <div className="pListItem" key={i}>
                <img
                  src={img}
                  alt=""
                  className="pListImg"
                />
                <div className="pListTitles">
                  <h1>{data[i]?.type}</h1>
                  <h2>{data[i]?.count} {data[i]?.type}</h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
