import { Button, Icon, Stack } from "@chakra-ui/react";
import { useAppDispatch } from "../store";
import { getPage, lastPage, nextPage } from "../store/reducer/paginationSlice";
import { PiGreaterThan, PiLessThan } from "react-icons/pi";

export const renderButtonsPagination = ({
  currentPage,
  totalPages,
  loadData,
}: {
  currentPage: number;
  totalPages: number 
  loadData: boolean
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useAppDispatch();

  const handleClick = (page: number) => {
    dispatch(getPage(page));
  };

  const renderPageButton = (page: number) => (
    <Button
      key={page}
      onClick={() => handleClick(page)}
      title={`Page-${page}`}
      boxSize={"10"}
      isLoading={currentPage === page && loadData ? true : false}
      disabled={currentPage === page ? true : false}
      cursor={currentPage === page ? "not-allowed" : "pointer"}
      colorScheme={currentPage === page ? "green" : "gray"}
      borderRadius={"100%"}
    >
      {page}
    </Button>
  );

  const renderEllipsis = (key: "start" | "end") => (
    <Button key={key} title={`Alot-Pages`} boxSize={"10"} borderRadius={"100%"}>
      ...
    </Button>
  );

  const buttons = [];

  if (totalPages <= 6) {
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(renderPageButton(i));
    }
  } else {
    buttons.push(renderPageButton(1));

    if (currentPage > 3) {
      buttons.push(renderEllipsis("start"));
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(renderPageButton(i));
    }

    if (currentPage < totalPages - 2) {
      buttons.push(renderEllipsis("end"));
    }

    buttons.push(renderPageButton(totalPages));
  }

  return (
    <Stack direction="row" spacing={2}>
      {currentPage > 1 && (
        <Button
          boxSize={"10"}
          title="Last-Page"
          borderRadius={"100%"}
          onClick={() => dispatch(lastPage())}
        >
          <Icon as={PiLessThan} />
        </Button>
      )}
      {buttons}
      {currentPage < totalPages && (
        <Button
          onClick={() => dispatch(nextPage())}
          title="Next-Page"
          boxSize={"10"}
          borderRadius={"100%"}
        >
          <Icon as={PiGreaterThan} />
        </Button>
      )}
    </Stack>
  );
};

export default renderButtonsPagination;
