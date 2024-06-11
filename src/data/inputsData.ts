import {
  MdOutlineDiscount,
  MdOutlineDriveFileRenameOutline,
} from "react-icons/md";
import { FaPersonHalfDress } from "react-icons/fa6";
import { IconType } from "react-icons";
import { FaDollarSign } from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";
import { TdashboardProductsSchema } from "../validations/dashboardProducts";

export type TInputsDataText = {
  placeholder: string;
  type: string;
  name: keyof TdashboardProductsSchema;
  icon: IconType;
  valueAsNumber?: boolean;
};

export const inputsDataText: TInputsDataText[] = [
  {
    type: "text",
    placeholder: "Enter Title...",
    icon: MdOutlineDriveFileRenameOutline,
    name: "title",
  },
  {
    type: "number",
    placeholder: "Enter Price . . .",
    icon: FaDollarSign,
    name: "price",
    valueAsNumber: true,
  },
  {
    type: "number",
    placeholder: "Enter Stock . . .",
    icon: AiOutlineStock,
    name: "stock",
    valueAsNumber: true,
  },
  {
    type: "number",
    placeholder: "Enter Discount . . .",
    icon: MdOutlineDiscount,
    name: "discountPercentage",
    valueAsNumber: true,
  },
  {
    type: "text",
    placeholder: "Enter Brand . . .",
    icon: FaPersonHalfDress,
    name: "brand",
  },
];
