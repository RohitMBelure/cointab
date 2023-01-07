import { Heading } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { PageOne } from "./PageOne";
import { PageTwo } from "./PageTwo";
export const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<PageOne />} />
      <Route path="/userdetail" element={<PageTwo />} />
      <Route
        path="*"
        element={
          <Heading
            textAlign={"center"}
            margin="5rem"
            color={"red"}
            fontStyle="italic"
          >
            PAGE NOT FOUND
          </Heading>
        }
      />
    </Routes>
  );
};
