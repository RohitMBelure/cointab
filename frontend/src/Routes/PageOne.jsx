import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUsers, getUsers } from "../Redux/action";
import React from "react";

export const PageOne = () => {
  const { isLoading } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();

  const handleFetchUsers = () => {
    if (isLoading) {
      toast({
        title: "Error",
        description: `Please wait until the first fetch complete`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } else {
      dispatch(getUsers()).then((res) => {
        toast({
          title: "Successful",
          description: `${res.message}`,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
    }
  };
  const handleDeleteUsers = (onClose) => {
    onClose();
    dispatch(deleteUsers()).then((res) => {
      toast({
        title: "Deleted",
        description: `${res.message}`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    });
  };

  return (
    <div>
      <Box display={"flex"} justifyContent="space-evenly" alignItems={"center"}>
        <Button colorScheme="blue" onClick={handleFetchUsers}>
          Fetch Users
        </Button>
        <Button colorScheme="blue" onClick={onOpen}>
          Delete Users
        </Button>

        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Users
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => handleDeleteUsers(onClose)}
                  // onClick={onClose}
                  ml={3}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

        <Link to="/userdetail">
          <Button colorScheme="blue">User Details</Button>
        </Link>
      </Box>
    </div>
  );
};
