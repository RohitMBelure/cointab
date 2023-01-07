import { Box, Button } from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";

export const Pagination = ({ currentPage, totalPage, onChange }) => {
  const pages = new Array(totalPage).fill(0).map((e, i) => {
    return (
      <Button
        margin="0px 1px"
        style={{
          backgroundColor: currentPage === i + 1 ? "blue" : "",
          color: currentPage === i + 1 ? "white" : "",
        }}
        key={i}
        onClick={() => onChange(i + 1)}
      >
        {i + 1}
      </Button>
    );
  });
  return (
    <Box margin="2rem 0rem">
      <Button
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <ChevronLeftIcon />
      </Button>
      {pages}
      <Button
        disabled={currentPage >= totalPage}
        onClick={() => onChange(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
    </Box>
  );
};
