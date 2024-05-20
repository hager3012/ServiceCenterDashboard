'use client';
import { useEffect, useState, useCallback } from 'react';
import { Flex, Box, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CompactTable from 'components/common/compact-table/CompactTable';
import { deleteSales, getByIdSales, getSales } from 'libs/endpoints/sales';

const Page = () => {
  const [Saless, setSaless] = useState<{
    headers: Array<{ title: string; field: string }>;
    data?: Array<any>;
  }>();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const router = useRouter();

  const viewSalesDetails = async (id: string) => {
    router.push(`/admin/sales/${id}`);
  };

  const handleOnEdit = async (id: string) => {
    await getByIdSales(id);
    router.push(`/admin/sales/update/${id}`);
  };

  const handleDelete = async (id: string) => {
    await deleteSales(id);
    loadData();
    router.push(`/admin/sales`);
  };

  const loadData = useCallback(() => {
    getSales().then((data: any) => {
      if (data) {
        setSaless((prev) => ({
            headers: [
                { title: 'ID', field: 'id' },
                { title: 'Email', field: 'salesEmail' },
                { title: 'First Name', field: 'salesFirstName' },
                { title: 'Last Name', field: 'salesLastName' },
                { title: 'Phone Number', field: 'salesPhoneNumber' },
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
          Saless
        </Text>
        <Menu />
      </Flex>
      <Box>
        <Link href="sales/add">
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
              Add new Sales{' '}
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>+</span>
            </button>
          </div>
        </Link>

        {Saless && (
          <CompactTable
            headers={Saless.headers}
            data={Saless.data}
            onDelete={handleDelete}
            onClick={viewSalesDetails}
            onUpdate={handleOnEdit}
          />
        )}
      </Box>
    </Card>
  );
};

export default Page;
