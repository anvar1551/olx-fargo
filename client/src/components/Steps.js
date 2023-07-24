import React, { useState } from "react";
import axios from "axios";
import Input from "./Input";
import Checkbox from "./Checkbox";
import fargoImg from "../img/fargo.jpg";
import PaymentOption from "./PaymentOption";
import apiClient from "../api/api";
const { countPrice, countPricePoint } = require("./CountDeliveryPrice");
const { generateUniqueTGID } = require("../utils/tgIDGenarator");

const StepsPanel = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [notFilled, setNotFilled] = useState(false);
  const [formData, setFormData] = useState({
    olxRef: "",
    senderName: "",
    city: "",
    senderAdress: "",
    senderPhone: "+998",
    whoPays: "",
    typeOfDelivery: "",
    recieverName: "",
    recieverCity: "",
    recieverAdress: "",
    receivePoint: "",
    recieverPhone: "+998",
    weight: 0,
    additionalInfo: "",
    totalCost: 0,
  });

  const [succes, setSuccess] = useState("");

  //////////////////////////////////////////////////////////////////

  // Function to trim phone numbers from empty spaces
  const trimPhone = (value) => {
    // Remove all non-digit characters from the value
    return value.replace(/\D/g, "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const trimmedValue =
      name === "senderPhone" || name === "recieverPhone"
        ? trimPhone(value)
        : value;

    console.log(trimmedValue);
    setFormData((prevData) => ({
      ...prevData,
      [name]: trimmedValue,
    }));
  };

  //////////////////////////////////////////////////////////////////
  // Handling Next and Previous button
  const handleNextStep = () => {
    // Checking and counting the price of the delivery
    const totalCost =
      formData.typeOfDelivery === "До пункта"
        ? countPricePoint(Number(formData.weight))
        : countPrice(Number(formData.weight));
    setFormData((prevData) => {
      // Check the previous state
      return {
        ...prevData,
        totalCost: totalCost,
      };
    });
    console.log(formData.receivePoint);

    // Cheking are the field senderCity, typeOfDelivery and weight filed in order to count price
    formData.city &&
      formData.typeOfDelivery &&
      formData.weight !== 0 &&
      formData.weight > 0 &&
      setCurrentStep(currentStep + 1);

    // Close Telegram web app when "Finish" button is clicked
    if (currentStep === 3) {
      window.close();
    }
  };
  // Handling rejection of the Reject button
  const handleReject = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString(); // Format the date as desired
    const formattedTime = currentDate.toLocaleTimeString(); // Format the time as desired

    // Generate a unique ID starting with "TG"
    const uniqueId = generateUniqueTGID();

    const updatedFormData = {
      ...formData,
      id: uniqueId,
      status: "Отказ",
      dateTime: `${formattedDate} ${formattedTime}`,
    };

    // Send data to the server
    apiClient
      .post("/api/write-to-google-sheets", updatedFormData)
      .then((response) => {
        // Handle success
        setSuccess(false);
        setCurrentStep(currentStep + 1);
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  // Handling rejection of the Confirm button
  const handleConfirm = () => {
    // Checking if any fields are empty returns to first step
    if (
      currentStep === 2 &&
      (!formData.senderName ||
        formData.senderName.trim() === "" ||
        !formData.senderAdress ||
        formData.senderAdress.trim() === "" ||
        !formData.senderPhone ||
        formData.senderPhone.trim() === "+998" ||
        !formData.recieverName ||
        formData.recieverName.trim() === "" ||
        !formData.recieverPhone ||
        formData.recieverPhone.trim() === "+998")
    ) {
      setNotFilled(true);
      setCurrentStep(currentStep - 1);
    } else {
      setNotFilled(false);
      // Add current date and time to formData
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString(); // Format the date as desired
      const formattedTime = currentDate.toLocaleTimeString(); // Format the time as desired

      // Generate a unique ID starting with "TG"
      const uniqueId = generateUniqueTGID();

      const updatedFormData = {
        ...formData,
        id: uniqueId,
        status: "Подтверждено",
        dateTime: `${formattedDate} ${formattedTime}`,
      };

      // Send data to the server
      apiClient
        .post("/api/write-to-google-sheets", updatedFormData)
        .then((response) => {
          // Handle success
          setSuccess(true);
          setCurrentStep(currentStep + 1);
          console.log(response.data);
        })
        .catch((error) => {
          // Handle error
          console.error(error);
        });
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  //////////////////////////////////////////////////////////////////

  return (
    <div className="min-h-screen max-w-md mx-auto">
      <div className="shadow-lg bg-white rounded-lg px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <img src={fargoImg} alt="icon" className=" h-16 mt-3 ms:h-10 ml-2" />
          {/* <h2 className="text-xl mr-36 font-bold">Fargo</h2> */}
          <div className="text-sm text-gray-500">Шаг {currentStep} из 3</div>
        </div>
        {currentStep === 1 && (
          <div>
            <h3 className="text-lg font-bold mb-4">
              Рассчитать и оформить доставку
            </h3>
            {/* Step 1 content */}

            {/* /////////////////////////////////////////// */}
            <Input
              handleChange={handleChange}
              type="text"
              senderName="olxRef"
              value={formData.olxRef}
              inputName="Ссылка на отправлямый товар"
              placeholder="Ссылка на товар"
              className={
                notFilled && formData.olxRef === ""
                  ? "ring-red-500"
                  : "ring-gray-500"
              }
            />
            <Input
              handleChange={handleChange}
              type="text"
              senderName="senderName"
              value={formData.senderName}
              inputName="Имя отправителя"
              placeholder="Введите свои имя и фамилию"
              className={
                notFilled && formData.senderName === ""
                  ? "ring-red-500"
                  : "ring-gray-500"
              }
            />
            <Input
              handleChange={handleChange}
              type="text"
              senderName="city"
              value={formData.city}
              inputName="Город отправителя"
              placeholder="Введите город отправки"
              className={`${
                formData.city === "" ? "ring-red-500" : "ring-gray-500"
              }`}
            />
            <Input
              handleChange={handleChange}
              type="text"
              senderName="senderAdress"
              value={formData.senderAdress}
              inputName="Адрес отправителя"
              placeholder="Введите адрес отправителя"
              className={
                notFilled && formData.senderAdress === ""
                  ? "ring-red-500"
                  : "ring-gray-500"
              }
            />
            <Input
              handleChange={handleChange}
              type="text"
              senderName="senderPhone"
              value={formData.senderPhone}
              inputName="Номер телефона отправителя"
              className={
                notFilled && formData.senderPhone === "+998"
                  ? "ring-red-500"
                  : "ring-gray-500"
              }
            />
            <PaymentOption
              handleChange={handleChange}
              inputName="whoPays"
              currentStep={currentStep}
              value={formData}
            />

            {/* <OptionBox handleChange={handleChange} inputName="Пункт выдачи" /> */}
            <Checkbox
              handleChange={handleChange}
              value={formData}
              notFilled={notFilled}
              currentStep={currentStep}
            />

            {/* /////////////////////////////////////////// */}
            <Input
              handleChange={handleChange}
              type="number"
              value={formData.weight}
              senderName="weight"
              inputName="Введите вес (кг)"
              className={`${
                formData.weight < 0 || formData.weight === 0
                  ? "ring-red-500"
                  : "ring-gray-500"
              }`}
            />
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <h3 className="text-lg font-bold mb-4">
              Сумма доставки: {`${formData.totalCost} сум`}
            </h3>
            {/* Step 2 content */}
          </div>
        )}
        {currentStep === 3 && (
          <div>
            <h3 className="text-lg font-bold mb-4">
              {succes ? "Ваш заказ принят!" : "Будем рады увидеть вас снова!"}
            </h3>
            {/* Step 3 content */}
          </div>
        )}
        <div className="flex justify-between mt-6">
          {currentStep > 1 && currentStep < 3 && (
            <button
              className="text-sm bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
              onClick={handlePrevStep}
            >
              Назад
            </button>
          )}
          <div className="flex">
            {currentStep === 2 && (
              <button
                className="  bg-emerald-600 hover:bg-emerald-700 text-white font-bold  px-3 rounded text-sm"
                onClick={handleConfirm}
              >
                Оформить доставку
              </button>
            )}
            {currentStep === 2 && (
              <button
                className=" bg-red-500 mr-2 hover:bg-red-700 text-white font-bold px-3 rounded text-sm"
                onClick={handleReject}
              >
                Отменить
              </button>
            )}
          </div>
          {currentStep < 2 && (
            <button
              className="bg-sky-700 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded"
              onClick={handleNextStep}
            >
              Далее
            </button>
          )}

          {/* {currentStep === 3 && (
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleNextStep}
            >
              Finish
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default StepsPanel;
