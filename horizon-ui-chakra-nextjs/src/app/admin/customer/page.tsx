'use client';
import { useEffect, useState, useCallback } from 'react';
import { Flex, Box, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CompactTable from 'components/common/compact-table/CompactTable';
import { deleteCustomer, getByIdCustomer, getCustomer } from 'libs/endpoints/customer';

const Page = () => {
  const [Customers, setCustomers] = useState<{
    headers: Array<{ title: string; field: string }>;
    data?: Array<any>;
  }>();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const router = useRouter();

  const viewCustomerDetails = async (id: string) => {
    router.push(`/admin/customer/${id}`);
  };

  const handleOnEdit = async (id: string) => {
    await getByIdCustomer(id);
    router.push(`/admin/customer/update/${id}`);
  };

  const handleDelete = async (id: string) => {
    await deleteCustomer(id);
    loadData();
    router.push(`/admin/customer`);
  };

  const loadData = useCallback(() => {
    getCustomer().then((data: any) => {
      if (data) {
        setCustomers((prev) => ({
            headers: [
                { title: 'ID', field: 'id' },
                { title: 'Email', field: 'customerEmail' },
                { title: 'First Name', field: 'customerFirstName' },
                { title: 'Last Name', field: 'customerLastName' },
                { title: 'Phone Number', field: 'customerPhoneNumber' },
              ],
          data: data,
        }));
      } else {
        console.log('data not found');
      }
    });
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);
  return (
    <Card
      flexDirection="column"
      w="100%"
      px="0px"
      overflowX={{ sm: 'scroll', lg: 'hidden' }}
    >
      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          mb="4px"
          fontWeight="700"
          lineHeight="100%"
        >
          Customers
        </Text>
        <Menu />
      </Flex>
      <Box>
        <Link href="customer/add">
          <div style={{ textAlign: 'end', margin: '1px 20px' }}>
            <button
              type="button"
              style={{
                backgroundColor: 'blue' /* Green background */,
                border: 'none',
                color: 'white',
                padding: '10px 20px' /* Some padding */,
                textAlign: 'center',
                textDecoration: 'none',
                display: 'inline-block',
                fontSize: '16px',
                margin: '4px 2px',
                cursor: 'pointer',
                borderRadius: '5px' /* Rounded corners */,
              }}
            >
              Add new Customer{' '}
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>+</span>
            </button>
          </div>
        </Link>

        {Customers && (
          <CompactTable
            headers={Customers.headers}
            data={Customers.data}
            onDelete={handleDelete}
            onClick={viewCustomerDetails}
            onUpdate={handleOnEdit}
          />
        )}
      </Box>
    </Card>
  );
};

export default Page;
