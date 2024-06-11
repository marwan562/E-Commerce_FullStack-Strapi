import { CheckIcon, SmallCloseIcon } from "@chakra-ui/icons";
import {
  Box,
  FormHelperText,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { TInputsDataText } from "../data/inputsData";
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
} from "react-hook-form";
import { TdashboardProductsSchema } from "../validations/dashboardProducts";

interface TProps extends TInputsDataText {
  register: UseFormRegister<TdashboardProductsSchema>;
  errors: FieldErrors<TdashboardProductsSchema>;
  getValue: UseFormGetValues<TdashboardProductsSchema>;
}

const FormEditProduct = ({
  icon,
  name,
  type,
  placeholder,
  valueAsNumber,
  errors,
  register,
  getValue,
}: TProps) => {
  return (
    <Box mb={3}>
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
          {getValue(name)
            ? !errors[name] && <CheckIcon color="green.500" />
            : null}
          {errors[name] ? (
            <SmallCloseIcon boxSize={6} color={"red.500"} />
          ) : null}
        </InputRightElement>
      </InputGroup>
      {errors[name] && (
        <FormHelperText color={"red.400"}>
          {errors[name].message}
        </FormHelperText>
      )}
    </Box>
  );
};

export default FormEditProduct;
