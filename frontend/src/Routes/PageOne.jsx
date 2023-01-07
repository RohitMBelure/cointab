import { Box, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUsers, getUsers } from "../Redux/action";

export const PageOne = () => {
  const { isLoading } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleFetchUsers = () => {
    if (isLoading) {
      alert("Error: Please wait until the first fetch complete");
    } else {
      dispatch(getUsers()).then((res) => {
        alert(res.message);
      });
    }
  };
  const handleDeleteUsers = () => {
    alert("Alert: This will delete all your data");
    dispatch(deleteUsers()).then((res) => {
      alert(res.message);
    });
  };

  return (
    <div>
      <Box display={"flex"} justifyContent="space-evenly" alignItems={"center"}>
        <Button colorScheme="blue" onClick={handleFetchUsers}>
          Fetch Users
        </Button>
        <Button colorScheme="blue" onClick={handleDeleteUsers}>
          Delete Users
        </Button>
        <Link to="/userdetail">
          <Button colorScheme="blue">User Details</Button>
        </Link>
      </Box>
    </div>
  );
};
