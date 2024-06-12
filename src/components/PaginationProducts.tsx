import {  Select } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../store";
import { getCreatedAt, getPageSize } from "../store/reducer/paginationSlice";
import { ReactNode } from "react";

const PaginationProducts = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { created_At, pageSize } = useAppSelector((state) => state.pagination);

  return (
    <>
      <Select
        value={created_At}
        onChange={(e) => dispatch(getCreatedAt(e.target.value))}
        textAlign={"center"}
        textColor={"white"}
        bg={"green.400"}
        w={20}
      >
        <option disabled>Date Products</option>

        <option style={{ color: "black" }} value={"desc"}>
          lastest
        </option>
        <option style={{ color: "black" }} value={"asc"}>
          oldest
        </option>
      </Select>
      <Select
        value={pageSize}
        onChange={(e) => dispatch(getPageSize(e.target.value))}
        textAlign={"center"}
        textColor={"white"}
        bg={"green.400"}
        w={20}
      >
        <option disabled>Size Products</option>
        <option style={{ color: "black" }} value={10}>
          10
        </option>
        <option style={{ color: "black" }} value={20}>
          20
        </option>
        <option style={{ color: "black" }} value={40}>
          40
        </option>
        <option style={{ color: "black" }} value={60}>
          60
        </option>
        <option style={{ color: "black" }} value={100}>
          100
        </option>
      </Select>
      {/* Render Buttons pages */}
      {children}
    </>
  );
};

export default PaginationProducts;
