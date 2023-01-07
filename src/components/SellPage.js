import React, { useEffect } from "react";
import "../style/SellPage.css";
import uploadImage from "../img/uploadImageLogo.png";

const apiUrl = process.env.REACT_APP_URL + `/api`;

const SellPage = (props) => {
  // console.log(props.isLoggedIn);
  // console.log(props.email);
  const [successName, setSuccessName] = React.useState("");
  const [successPrice, setSuccessPrice] = React.useState("");
  const [successImage, setSuccessImage] = React.useState("");
  const [sellState, setSellState] = React.useState(false);
  const [form, setForm] = React.useState("");

  //Form
  useEffect(() => {
    if (props.isLoggedIn) {
      setForm(<SellForm email={props.email} />);
    } else {
      setForm(
        <div>
          <div style={{ width: "100%", height: "4rem" }}></div>
          <div className="SellPageContainer">
            <div className="SellPageCard">
              <div className="SellPageHeader">Sell Product</div>
              <div className="SellPageBody">
                <div className="SellPageBodyText SellForm">
                  Please Login to sell your product
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }, [props]);

  //SuccessData
  useEffect(() => {
    if (sellState) {
      setForm(
        <SuccessForm
          image={successImage}
          name={successName}
          price={successPrice}
        />
      );
    }
  }, [successName, successPrice, successImage, sellState]);

  //SellForm
  const SellForm = (props2) => {
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [invalidForm, setInvalidForm] = React.useState("");
    const [image, setImage] = React.useState("");
    const imageElm = document.querySelector(".SellFormImageArea");

    useEffect(() => {
      if (image !== "") {
        try {
          imageElm.style.backgroundImage = `url(${URL.createObjectURL(image)})`;
          imageElm.style.backgroundSize = "contain";
          imageElm.style.backgroundPosition = "center";
        } catch (error) {}
      }
    }, [image, imageElm]);

    useEffect(() => {}, [imageElm]);

    useEffect(() => {
      setTimeout(() => {
        setInvalidForm("");
      }, 3000);
    }, [invalidForm]);

    const SellProduct = async (e) => {
      e.preventDefault();

      //Form Validation
      var formData = new FormData();
      if (name === "") {
        setInvalidForm("Please Enter Name of Product");
        return;
      } else if (name.length > 30) {
        setInvalidForm("Name of Product should be less than 30 characters");
        return;
      } else {
        formData.append("name", name);
      }
      if (price === "") {
        setInvalidForm("Please Enter Price of Product");
        return;
      } else if (isNaN(price)){
        setInvalidForm("Please enter a valid number!!");
        return;
      } else {
        formData.append("price", price);
      }
      if (image === "") {
        setInvalidForm("Please Upload Image of Product");
        return;
      } else {
        formData.append("image", image);
      }

      formData.append("email", props2.email);
      formData.append("token", localStorage.getItem("token"));
      const response = await fetch(apiUrl + `/sell`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.status === "ok") {
        setSuccessName(name);
        setSuccessPrice(price);
        setSuccessImage(image);
        setSellState(true);
      }
      if (data.status === "error") {
        setInvalidForm(data.error.error + ". Please Login Again!!");
      }
    };
    const ClearForm = (e) => {
      e.preventDefault();
      setName("");
      setPrice("");
      setImage("");
      imageElm.style.backgroundImage = `url(${uploadImage})`;
      imageElm.style.backgroundSize = "50px 50px";
      imageElm.style.backgroundPosition = "center";
    };
    return (
      <div>
        <div style={{ width: "100%", height: "4rem" }}></div>
        <div className="SellPageContainer">
          <div className="SellPageCard">
            <div className="SellPageHeader">Sell Product</div>
            <div className="SellPageBody">
              <form className="SellForm">
                <div
                  className="SellFormImageArea"
                  style={{
                    backgroundImage: `url(${uploadImage})`,
                    backgroundSize: "50px 50px",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                >
                  <input
                    className="SellFormImageInput"
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file"
                    name="image"
                  />
                </div>
                <input
                  className="SellFormInput"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Name of Product"
                />
                <input
                  className="SellFormInput"
                  type="digit"
                  value={price}
                  price="price"
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter selling price in ₹"
                />
                <div className="InvalidForm">{invalidForm}</div>
                <div className="SellFormButtons">
                  <button className="Button" onClick={(e) => ClearForm(e)}>
                    {" "}
                    Clear Form
                  </button>
                  <button
                    className="Button"
                    type="submit"
                    onClick={(e) => SellProduct(e)}
                  >
                    Sell
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  //SuccessForm
  const SuccessForm = ({ image, name, price }) => {
    useEffect(() => {}, [image, name, price]);

    const handleSellMore = () => {
      setForm(<SellForm email={props.email} />);
      setSellState(false);
    };
    const handleHomePage = () => {
      window.location.href = `/`;
      setSellState(false);
    };
    return (
      <div>
        <div style={{ width: "100%", height: "4rem" }}></div>
        <div className="SellPageContainer">
          <div className="SellPageCard">
            <div className="SuccessPageHeader">Product Listed</div>
            <div className="SellPageBody SellForm">
              <div className="SellPageBodyText">
                <div className="SellPageBodyTextHeader">
                  Product Name: {name}
                </div>
                <div className="SellPageBodyTextBody"></div>
              </div>
              <div className="SellPageBodyText">
                <div className="SellPageBodyTextHeader">
                  Product Price: {price}
                </div>
                <div className="SellPageBodyTextBody"></div>
              </div>
              <div className="SellPageBodyText">
                <div
                  className="SuccessFormImageArea"
                  style={{
                    backgroundImage: `url(${URL.createObjectURL(image)})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                ></div>
              </div>
              <div className="SuccessFormButtons">
                <div onClick={handleHomePage} className="SuccessButton">
                  Homepage
                </div>
                <div onClick={handleSellMore} className="SuccessButton">
                  Sell More
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  //Render
  return <div>{form}</div>;
};

export default SellPage;
