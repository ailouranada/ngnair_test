"use client";

import { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useMask } from "@react-input/mask";
import { HiOutlineChevronRight } from "react-icons/hi";
export default function Home() {
  const defaultValues = {
    owner: [
      {
        firstName: "",
        lastName: "",
        position: "",
        ownership: 0,
        phoneNumber: "",
        address: "",
        country: "",
        state: "",
        city: "",
        zipCode: "",
        ssn: "",
        birthday: "",
        email: "",
        countryCode: "",
      },
    ],
  };

  const {
    register,
    handleSubmit,
    onSubmit,
    control,
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm({ defaultValues });

  const phoneNumberRef = useMask({
    mask: "___-___-____",
    replacement: { _: /\d/ },
  });
  const ssnRef = useMask({ mask: "___-__-___", replacement: { _: /\d/ } });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "owner",
  });

  const docTypes = [
    {
      id: 0,
      enum: "PhotoIdentification",
      description: "Photo Identification",
    },
    {
      id: 1,
      enum: "BankLetter",
      description: "Bank Letter",
    },
    {
      id: 2,
      enum: "BankStatement",
      description: "Bank Statement",
    },
    {
      id: 3,
      enum: "TaxReturn",
      description: "Tax Return",
    },
    {
      id: 4,
      enum: "BusinessLicense",
      description: "Business License",
    },
    {
      id: 5,
      enum: "UtilityBill ",
      description: "Utility Bill",
    },
    {
      id: 6,
      enum: "PreviousProcessorStatements",
      description: "Previous Processor Statements",
    },
    {
      id: 7,
      enum: "ApplicationUnredacted",
      description: "Application Unredacted",
    },
    {
      id: 8,
      enum: "OtherUnderwritingDocuments",
      description: "Other Underwriting Documents",
    },
    {
      id: 9,
      enum: "EquipmentOrderingForm",
      description: "Equipment Ordering Form",
    },
    {
      id: 10,
      enum: "UnderwritingDocument",
      description: "Underwriting Document",
    },
    {
      id: 11,
      enum: "AgentContract",
      description: "Agent Contract",
    },
    {
      id: 12,
      enum: "SignedScheduleA",
      description: "Signed Schedule A",
    },
    {
      id: 13,
      enum: "ResidualSplitProfileEmail",
      description: "Residual Split Profile Email",
    },
    {
      id: 14,
      enum: "Other",
      description: "Other",
    },
    {
      id: 15,
      enum: "NailSoft",
      description: "Nail Soft Set up",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState("Document");
  const [isCheckboxCheck, setIsCheckboxCheck] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState([
    {
      id: 0,
      enum: "PhotoIdentification",
      description: "Photo Identification",
    },
    {
      id: 1,
      enum: "BankLetter",
      description: "Bank Letter",
    },
    {
      id: 2,
      enum: "BankStatement",
      description: "Bank Statement",
    },
  ]);

  const handleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCheckbox = () => {
    setIsCheckboxCheck((prev) => !prev);
    reset({
      ...defaultValues,
    });
    if (!isCheckboxCheck) {
      setValue(`owner.${0}.country`, "US");
      setValue(`owner.${0}.countryCode`, "+1");
    }
  };

  const handleNext = async (step) => {
    const isValid = await trigger();
    if (isValid) {
      switch (step) {
        case "Ownership":
          setCurrentStep("Document");
          break;
        case "Document":
          setCurrentStep("Review");
          break;
        default:
          break;
      }
    }
  };

  const cities = [
    {
      country: {
        value: "US",
        label: "USA",
      },
      state: [
        {
          value: "California",
          label: "California",
          cities: [
            {
              label: "Los Angeles",
              value: "Los Angeles",
            },
          ],
        },
      ],
    },
    {
      country: {
        value: "PH",
        label: "Philippines",
      },
      state: [
        {
          value: "Laguna",
          label: "Laguna",
          cities: [
            {
              label: "San Pablo",
              value: "San Pablo",
            },
          ],
        },
        {
          value: "Manila",
          label: "Manila",
          cities: [
            {
              label: "Metro Manila",
              value: "Metro Manila",
            },
          ],
        },
      ],
    },
  ];

  const handleStates = (index) => {
    return cities.find(
      (state) => state.country.value === watch("owner")[index].country
    );
  };

  const handleCity = (index) => {
    const country = cities.find(
      (state) => state.country.value === watch("owner")[index].country
    );
    const state = country?.state.find(
      (data) => data.value === watch("owner")[index].state
    );
    return state?.cities;
  };

  //Document
  const Document = () => {
    return (
      <div className="flex flex-col w-full">
        {selectedDocType.length !== 16 && (
          <div className="flex flex-col">
            <label className="font-semibold text-base text-black">
              Add Doc Type
            </label>
            <select
              className="border-gray-300 border rounded p-2 my-3"
              onChange={(e) => {
                const findDocType = docTypes.find(
                  (doc) => doc.id.toString() === e.target.value.toString()
                );
                setSelectedDocType((prev) => [...prev, findDocType]);
              }}
            >
              <option></option>
              {docTypes.map((type, i) => {
                  return <option className={selectedDocType.find((doc) => doc.id === type.id) && "disabled:bg-gray-100 text-gray-300"} disabled={selectedDocType.find((doc) => doc.id === type.id)} key={i} value={type.id}>{type.description}</option>;
                })}
            </select>
          </div>
        )}
        <div className="flex flex-col p-5 border rounded border-gray-300 mb-5">
          <label className="text-black font-semibold">
            Photo Identification:
          </label>
          <div className="flex flex-row mt-3">
            <input
              type="file"
              className="file:bg-blue-200 file:rounded-xl file:border-none file:px-2 file:py-1 file:text-sm file:outline-none file:text-blue-500 file:mr-10"
              multiple
            />
            <button className="text-white bg-sky-800 rounded px-2 py-1">
              Upload
            </button>
          </div>
        </div>
        <div className="flex flex-col p-5 border rounded border-gray-300 mb-5">
          <label className="text-black font-semibold">
            Bank Letter or Voided Check:
          </label>
          <div className="flex flex-row mt-3">
            <input
              type="file"
              className="file:bg-blue-200 file:rounded-xl file:border-none file:px-2 file:py-1 file:text-sm file:outline-none file:text-blue-500 file:mr-10"
              multiple
            />
            <button className="text-white bg-sky-800 rounded px-2 py-1">
              Upload
            </button>
          </div>
        </div>
        <div className="flex flex-col p-5 border rounded border-gray-300 mb-5">
          <label className="text-black font-semibold">
            3 months of Bank Statements:
          </label>
          <div className="flex flex-row mt-3">
            <input
              type="file"
              className="file:bg-blue-200 file:rounded-xl file:border-none file:px-2 file:py-1 file:text-sm file:outline-none file:text-blue-500 file:mr-10"
              multiple
            />
            <button className="text-white bg-sky-800 rounded px-2 py-1">
              Upload
            </button>
          </div>
        </div>
        {selectedDocType.map((selected, index) => {
          if (selected.id > 2) {
            return (
              <div key={index} className="flex flex-col p-5 border rounded border-gray-300 mb-5">
                <label className="text-black font-semibold">
                  {selected.description}:
                </label>
                <div className="flex flex-row mt-3">
                  <input
                    type="file"
                    className="file:bg-blue-200 file:rounded-xl file:border-none file:px-2 file:py-1 file:text-sm file:outline-none file:text-blue-500 file:mr-10"
                    multiple
                  />
                  <button className="text-white bg-sky-800 rounded px-2 py-1">
                    Upload
                  </button>
                </div>
              </div>
            );
          }
        })}
        <div className="flex flex-row justify-between items-center sticky bottom-0 left-0 w-full bg-white p-5">
          <button
            disabled={currentStep === "Ownership"}
            className={`${
              currentStep === "Ownership" ? "bg-gray-400" : "bg-sky-800"
            } text-white rounded px-2 py-1`}
            onClick={() => setCurrentStep("Ownership")}
          >
            Previous
          </button>
          {currentStep === "Review" ? (
            <button className="bg-sky-800 text-white rounded px-2 py-1">
              Submit
            </button>
          ) : (
            <button
              className="bg-sky-800 text-white rounded px-2 py-1"
              onClick={() => handleNext(currentStep)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    );
  };

  //Review
  const Review = () => {
    return (
      <div className="flex flex-col w-full">
        <div className="w-full py-2 rounded mb-10 bg-green-200 text-green-500">
          <p className="text-center text-base font-semibold">
            This is a preview of your submission. It has not been submitted.
          </p>
          <p className="text-center text-xs">
            Please take your time verifying the information. You can also go
            back to make changes.
          </p>
        </div>
        {watch("owner").map((data, index) => {
          return (
            <div className="flex flex-col mb-10">
              {isCheckboxCheck ? (
                <p className="text-lg text-black font-bold">Control Proning</p>
              ) : (
                <p className="text-lg text-black font-bold">Owner {index + 1}</p>
              )}
              <p className="font-semibold text-gray-800 text-sm mt-2">First Name</p>
              <p className="text-sm">{data.firstName}</p>
              <p className="font-semibold text-gray-800 text-sm mt-2">Last Name</p>
              <p className="text-sm">{data.lastName}</p>
              <p className="font-semibold text-gray-800 text-sm mt-2">Title / Position</p>
              <p className="text-sm">{data.position}</p>
              <p className="font-semibold text-gray-800 text-sm mt-2">Ownership</p>
              <p className="text-sm">{data.ownership}%</p>
              <p className="font-semibold text-gray-800 text-sm mt-2">
                Home / Mobile Phone Number
              </p>
              <p className="text-sm">{data.phoneNumber}</p>
              <p className="font-semibold text-gray-800 text-sm mt-2">Home Address</p>
              <p className="text-sm">{data.address}</p>
              <p className="font-semibold text-gray-800 text-sm mt-2">Country</p>
              <p className="text-sm">{data.country}</p>
              <p className="font-semibold text-gray-800 text-sm mt-2">State</p>
              <p className="text-sm">{data.state}</p>
              <p className="font-semibold text-gray-800 text-sm mt-2">City</p>
              <p className="text-sm">{data.city}</p>
              <p className="font-semibold text-gray-800 text-sm mt-2">Zip Code</p>
              <p className="text-sm">{data.zipCode}</p>
              <p className="font-semibold text-gray-800 text-sm mt-2">
                Social Security Number
              </p>
              <p className="text-sm">{data.ssn}</p>
              <p className="font-semibold text-gray-800 text-sm mt-2">Birthday</p>
              <p className="text-sm">{data.birthday}</p>
              <p className="font-semibold text-gray-800 text-sm mt-2">Email Address</p>
              <p className="text-sm">{data.email}</p>
            </div>
          );
        })}
        <div className="flex flex-row justify-between items-center sticky bottom-0 left-0 w-full bg-white p-5">
          <button
            disabled={currentStep === "Ownership"}
            className={`${
              currentStep === "Ownership" ? "bg-gray-400" : "bg-sky-800"
            } text-white rounded px-2 py-1`}
            onClick={() => setCurrentStep("Document")}
          >
            Previous
          </button>
          {currentStep === "Review" ? (
            <button className="bg-sky-800 text-white rounded px-2 py-1">
              Submit
            </button>
          ) : (
            <button
              className="bg-sky-800 text-white rounded px-2 py-1"
              onClick={() => handleNext(currentStep)}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-[#F8F8FF] h-dvh flex justify-center items-center text-gray-500">
      {isOpen ? (
        <form
          className="bg-white drop-shadow-lg px-10 rounded flex flex-col relative max-w-[1100px] overflow-y-scroll"
          style={{ maxHeight: `calc(100% - 100px)` }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <nav className="flex flex-row justify-center border-b border-b-gray-300 pb-3 p-5 text-lg mb-5 sticky top-0 left-0 bg-white">
            <div className="flex flex-row items-center space-x-6 justify-between mx-2">
              <p>BUSINESS INFO</p>
              <HiOutlineChevronRight color="gray" size={14} />
            </div>
            <div className="flex flex-row items-center space-x-6 justify-between mx-2">
              <p>TRANSACTIONS</p>
              <HiOutlineChevronRight color="gray" size={14} />
            </div>
            <div className="flex flex-row items-center space-x-6 justify-between mx-2">
              <p
                className={
                  currentStep === "Ownership"
                    ? "text-blue-500"
                    : "text-gray-500"
                }
              >
                OWNERSHIP
              </p>
              <HiOutlineChevronRight color="gray" size={14} />
            </div>
            <div className="flex flex-row items-center space-x-6 justify-between mx-2">
              <p
                className={
                  currentStep === "Document" ? "text-blue-500" : "text-gray-500"
                }
              >
                DOCUMENTS
              </p>
              <HiOutlineChevronRight color="gray" size={14} />
            </div>
            <div className="flex flex-row items-center space-x-6 justify-between mx-2">
              <p>BANKING</p>
              <HiOutlineChevronRight color="gray" size={14} />
            </div>
            <div className="flex flex-row items-center space-x-6 justify-between ml-2">
              <p
                className={
                  currentStep === "Review" ? "text-blue-500" : "text-black"
                }
              >
                REVIEW
              </p>
            </div>
          </nav>
          {currentStep === "Ownership" ? (
            <div className="flex flex-col w-full">
              <p className="text-center text-sm">
                Provide the following information for each individual who owns,
                directly or indirectly, 25% or more of the equity interest of
                your business. If no single owner owns more than 25%, an
                individual with significant responsibility can be added as
                principal 1*.
              </p>
              <p className="text-center text-sm my-5">
                *Individual with significant responsibility includes an
                executive officer or owner with authority to control, manage,
                and direct the legal entity (e.g. a Chief Executive Officer,
                Chief Financial Officer, Managing Member, General Partner,
                President, Vice President, or Treasurer) or any individual with
                authority to perform such functions.
              </p>
              <div className="flex flex-row space-x-1 pb-5 border-b border-b-gray-300 mb-5">
                <input
                  type="checkbox"
                  className="w-3 outline-none"
                  value={isCheckboxCheck}
                  onClick={handleCheckbox}
                />
                <p className="font-semibold text-base">
                  Is an individual with significant responsibility
                </p>
              </div>
              {fields.map((item, index) => (
                <div key={item.id} className="mb-5 border-b border-b-gray-300">
                  <div className="flex flex-row justify-between w-full mb-5">
                    <div className="flex flex-row items-end space-x-20">
                      <p className="text-lg text-black">
                        {isCheckboxCheck
                          ? "CONTROL PRONG"
                          : `OWNER ${index + 1}`}
                      </p>
                      {!isCheckboxCheck && (
                        <p className="text-xs text-black">/Control Prong</p>
                      )}
                    </div>
                    {fields.length > 1 && (
                      <button
                        className="bg-red-500 rounded text-white w-fit px-4 py-2"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="flex flex-row justify-evenly space-x-5 my-5">
                    <div className="flex flex-col w-full">
                      <label>
                        First Name:<span className="text-red-500">*</span>
                      </label>
                      <input
                        className="border-gray-300 border rounded h-10 mt-1 px-2"
                        placeholder="First Name"
                        {...register(`owner.${index}.firstName`, {
                          required: true,
                        })}
                      />
                      {errors?.owner?.length > 0 &&
                        errors.owner[index]?.firstName && (
                          <p className="text-xs text-red-500 mt-1">
                            First Name is required
                          </p>
                        )}
                    </div>
                    <div className="flex flex-col w-full">
                      <label>Last Name:</label>
                      <input
                        className="border-gray-300 border rounded h-10 mt-1 px-2"
                        placeholder="Last Name"
                        {...register(`owner.${index}.lastName`)}
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <label>
                        Title / Position:<span className="text-red-500">*</span>
                      </label>
                      <input
                        className="border-gray-300 border rounded h-10 mt-1 px-2"
                        placeholder="Title / Position"
                        {...register(`owner.${index}.position`, {
                          required: true,
                        })}
                      />
                      {errors?.owner?.length > 0 &&
                        errors.owner[index]?.position && (
                          <p className="text-xs text-red-500 mt-1">
                            Title / Position is required
                          </p>
                        )}
                    </div>
                    <div className="flex flex-col w-full">
                      <label>
                        Ownership %:<span className="text-red-500">*</span>
                      </label>
                      <input
                        className="border-gray-300 border rounded h-10 mt-1 px-2"
                        placeholder="Enter Ownership"
                        {...register(`owner.${index}.ownership`, {
                          required: true,
                          min: 0,
                          max: 100
                        })}
                        type="number"
                        required
                      />
                      {errors?.owner?.length > 0 &&
                        errors.owner[index]?.ownership && (
                          <p className="text-xs text-red-500 mt-1">
                            Ownership should be from 0 to 100
                          </p>
                        )}
                    </div>
                  </div>
                  <div className="flex flex-row justify-evenly space-x-5 my-5">
                    <div className="flex flex-col w-full">
                      <label>
                        Home / Mobile Phone Number:
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="flex flex-row">
                        <select
                          className="border-gray-300 border rounded h-10 mt-1 px-2"
                          {...register(`owner.${index}.countryCode`, {
                            required: true,
                          })}
                        >
                          <option value="+1">+1</option>
                          <option value="+63">+63</option>
                        </select>
                        <Controller
                          name={`owner.${index}.phoneNumber`}
                          control={control}
                          rules={{ required: true }}
                          render={({
                            field: { onChange, onBlur, value, ref },
                          }) => (
                            <input
                              className="border-gray-300 border rounded h-10 mt-1 px-2"
                              ref={phoneNumberRef}
                              value={value}
                              placeholder="Phone Number"
                              onChange={onChange}
                            />
                          )}
                        />
                      </div>
                      {errors?.owner?.length > 0 &&
                        (errors.owner[index]?.countryCode ||
                          errors.owner[index]?.phoneNumber) && (
                          <p className="text-xs text-red-500 mt-1">
                            Input a valid phone number
                          </p>
                        )}
                    </div>
                    <div className="flex flex-col w-full">
                      <label>
                        Home Address:<span className="text-red-500">*</span>
                      </label>
                      <input
                        className="border-gray-300 border rounded h-10 mt-1 px-2"
                        placeholder="Home Address"
                        {...register(`owner.${index}.address`, {
                          required: true,
                        })}
                      />
                      {errors?.owner?.length > 0 &&
                        errors.owner[index]?.address && (
                          <p className="text-xs text-red-500 mt-1">
                            Home address is required
                          </p>
                        )}
                    </div>
                    <div className="flex flex-col w-full">
                      <label>
                        Country:<span className="text-red-500">*</span>
                      </label>
                      <select
                        disabled={isCheckboxCheck}
                        className="border-gray-300 border rounded h-10 mt-1 px-2"
                        {...register(`owner.${index}.country`, {
                          required: true,
                        })}
                      >
                        <option value="PH">Philippines</option>
                        <option value="US">US</option>
                      </select>
                      {errors?.owner?.length > 0 &&
                        errors.owner[index]?.country && (
                          <p className="text-xs text-red-500 mt-1">
                            Country is required
                          </p>
                        )}
                    </div>
                  </div>
                  <div className="flex flex-row justify-evenly space-x-5 my-5">
                    <div className="flex flex-col w-full">
                      <label>
                        State:<span className="text-red-500">*</span>
                      </label>
                      <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <select
                            key={index}
                            className="border-gray-300 border rounded h-10 mt-1 px-2"
                            onChange={onChange}
                            value={value}
                          >
                            <option value=""></option>
                            {handleStates(index)?.state.map((state, i) => {
                              return (
                                <option key={i} value={state.value}>
                                  {state.label}
                                </option>
                              );
                            })}
                          </select>
                        )}
                        name={`owner.${index}.state`}
                      />
                      {errors?.owner?.length > 0 &&
                        errors.owner[index]?.state && (
                          <p className="text-xs text-red-500 mt-1">
                            State is required
                          </p>
                        )}
                    </div>
                    <div className="flex flex-col w-full">
                      <label>
                        City:<span className="text-red-500">*</span>
                      </label>
                      <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <select
                            className="border-gray-300 border rounded h-10 mt-1 px-2"
                            onChange={onChange}
                            value={value}
                          >
                            <option value=""></option>
                            {handleCity(index)?.map((city, i) => {
                              return (
                                <option key={i} value={city.value}>
                                  {city.label}
                                </option>
                              );
                            })}
                          </select>
                        )}
                        name={`owner.${index}.city`}
                      />
                      {errors?.owner?.length > 0 &&
                        errors.owner[index]?.city && (
                          <p className="text-xs text-red-500 mt-1">
                            City is required
                          </p>
                        )}
                    </div>
                    <div className="flex flex-col w-full">
                      <label>
                        Zip Code:<span className="text-red-500">*</span>
                      </label>
                      <input
                        className="border-gray-300 border rounded h-10 mt-1 px-2"
                        placeholder="Enter Zip Code"
                        {...register(`owner.${index}.zipCode`, {
                          required: true,
                        })}
                      />
                      {errors?.owner?.length > 0 &&
                        errors.owner[index]?.zipCode && (
                          <p className="text-xs text-red-500 mt-1">
                            Zip code is required
                          </p>
                        )}
                    </div>
                  </div>
                  <div className="flex flex-row justify-evenly space-x-5 my-5">
                    <div className="flex flex-col w-full">
                      <label>
                        Social Security Number (SSN):
                        <span className="text-red-500">*</span>
                      </label>
                      <Controller
                        name={`owner.${index}.ssn`}
                        control={control}
                        rules={{ required: true }}
                        render={({
                          field: { onChange, onBlur, value, ref },
                        }) => (
                          <input
                            className="border-gray-300 border rounded h-10 mt-1 px-2"
                            ref={ssnRef}
                            value={value}
                            placeholder="Social Security Number (SSN)"
                            onChange={onChange}
                          />
                        )}
                      />
                      {errors?.owner?.length > 0 &&
                        errors.owner[index]?.ssn && (
                          <p className="text-xs text-red-500 mt-1">
                            Social Security number is required
                          </p>
                        )}
                    </div>
                    <div className="flex flex-col w-full">
                      <label>
                        Date of Birth:<span className="text-red-500">*</span>
                      </label>
                      <input
                        className="border-gray-300 border rounded h-10 mt-1 px-2"
                        placeholder="Select Birthday"
                        type="date"
                        {...register(`owner.${index}.birthday`, {
                          required: true,
                        })}
                      />
                      {errors?.owner?.length > 0 &&
                        errors.owner[index]?.birthday && (
                          <p className="text-xs text-red-500 mt-1">
                            Birthday is required
                          </p>
                        )}
                    </div>
                    <div className="flex flex-col w-full">
                      <label>
                        Email Address:<span className="text-red-500">*</span>
                      </label>
                      <input
                        className="border-gray-300 border rounded h-10 mt-1 px-2"
                        placeholder="Email"
                        type="email"
                        {...register(`owner.${index}.email`, {
                          required: true,
                        })}
                      />
                      {errors?.owner?.length > 0 &&
                        errors.owner[index]?.email && (
                          <p className="text-xs text-red-500 mt-1">
                            Email address is required
                          </p>
                        )}
                    </div>
                  </div>
                </div>
              ))}

              {fields.length < 4 && !isCheckboxCheck && (
                <button
                  className="bg-sky-800 rounded text-white w-fit px-4 py-2"
                  onClick={async () => {
                    const isValid = await trigger();
                    if (isValid) append();
                  }}
                >
                  Add New Owner
                </button>
              )}
              <div className="flex flex-row justify-between items-center sticky bottom-0 left-0 w-full bg-white p-5">
                <button
                  disabled={currentStep === "Ownership"}
                  className={`${
                    currentStep === "Ownership" ? "bg-gray-400" : "bg-sky-800"
                  } text-white rounded px-2 py-1`}
                >
                  Previous
                </button>
                {currentStep === "Review" ? (
                  <button className="bg-sky-800 text-white rounded px-2 py-1">
                    Submit
                  </button>
                ) : (
                  <button
                    className="bg-sky-800 text-white rounded px-2 py-1"
                    onClick={() => handleNext(currentStep)}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          ) : currentStep === "Document" ? (
            <Document />
          ) : (
            <Review />
          )}
        </form>
      ) : (
        <button
          onClick={handleModal}
          className="rounded bg-blue-500 text-white h-10 w-40"
        >
          Open Modal Form
        </button>
      )}
    </div>
  );
}
