import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Icon,
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
  Text,
  Textarea,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  useCreateProductMutation,
  useProductDashboardQuery,
  useRemoveProductMutation,
  useUpdateProductMutation,
} from "../store/queries/productsDashboard";
import AlertDilog from "./Feedback/AlertDilog";
import { useEffect, useState } from "react";
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
import { VscGitPullRequestCreate } from "react-icons/vsc";
import ProductTableSkeleton from "./ProductTableSkeleton";
import { IoImageOutline } from "react-icons/io5";
import ProductTableRow from "./ProductTableRow";
import FormEditProduct from "./FormEditProduct";
import { useAppDispatch, useAppSelector } from "../store";
import { cleanPage } from "../store/reducer/paginationSlice";
import renderButtonsPagination from "./renderButtonsPagination";
import PaginationProducts from "./PaginationProducts";

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
  const dispatch = useAppDispatch();
  const [fileName, setFileName] = useState("");
  const [idRemoveItem, setIdRemoveItem] = useState<number>(0);
  const { network } = useAppSelector((state) => state.network);
  const { page, pageSize, created_At } = useAppSelector(
    (state) => state.pagination
  );

  const { onOpen, isOpen, onClose } = useDisclosure();
  const {
    onOpen: onOpenEdit,
    isOpen: isOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const {
    onOpen: onOpenCreate,
    isOpen: isOpenCreate,
    onClose: onCloseCreate,
  } = useDisclosure();

  //RTK Queries
  const { data, isLoading: loadData } = useProductDashboardQuery({
    page,
    pageSize,
    created_At,
  });
  const { data: categoriesData } = useGetCategoriesQuery("categoriesApiQuery");
  const [removeProduct, { isLoading: loadRemove, error: errRemove }] =
    useRemoveProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();

  // React Hook Form To Edit Prodduct handler
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<TdashboardProductsSchema>({
    resolver: zodResolver(dashboardProductsSchema),
  });

  const onSubmit: SubmitHandler<TdashboardProductsSchema> = (data) => {
    if (fileName) {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("category.category", data.category);
      formData.append("files.image", fileName);
      updateProduct({ id: idRemoveItem, body: formData })
        .unwrap()
        .then(() => {
          onCloseEdit();
          toast({
            title: "Updating successfully.",
            description: "We are updating the Product .",
            status: "success",
            position: "top-right",
            duration: 3000,
            isClosable: true,
          });
          onClose();
        })
        .catch(() => {
          toast({
            title: "Error: With Updating try again.",
            description: `${errRemove}`,
            status: "error",
            position: "top-right",
            duration: 3000,
            isClosable: true,
          });
        });
    }
  };

  // React Hook Form To Edit Prodduct handler
  const {
    register: registerToCreate,
    handleSubmit: handleSubmitToCreate,
    getValues: getValuesCreate,
    reset,
    setError,
    formState: { errors: errorsToCreate },
  } = useForm<TdashboardProductsSchema>({
    resolver: zodResolver(dashboardProductsSchema),
  });

  const onSubmitToCreate: SubmitHandler<TdashboardProductsSchema> = (data) => {
    if (fileName) {
      console.log(data);
      console.log("file", fileName);

      const formData = new FormData();

      formData.append("data", JSON.stringify(data));
      formData.append("category.category", JSON.stringify(data.category));
      formData.append("files.image", fileName);

      createProduct(formData)
        .unwrap()
        .then(() => {
          onCloseCreate();
          reset();
          toast({
            title: "Creating successfully.",
            description: "We are Create new Product .",
            status: "success",
            position: "top-right",
            duration: 3000,
            isClosable: true,
          });
          onClose();
        })
        .catch(() => {
          toast({
            title: "Error: With Creating try again.",
            // description: `${errRemove}`,
            status: "error",
            position: "top-right",
            duration: 3000,
            isClosable: true,
          });
        });
    }
  };

  //Remove item handler
  const openRemoveItemHanlder = (id: number) => {
    setIdRemoveItem(id);
    onOpen();
  };
  //Update item handler
  const openUpdateItemHanlder = (id: number) => {
    setIdRemoveItem(id);
    onOpenEdit();
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

  const handleFileChange = (e: React.ChangeEvent) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file);
    }
  };

  //renders

  const rederTHeadTable = tHeadTable.map((head, inx) => (
    <Th key={inx}>{head} </Th>
  ));

  useEffect(() => {
    return () => {
      dispatch(cleanPage());
    };
  }, [dispatch]);

  return (
    <Flex direction={"column"}>
      {/* Add Product */}
      <Flex>
        <Button
          onClick={onOpenCreate}
          colorScheme="green"
          mb={2}
          mx={4}
          ml={"auto"}
        >
          <Text mr={2}> Create Product</Text>
          <Icon as={VscGitPullRequestCreate} />
        </Button>
      </Flex>
      {/* Table Products */}
      <TableContainer>
        <Table variant="simple">
          <TableCaption>
            Total Products: {data?.meta.pagination.total}
          </TableCaption>
          <Thead>
            <Tr>{network && rederTHeadTable}</Tr>
          </Thead>
          {loadData || (!network && <ProductTableSkeleton />)}
          <Tbody>
            {network && !loadData && (data?.data?.length ?? 0) > 0 ? (
              data?.data?.map((el, inx) => (
                <ProductTableRow
                  key={inx}
                  onOpenEdit={onOpenEdit}
                  openUpdateItemHanlder={openUpdateItemHanlder}
                  openRemoveItemHanlder={openRemoveItemHanlder}
                  setValue={setValue}
                  {...el}
                />
              ))
            ) : !network && !loadData ? null : (
              <Text>No Products</Text>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      {/* Pagination */}
      <Flex mr={12} gap={2} justifyContent={"space-around"}>
        <PaginationProducts>
          {renderButtonsPagination({
            currentPage: page,
            loadData,
            totalPages: data?.meta?.pagination?.pageCount ?? 1,
          })}
        </PaginationProducts>
      </Flex>

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

      {/* Modal Create product */}
      <ModalDashboard
        onClose={() => {
          onCloseCreate();
          setError("root", { message: "" });
          setFileName("");
        }}
        isOpen={isOpenCreate}
        title="Create Product"
      >
        <FormControl
          as={"form"}
          onSubmit={handleSubmitToCreate(onSubmitToCreate)}
        >
          {inputsDataText.map((el, inx) => (
            <FormEditProduct
              register={registerToCreate}
              errors={errorsToCreate}
              getValue={getValuesCreate}
              key={inx}
              {...el}
            />
          ))}

          {/* upload file image */}

          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
            >
              <Icon as={IoImageOutline} />
            </InputLeftElement>
            <Input
              isInvalid={errorsToCreate && !fileName}
              onChange={handleFileChange}
              type={"file"}
              placeholder={"Select Image File . . ."}
            />
            <InputRightElement>
              {fileName && <CheckIcon color="green.500" />}
              {!fileName && <SmallCloseIcon boxSize={6} color={"red.500"} />}
            </InputRightElement>
          </InputGroup>
          {!fileName && (
            <FormHelperText mb={3} color={"red.400"}>
              File image required.
            </FormHelperText>
          )}

          {/* select categories */}
          <Select {...registerToCreate("category")} mb={3} variant="outline">
            <option disabled>Categories</option>
            {categoriesData?.data.map(({ id, attributes }) => (
              <option key={id} value={id}>
                {attributes?.category}
              </option>
            ))}
          </Select>
          <Textarea
            isInvalid={errorsToCreate["description"] ? true : false}
            {...registerToCreate("description")}
            placeholder="Enter Description..."
          />
          <FormHelperText color={"red.400"}>
            {errorsToCreate["description"]?.message}
          </FormHelperText>
          <ModalFooter>
            <Button
              mr={3}
              onClick={() => {
                onCloseCreate();
                setFileName("");
              }}
            >
              Close
            </Button>
            <Button
              isLoading={isCreating}
              loadingText={"Creating..."}
              type="submit"
              colorScheme="green"
              variant="outline"
            >
              Creating
            </Button>
          </ModalFooter>
        </FormControl>
      </ModalDashboard>
      {/* Modal edit product */}
      <ModalDashboard
        onClose={() => {
          onCloseEdit();
          setFileName("");
          setError("root", { message: "" });
        }}
        isOpen={isOpenEdit}
        title="Edit product"
      >
        <FormControl as={"form"} onSubmit={handleSubmit(onSubmit)}>
          {inputsDataText.map((el, inx) => (
            <FormEditProduct
              register={register}
              errors={errors}
              getValue={getValues}
              key={inx}
              {...el}
            />
          ))}

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
              <option key={id} value={id}>
                {attributes?.category}
              </option>
            ))}
          </Select>
          <Textarea
            isInvalid={errors["description"] ? true : false}
            {...register("description")}
            placeholder="Here is a sample placeholder"
          />
          <ModalFooter>
            <Button
              mr={3}
              onClick={() => {
                onCloseEdit();
                setFileName("");
              }}
            >
              Close
            </Button>
            <Button
              isLoading={isUpdating}
              loadingText={"Update"}
              type="submit"
              colorScheme="blue"
              variant="outline"
            >
              Edit
            </Button>
          </ModalFooter>
        </FormControl>
      </ModalDashboard>
    </Flex>
  );
};

export default ProductsTable;
