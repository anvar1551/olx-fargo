import React, { useState, useEffect } from "react";
import Input from "./Input";
import OptionBox from "./OptionsBox";

const Checkbox = (props) => {
  const { handleChange, value, notFilled, currentStep } = props;
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleOptionChange = (event) => {
    const optionValue = event.target.value;
    setSelectedOption(optionValue);
    setInputValue("");
    handleChange({
      target: { name: "typeOfDelivery", value: optionValue },
    });
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    setSelectedOption(value.typeOfDelivery || null);
  }, [currentStep]);

  return (
    <div>
      <div className="flex flex-raw justify-evenly my-4">
        <div>
          <label className="flex items-center ">
            <input
              type="radio"
              name="deliveryOption"
              value="До двери"
              checked={selectedOption === "До двери"}
              onChange={handleOptionChange}
              className={`hidden`}
            />
            <span
              className={`px-2 py-1 bg-slate-500 text-white rounded-lg cursor-pointer ${
                selectedOption === "До двери" ? "bg-slate-700 text-white" : ""
              }`}
            >
              От двери до двери
            </span>
          </label>
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="radio"
              name="deliveryOption"
              value="До пункта"
              checked={selectedOption === "До пункта"}
              onChange={handleOptionChange}
              className={`hidden`}
            />
            <span
              className={`px-2 py-1 bg-slate-500 text-white rounded-lg cursor-pointer ${
                selectedOption === "До пункта" ? "bg-slate-700 text-white" : ""
              }`}
            >
              От двери до пункта
            </span>
          </label>
        </div>
      </div>

      {selectedOption === "До двери" && (
        <>
          <Input
            handleChange={handleChange}
            type="text"
            senderName="recieverName"
            value={value.recieverName}
            inputName="Имя получателя"
            placeholder="Введите имя и фамилию"
            className={
              notFilled && value.senderName === ""
                ? "ring-red-500"
                : "ring-gray-500"
            }
          />
          <Input
            handleChange={handleChange}
            type="text"
            value={value.recieverCity}
            senderName="recieverCity"
            inputName="Город получателя"
            placeholder="Введите город получателя"
            className={`${
              value.recieverCity === "" ? "ring-red-500" : "ring-gray-500"
            }`}
          />
          <Input
            handleChange={handleChange}
            senderName="recieverAdress"
            value={value.recieverAdress}
            inputName="Адрес получателя"
            placeholder="Введите адрес получателя"
            className={
              notFilled && value.senderAdress === ""
                ? "ring-red-500"
                : "ring-gray-500"
            }
          />
          <Input
            handleChange={handleChange}
            type="text"
            senderName="recieverPhone"
            value={value.recieverPhone}
            inputName="Номер получателя"
            className={
              notFilled && value.senderPhone === "+998"
                ? "ring-red-500"
                : "ring-gray-500"
            }
          />
        </>
      )}
      {selectedOption === "До пункта" && (
        <>
          <Input
            handleChange={handleChange}
            type="text"
            senderName="recieverName"
            value={value.recieverName}
            inputName="Имя получателя"
            placeholder="Введите имя и фамилию"
            className={
              notFilled && value.senderName === ""
                ? "ring-red-500"
                : "ring-gray-500"
            }
          />
          <Input
            handleChange={handleChange}
            type="text"
            senderName="recieverPhone"
            value={value.recieverPhone}
            inputName="Номер получателя"
            className={
              notFilled && value.senderPhone === "+998"
                ? "ring-red-500"
                : "ring-gray-500"
            }
          />
          <OptionBox
            handleChange={handleChange}
            inputName="receivePoint"
            currentStep={currentStep}
            value={value}
          />
        </>
      )}
    </div>
  );
};

export default Checkbox;
