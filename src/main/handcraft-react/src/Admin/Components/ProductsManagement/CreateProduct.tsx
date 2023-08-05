import React, { useEffect, useState } from "react";
import { Button, Input, Label } from "semantic-ui-react";
import CategoryModel from "../../../Models/CategoryModel";
import ColorModel from "../../../Models/ColorModel";
import { useSelector } from "react-redux";
import CreateProductRequest from "../../../Models/Requests/CreateProductRequest";

const CreateProduct = () => {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [colors, setColors] = useState<ColorModel[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const [selecedCategory, setSelectedCategory] = useState(0);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDiscount, setPriceDiscount] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [selectedColorIds, setSelectedColorsIds] = useState<number[]>([]);

  const [httpError, setHttpError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [isButtonDisabled,setIsButtonDisabled] = useState(false) 

  const { isAuthenticated, isAdmin, tokenType, accessToken } = useSelector(
    (store: any) => store.auth
  );

  useEffect(() => {
    const fetchCategories = async () => {
      const url = "http://localhost:8080/api/categories";
      const responseData = await fetch(url);
      if (!responseData.ok) {
        throw new Error("Something went wrong during fetching product!");
      }
      const responseJson = await responseData.json();
      setCategories(responseJson._embedded.categories);
    };
    fetchCategories().catch((err) => setHttpError(err.message));
  }, []);

  useEffect(() => {
    const fetchProductColors = async () => {
      const url = `http://localhost:8080/api/colors`;
      const responseData = await fetch(url);
      if (!responseData.ok) {
        throw new Error("Something went wrong while fetching colors!");
      }
      const responseJson = await responseData.json();
      const response = responseJson._embedded.colors;
      const loadedColor: ColorModel[] = [];
      for (const key in response) {
        loadedColor.push({
          colorId: response[key].colorID,
          colorName: response[key].colorName,
        });
      }
      setColors(loadedColor);
    };
    fetchProductColors().catch((err: any) => setHttpError(err.message));
  }, []);

  const addProduct = async (e: any) => {
    e.preventDefault();
    if (
      selecedCategory &&
      productName &&
      productDescription &&
      productPrice &&
      images.length > 0 &&
      selectedColorIds.length > 0
    ) {
      const url = "http://localhost:8080/api/v1/products/admin/createproduct";
      const productModel: CreateProductRequest = new CreateProductRequest(
        productName,
        productDescription,
        productPrice,
        productDiscount,
        selecedCategory,
        selectedColorIds,
        images
      );
      const requestBody = {
        method: "POST",
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productModel),
      };
      if (isAuthenticated && isAdmin) {
        const request = await fetch(url, requestBody);
        if (!request.ok) {
          throw new Error("Something went wrong!");
        } else {
          const requestJson = await request.json();
          if(requestJson.status === 200){

            setSuccessMessage(requestJson.message);
            setIsButtonDisabled(true)
            setTimeout(function () {
              window.location.href = "/admin/createproduct";
            }, 2000);
          }else{
            setErrorMessage(requestJson.message)
          }
        }
      }
    } else {
      setErrorMessage("Please Fill All fields for creating a product!");
    }
  };


  const addImageToList = () => {
    setImages((prevImages) => [...prevImages, imageUrl]);
    setImageUrl("");
  };

  const addColortoList = async (value: any) => {
    if (!selectedColors.includes(value)) {
      setSelectedColors((prevColors) => [...prevColors, value]);
      colors.forEach((e: ColorModel) => {
        if (e.colorName === value) {
          setSelectedColorsIds((prevIds) => [...prevIds, e.colorId]);
        }
      });
    } else {
      alert("Color has been selected previously!");
    }
  };

  const deleteSelectedColor = (value: string) => {
    setSelectedColors((prevSelectedColors) => {
      return prevSelectedColors.filter((e: string) => e !== value);
    });

    setSelectedColorsIds((prevSelected) => {
      let selectedColorForDelete = colors.filter(
        (e: ColorModel) => e.colorName === value
      )[0].colorId;
      return [
        ...prevSelected.filter((e: number) => e !== selectedColorForDelete),
      ];
    });
  };

  const deleteSelectedImage = (indexImage: number) => {
    setImages((prevSelectedImages) => {
      return prevSelectedImages.filter((e: any, index) => index !== indexImage);
    });
  };
  if (httpError) {
    return (
      <div className="content-page">
        <p>{errorMessage}</p>
      </div>
    );
  }
  return (
    <div className="content-page">
      <div className="create-product-header text-center">
        <h2>Create Product</h2>
        {errorMessage && !successMessage && (
          <p className="nothing-found">{errorMessage}</p>
        )}
      </div>
      <div className="create-product-form">
        <form action="" onSubmit={addProduct}>
          <Label className="mt-3 mb-1" content="Product Name" />
          <Input
            onChange={(e: any) => setProductName(e.target.value)}
            fluid
            type="text"
            placeholder="Enter Product Name"
          />
          <Label className="mt-3 mb-1" content="Product Description" />
          <Input
            onChange={(e: any) => setProductDescription(e.target.value)}
            type="text"
            placeholder="Enter Product Description"
            fluid
          />
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <Label className="mt-3 mb-1" content="Product Price" />
              <br />
              <Input
                onChange={(e: any) => setProductPrice(parseInt(e.target.value))}
                min={0}
                labelPosition="right"
                type="number"
                placeholder="Enter Price"
              >
                <Label basic>$</Label>
                <input />
                <Label>.00</Label>
              </Input>
            </div>
            <div>
              <Label className="mt-3 mb-1" content="Discount" /> <br />
              <Input
                onChange={(e: any) =>
                  setPriceDiscount(parseInt(e.target.value))
                }
                label={{ basic: true, content: "%" }}
                labelPosition="right"
                className="create-product-discount"
                type="number"
                step="5"
                min="0"
                max="95"
                placeholder="Enter Discount"
              />
            </div>
            <div>
              <Label className="mt-3 mb-1" content="Product Category" /> <br />
              <select
                placeholder="Please Select Category"
                name=""
                id=""
                onChange={(e: any) =>
                  setSelectedCategory(parseInt(e.target.value))
                }
              >
                <option
                  value=""
                  disabled
                  selected
                >
                  Please Select Category
                </option>
                {categories.map((category: CategoryModel, index) => (
                  <option key={index} value={category.categoryId}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label className="mt-3 mb-1" content="Product Colors" /> <br />
              <select
                onChange={(e: any) => addColortoList(e.target.value)}
                placeholder="Please Select Colors"
                name=""
                value=""
                id=""
              >
                <option value="" disabled defaultValue={"Please Select Colors"}>
                  Please Select Colors
                </option>
                {colors.map((color: ColorModel, index) => (
                  <option key={index} value={color.colorName}>
                    {color.colorName}
                  </option>
                ))}
              </select>
              <br />
            </div>
          </div>
          <ul className="selected-elements">
            {selectedColors.map((color: string, index: number) => (
              <li key={index}>
                &mdash; {color}{" "}
                <span onClick={() => deleteSelectedColor(color)}>&#x2718;</span>
              </li>
            ))}
          </ul>

          <Label className="mt-3 " content="Product Images" />
          <br />
          <div>
            <Input
              className="my-1"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              fluid
              placeholder="Please Add One or More Image Url One By One"
            />

            <Button type="button" onClick={addImageToList}>
              Add Image
            </Button>
          </div>
          <div className="row">
            {images.map((image: string, index: number) => (
              <div key={index} className="col-2 selected-images">
                <p onClick={() => deleteSelectedImage(index)}>&#x2718;</p>
                <img src={image} alt="" />
              </div>
            ))}
          </div>
          <hr />
          {successMessage && (
            <div>
              <p className="success-message my-2">{successMessage}</p>{" "}
              <div className="loading-bar my-2"></div>
            </div>
          )}
          <div className="add-product-btn">
            <Button disabled={isButtonDisabled} size="big" primary type="submit">
              Add Product
            </Button>
          </div>
        </form>
        {/* </div> */}
      </div>
    </div>
  );
};

export default CreateProduct;
