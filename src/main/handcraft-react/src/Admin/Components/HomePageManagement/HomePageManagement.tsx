import React, { useEffect, useState } from "react";
import { Button, Form, Input, Label } from "semantic-ui-react";
import HomePageModel from "../../../Models/HomePageModel";
import { useSelector } from "react-redux";
const HomePageManagement = () => {
  const [homepageElement, setHomepageElement] = useState<HomePageModel[]>([]);
  const [bannerId, setBannerId] = useState<string>();
  const [images, setImages] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [httpError, setHttpError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { tokenType, accessToken } = useSelector((store: any) => store.auth);
  useEffect(() => {
    const fetchHomeElement = async () => {
      const url = "http://localhost:8080/api/homepages";
      const request = await fetch(url);
      if (!request.ok) {
        throw new Error("Something went wrong!");
      }
      const requestJson = await request.json();
      setHomepageElement(requestJson._embedded.homepages);
      setBannerId(requestJson._embedded.homepages[0].bannerProductId);
      setImages(requestJson._embedded.homepages[0].carouselImages);
    };
    fetchHomeElement().catch((e: any) => setHttpError(e.message));
  }, []);

  const updateHomepage = async () => {
    const url = "http://localhost:8080/api/v1/homepage/update";
    const body = {
      carouselImages: images,
      bannerId: bannerId,
    };
    const requestBody = {
      method: "PUT",
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const request = await fetch(url, requestBody);
    const requestJson = await request.json();
    console.log(requestJson);
    if (requestJson.status !== 200) {
      setErrorMessage(requestJson.message);
      setSuccessMessage("");
    } else {
      setSuccessMessage(requestJson.message);
      setErrorMessage("");
    }
  };

  const deleteSelectedImage = (indexImage: number) => {
    setImages((prevSelectedImages) => {
      return prevSelectedImages.filter((e: any, index) => index !== indexImage);
    });
  };

  const addImageToList = () => {
    if (images) {
      setImages((prevImages) => [...prevImages, imageUrl]);
      setImageUrl("");
    } else {
      setImages([imageUrl]);
    }
  };

  if (httpError) {
    return <p className="content-page">{httpError}</p>;
  }
  
  return (
    <>
      <div className="content-page">
        <h2 className="text-center">Home Page Management</h2>
        {errorMessage && !successMessage && (
          <p className="nothing-found">{errorMessage}</p>
        )}
        {!errorMessage && successMessage && (
          <p className="success-message">{successMessage}</p>
        )}
        <Form>
          <Label>Home Carousel Images</Label>
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
          <div className="row">
            {images?.map((elem: string, index: number) => (
              <div key={index} className="col-2 selected-images">
                <p onClick={() => deleteSelectedImage(index)}>&#x2718;</p>
                <img src={elem} alt="a" />
              </div>
            ))}
          </div>
          <br />
          <Label>Banner Product ID</Label>
          <Input
            type="number"
            min="0"
            value={bannerId}
            className="mt-1"
            fluid
            onChange={(e) => setBannerId(e.target.value)}
          />
          <div className="add-product-btn">
            <Button
              onClick={updateHomepage}
              size="big"
              className="mt-3"
              primary
              type="submit"
            >
              Update Homepage
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default HomePageManagement;
