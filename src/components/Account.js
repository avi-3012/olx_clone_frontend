import React from "react";
import "../style/Account.css";

const apiUrl = process.env.REACT_APP_URL + `/api`;

const Account = (props) => {
  // console.log(props.email);
  // console.log(props.isLoggedIn);
  const [listMyOrders, setListMyOrders] = React.useState([]);
  const [listProducts, setListProducts] = React.useState([]);
  const [listMyProducts, setListMyProducts] = React.useState([]);
  const [fetchedProducts, setFetchedProducts] = React.useState(false);

  const fetchingMyOrders = React.useCallback(async () => {
    try {
      const response = await fetch(
        apiUrl + `/account/myorders/${props.email}`,
        {
          method: "GET",
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      const response2 = await fetch(
        apiUrl + `/account/myproducts/${props.email}`,
        {
          method: "GET",
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      var data2 = await response2.json();

      data2.products = data2.products.reverse();

      setListMyOrders(data.orders);
      setListMyProducts(data2.products);
      setFetchedProducts(true);
    } catch (error) {
      console.log("IGNORE THE ERROR");
    }
  }, [props.email]);

  const fetchingProduct = React.useCallback(async () => {
    if (listMyOrders.length > 0) {
      var productArr = [];
      listMyOrders.map(async (item) => {
        const { product, date } = item;
        const response = await fetch(apiUrl + `/product/${product}`);
        const data = await response.json();
        data.product.date = date;
        productArr.push(data.product);
        setListProducts(productArr);
      });
    }
  }, [fetchedProducts]);

  React.useEffect(() => {
    fetchingMyOrders();

    fetchingProduct();
  }, [fetchingMyOrders, fetchingProduct]);

  return (
    <div style={{ overflow: "scroll" }}>
      <div className="MyOrders">My Orders</div>
      <div className="itemContainer">
        {listProducts &&
          listProducts.length > 0 &&
          listProducts.map((item) => {
            const { name, email, imgPath, date, price, _id } = item;
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
                      Date Bought <br />
                      <span>{date.slice(0, 10)}</span>
                    </div>
                  </div>
                </div>
                <div className="itemPurchased">Purchased</div>
              </div>
            );
          })}
        {listProducts && listProducts.length === 0 && (
          <div className="noOrders">No Orders</div>
        )}
      </div>
      <div className="MyProducts">My Products</div>
      <div className="itemContainer">
        {listMyProducts &&
          listMyProducts.length > 0 &&
          listMyProducts.map((item) => {
            const { name, email, imgPath, date, price, _id, isSold } = item;
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
                      Date Listed <br />
                      <span>{date.slice(0, 10)}</span>
                    </div>
                  </div>
                </div>
                <div className="itemPurchased">
                  {isSold ? "Sold" : "Unsold"}
                </div>
              </div>
            );
          })}
        {listMyProducts && listMyProducts.length === 0 && (
          <div className="noOrders">No Products</div>
        )}
      </div>
    </div>
  );
};

export default Account;
