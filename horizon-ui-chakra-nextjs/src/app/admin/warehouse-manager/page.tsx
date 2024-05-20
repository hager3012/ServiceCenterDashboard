'use client';
import { useEffect, useState, useCallback } from 'react';
import { Flex, Box, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CompactTable from 'components/common/compact-table/CompactTable';
import { deleteWareHouseManager, getByIdWareHouseManager, getWareHouseManager } from 'libs/endpoints/wareHouseManager';

const Page = () => {
  const [WareHouseManagers, setWareHouseManagers] = useState<{
    headers: Array<{ title: string; field: string }>;
    data?: Array<any>;
  }>();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const router = useRouter();

  const viewWareHouseManagerDetails = async (id: string) => {
    router.push(`/admin/warehouse-manager/${id}`);
  };

  const handleOnEdit = async (id: string) => {
    await getByIdWareHouseManager(id);
    router.push(`/admin/warehouse-manager/update/${id}`);
  };

  const handleDelete = async (id: string) => {
    await deleteWareHouseManager(id);
    loadData();
    router.push(`/admin/warehouse-manager`);
  };

  const loadData = useCallback(() => {
    getWareHouseManager().then((data: any) => {
      if (data) {
        setWareHouseManagers((prev) => ({
            headers: [
                { title: 'ID', field: 'id' },
                { title: 'Email', field: 'wareHouseManagerEmail' },
                { title: 'First Name', field: 'wareHouseManagerFirstName' },
                { title: 'Last Name', field: 'wareHouseManagerLastName' },
                { title: 'Phone Number', field: 'wareHouseManagerPhoneNumber' },
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
          WareHouseManagers
        </Text>
        <Menu />
      </Flex>
      <Box>
        <Link href="warehouse-manager/add">
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
              Add new WareHouseManager{' '}
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>+</span>
            </button>
          </div>
        </Link>

        {WareHouseManagers && (
          <CompactTable
            headers={WareHouseManagers.headers}
            data={WareHouseManagers.data}
            onDelete={handleDelete}
            onClick={viewWareHouseManagerDetails}
            onUpdate={handleOnEdit}
          />
        )}
      </Box>
    </Card>
  );
};

export default Page;
