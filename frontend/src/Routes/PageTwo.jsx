import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Image,
  Box,
  Button,
  Select,
} from "@chakra-ui/react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Pagination } from "../Components/Pagination";
import { getUsers } from "../Redux/action";
import { useState } from "react";
import { useEffect } from "react";
import load from "../Assests/loading.gif";

export const PageTwo = () => {
  const { usersData, currentPage, totalPages, isLoading } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilterBy = searchParams.getAll("gender");
  const initialPage = searchParams.getAll("_page");
  const initialLimit = searchParams.getAll("_limit")[0] || 10;
  const location = useLocation();
  const [page, setPage] = useState(initialPage[0] || 1);
  const [filterByGender, setFilterByGender] = useState(
    initialFilterBy[0] || ""
  );

  useEffect(() => {
    if (location || page || filterByGender) {
      let payload = {
        params: {
          _page: page,
          _limit: initialLimit,
          gender: filterByGender,
        },
      };
      dispatch(getUsers(payload));
    }
  }, [location.search, page, filterByGender]);

  useEffect(() => {
    if (filterByGender || page) {
      let params = {};
      page && (params._page = page);
      page && (params._limit = initialLimit);
      filterByGender && (params.gender = filterByGender);
      setSearchParams(params);
    }
  }, [filterByGender, page]);

  const handlePagination = (changePage) => {
    setPage(changePage);
  };

  const handleFilter = (value) => {
    setFilterByGender(value);
  };

  return (
    <>
      {isLoading ? (
        <Box
          as="span"
          display="flex"
          justifyContent={"center"}
          alignItems="center"
          width={"100%"}
          height="100vh"
        >
          <Image src={load} />
        </Box>
      ) : (
        <div>
          <Box
            display={"flex"}
            justifyContent="space-between"
            alignItems={"center"}
            margin="1rem 0rem 2rem 0rem"
          >
            <Link to="/">
              <Button colorScheme="blue">GO BACK</Button>
            </Link>
            <Select
              placeholder="FILTER BY GENDER"
              width="15rem"
              defaultValue={filterByGender}
              fontWeight={"700"}
              onChange={(e) => handleFilter(e.target.value)}
            >
              <option value="male">MALE</option>
              <option value="female">FEMALE</option>
            </Select>
          </Box>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th fontSize={"20px"}>PROFILE</Th>
                  <Th fontSize={"20px"}>NAME</Th>
                  <Th fontSize={"20px"}>AGE</Th>
                  <Th fontSize={"20px"}>GENDER</Th>
                  <Th fontSize={"20px"}>EMAIL</Th>
                  <Th fontSize={"20px"}>PHONE</Th>
                  <Th fontSize={"20px"}>COUNTRY</Th>
                </Tr>
              </Thead>
              <Tbody>
                {usersData?.map((element, index) => (
                  <Tr key={index}>
                    <Td>
                      <Image src={`${element.picture.large}`} />
                    </Td>
                    <Td>{`${element.name.title}. ${element.name.first} ${element.name.last}`}</Td>
                    <Td>{`${element.dob.age} Yrs.`}</Td>
                    <Td>{`${element.gender}`}</Td>
                    <Td>{`${element.email}`}</Td>
                    <Td>{`${element.phone}`}</Td>
                    <Td>{`${element.location.country}`}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Box>
            <Pagination
              currentPage={+currentPage}
              totalPage={totalPages}
              onChange={handlePagination}
            />
          </Box>
        </div>
      )}
    </>
  );
};
