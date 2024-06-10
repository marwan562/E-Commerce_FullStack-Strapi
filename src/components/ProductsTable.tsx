import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  ModalFooter,
  Select,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineEye } from "react-icons/ai";
import {
  useProductDashboardQuery,
  useRemoveProductMutation,
} from "../store/queries/productsDashboard";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import AlertDilog from "./Feedback/AlertDilog";
import { useState } from "react";
import ModalDashboard from "../shared/ModalDashboard";
import { CheckIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { inputsDataText } from "../data/inputsData";
import { useGetCategoriesQuery } from "../store/queries/categoriesApiQuery";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  dashboardProductsSchema,
  TdashboardProductsSchema,
} from "../validations/dashboardProducts";
import ProductTableSkeleton from "./ProductTableSkeleton";
import { IoImageOutline } from "react-icons/io5";

const tHeadTable: string[] = [
  "id",
  "title",
  "category",
  "image",
  "price",
  "stock",
  "actions",
];

const ProductsTable = () => {
  const toast = useToast();
  const [idRemoveItem, setIdRemoveItem] = useState<number>(0);
  const [fileName, setFileName] = useState("");
  const { data, isLoading: loadData } = useProductDashboardQuery(1);
  const { data: categoriesData } = useGetCategoriesQuery("categoriesApiQuery");
  const [removeProduct, { isLoading: loadRemove, error: errRemove }] =
    useRemoveProductMutation();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const {
    onOpen: onOpenEdit,
    isOpen: isOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  // form handler
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TdashboardProductsSchema>({
    resolver: zodResolver(dashboardProductsSchema),
  });

  const onSubmit: SubmitHandler<TdashboardProductsSchema> = (data) => {
    if (fileName) {
      console.log("File", fileName);
      console.log(data);
    }
  };

  if (loadData) return <ProductTableSkeleton />;
  //Remove item handler
  const openRemoveItemHanlder = (id: number) => {
    setIdRemoveItem(id);
    onOpen();
  };

  const removeItemFromProduct = () => {
    removeProduct(idRemoveItem)
      .unwrap()
      .then(() => {
        toast({
          title: "Removed successfully.",
          description: "We've removed your product for you.",
          status: "success",
          position: "top-right",
          duration: 3000,
          isClosable: true,
        });
        onClose();
      })
      .catch(() => {
        toast({
          title: "Error: With Removed try again.",
          description: `${errRemove}`,
          status: "error",
          position: "top-right",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLElement>) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file);
    }
  };

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              {tHeadTable.map((head, inx) => (
                <Th key={inx}>{head} </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data?.data.map(
              (
                {
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
                },
                inx
              ) => {
                return (
                  <>
                    <Tr key={id}>
                      <Td>{++inx}</Td>
                      <Td>{title}</Td>
                      <Td>{category.data.attributes.category}</Td>
                      <Td>
                        <Image
                          src={`${import.meta.env.VITE_SERVER_URL}${
                            image.data.attributes.url
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
                            setValue(
                              "category",
                              category.data.attributes.category
                            );
                            setValue("discountPercentage", discountPercentage);
                            onOpenEdit();
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
              }
            )}
          </Tbody>
          <Tfoot>
            <Tr>
              {tHeadTable.map((head, inx) => (
                <Th key={inx}>{head} </Th>
              ))}
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>

      {/* Remove item */}
      <AlertDilog
        isOpen={isOpen}
        onClose={onClose}
        headerDilog="Are you sure..? "
        bodyDilog="you w'll delete product and can't get this again. "
      >
        <Button
          isLoading={loadRemove}
          loadingText={"Removeing..."}
          onClick={removeItemFromProduct}
          variant={"outline"}
          colorScheme="red"
        >
          Remove
        </Button>
      </AlertDilog>

      {/* Modal edit product */}
      <ModalDashboard
        isOpen={isOpenEdit}
        title="Edit product"
        onClose={() => {
          onCloseEdit();
          setFileName("");
        }}
      >
        <FormControl as={"form"} onSubmit={handleSubmit(onSubmit)}>
          {inputsDataText.map(
            ({ icon, name, type, placeholder, valueAsNumber }, inx) => (
              <Box mb={3} key={inx}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                  >
                    <Icon as={icon} />
                  </InputLeftElement>
                  <Input
                    isInvalid={errors[name] ? true : false}
                    {...register(name, { valueAsNumber })}
                    type={type}
                    placeholder={placeholder}
                    color={errors[name] && "tomato"}
                    _placeholder={{ opacity: 0.6, color: "inherit" }}
                  />

                  <InputRightElement>
                    {watch([name]) && !errors[name] && (
                      <CheckIcon color="green.500" />
                    )}
                    {errors[name] && (
                      <SmallCloseIcon boxSize={6} color={"red.500"} />
                    )}
                  </InputRightElement>
                </InputGroup>
                {errors[name] && (
                  <FormHelperText color={"red.400"}>
                    {errors[name].message}
                  </FormHelperText>
                )}
              </Box>
            )
          )}
          {/* update file image */}

          <InputGroup mb={3}>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
            >
              <Icon as={IoImageOutline} />
            </InputLeftElement>
            <Input
              onChange={handleFileChange}
              type={"file"}
              placeholder={"Select Image File . . ."}
            />
            <InputRightElement>
              {fileName && <CheckIcon color="green.500" />}
              {!fileName && <SmallCloseIcon boxSize={6} color={"red.500"} />}
            </InputRightElement>
          </InputGroup>

          {/* select categories */}
          <Select {...register("category")} mb={3} variant="outline">
            <option disabled>Categories</option>
            {categoriesData?.data.map(({ id, attributes }) => (
              <option key={id} value={attributes.category}>
                {attributes.category}
              </option>
            ))}
          </Select>
          <Textarea
            isInvalid={errors["description"] ? true : false}
            {...register("description")}
            placeholder="Here is a sample placeholder"
          />
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button type="submit" colorScheme="blue" variant="outline">
              Edit
            </Button>
          </ModalFooter>
        </FormControl>
      </ModalDashboard>
    </>
  );
};

export default ProductsTable;
