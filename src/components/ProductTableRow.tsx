import { Button, Image as ImageChakra, Td, Tr } from "@chakra-ui/react";
import { IProductTypes } from "../interfaces";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { UseFormSetValue } from "react-hook-form";
import { TdashboardProductsSchema } from "../validations/dashboardProducts";

interface TProps extends IProductTypes {
  openRemoveItemHanlder: (id: number) => void;
  openUpdateItemHanlder: (id: number) => void;
  setValue: UseFormSetValue<TdashboardProductsSchema>;
  onOpenEdit: () => void;
}

const ProductTableRow = ({
  id,
  attributes: {
    title,
    category,
    brand,
    description,
    discountPercentage,
    image,
    price,
    stock,
  },

  openUpdateItemHanlder,
  openRemoveItemHanlder,
  setValue,
}: TProps) => {
  return (
    <>
      <Tr key={id}>
        <Td>{id}</Td>
        <Td>{title}</Td>
        <Td>{category?.data?.attributes?.category}</Td>
        <Td>
          <ImageChakra
            src={`${import.meta.env.VITE_SERVER_URL}${
              image?.data?.attributes?.url
            }`}
            alt={title}
            borderRadius={"full"}
            objectFit={"cover"}
            boxSize={"40px"}
          />
        </Td>
        <Td>${price}</Td>
        <Td>{stock}</Td>
        <Td>
          <Button
            as={Link}
            to={`/products/${id}`}
            title="Show-item"
            mr={3}
            colorScheme={"purple"}
          >
            <AiOutlineEye size={17} />
          </Button>
          <Button
            onClick={() => openRemoveItemHanlder(id)}
            mr={3}
            title="Remove-item"
            colorScheme={"red"}
          >
            <MdOutlineDelete size={17} />
          </Button>
          <Button
            onClick={() => {
              setValue("title", title);
              setValue("price", price);
              setValue("stock", stock);
              setValue("brand", brand);
              setValue("description", description);
              setValue("category", String(category?.data?.id));
              setValue("discountPercentage", discountPercentage);
              openUpdateItemHanlder(id);
            }}
            mr={3}
            title="Edit-item"
            colorScheme={"blue"}
          >
            <MdOutlineEdit size={17} />
          </Button>
        </Td>
      </Tr>
    </>
  );
};

export default ProductTableRow;
