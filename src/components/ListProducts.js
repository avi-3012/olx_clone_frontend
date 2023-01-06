import React, { useCallback, useEffect } from "react";
import "../style/ListProducts.css";

const apiUrl = process.env.REACT_APP_URL + `/api`;

const ListProducts = (props) => {
  const [listData, setListData] = React.useState([]);

  const fetchingProducts = useCallback(async () => {
    const response = await fetch(apiUrl + `/products`);
    const data = await response.json();
    var filteredProduct = data.products?.filter((item) => {
      if (props?.isLoggedIn) {
        return item.email !== props.email;
      } else {
        return item;
      }
    });
    filteredProduct = filteredProduct?.reverse();
    setListData(filteredProduct);
  }, [props]);

  useEffect(() => {}, [listData]);

  useEffect(() => {
    fetchingProducts();
  }, [fetchingProducts]);

  const handleBuy = useCallback((id) => {
    fetch(apiUrl + `/products/buy/${id}`, {
      method: "POST",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          alert("Product bought successfully..!!");
          document.getElementById(id).innerHTML = "Added to Your Orders";
          document.getElementById(id).className = "itemSubmitButtonDisabled";
          document.getElementById(id).removeAttribute("onClick");
        } else if (data.error === "Error while buying product") {
        } else if (data.error === "Invalid token") {
          alert("Please login to buy the product");
        } else {
        }
      });
  });
  useEffect(() => {}, [handleBuy]);

  return (
    <div style={{ overflow: "scroll" }}>
      <div className="FreshRecommendations">Fresh Recommendations</div>
      <div className="itemContainer">
        {listData &&
          listData.length > 0 &&
          listData.map((item) => {
            const { name, price, imgPath, email, date, _id } = item;
            return (
              <div className="itemCard" key={_id}>
                <div
                  className="itemCardImage"
                  style={{
                    backgroundImage: `url(${process.env.REACT_APP_URL}/uploads/${imgPath})`,
                  }}
                ></div>
                <div className="itemCardBody">
                  <div className="itemCardBodyRowOne">
                    <div className="itemCardName">{name}</div>
                    <div className="itemCardPrice">₹{price}</div>
                  </div>
                  <div className="itemCardBodyRowTwo">
                    <div className="itemCardSeller">
                      Sold by
                      <br />
                      <span>{email.split("@")[0]}</span>
                    </div>
                    <div className="itemCardDate">
                      Date listed <br />
                      <span>{date.slice(0, 10)}</span>
                    </div>
                  </div>
                </div>
                <div className="itemSubmitContainer">
                  <button
                    id={_id}
                    className="itemSubmitButton"
                    onClick={() => handleBuy(_id)}
                  >
                    {" "}
                    Buy{" "}
                  </button>
                </div>
              </div>
            );
          })}
        {listData && listData.length === 0 && (
          <div className="noProducts">No Products Available</div>
        )}
      </div>
    </div>
  );
};

export default ListProducts;
