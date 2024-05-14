'use client';
import { useEffect, useState, useCallback } from 'react';
import { Flex, Box, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CompactTable from 'components/common/compact-table/CompactTable';
import { deleteCity, getByIdCity, getCity } from 'libs/endpoints/city';

const Page = () => {
  const [Citys, setCitys] = useState<{
    headers: Array<{ title: string; field: string }>;
    data?: Array<any>;
  }>();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const router = useRouter();

  const viewCityDetails = async (id: string) => {
    router.push(`/admin/city/${id}`);
  };

  const handleOnEdit = async (id: string) => {
    await getByIdCity(id);
    router.push(`/admin/city/update/${id}`);
  };

  const handleDelete = async (id: string) => {
    await deleteCity(id);
    loadData();
    router.push(`/admin/city`);
  };

  const loadData = useCallback(() => {
    getCity().then((data: any) => {
      if (data) {
        setCitys((prev) => ({
          headers: [
            { title: 'id', field: 'id' },
            {title: "Nama", field: "name"},
            {title: "ImageUrl", field: "image"}            
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
          Citys
        </Text>
        <Menu />
      </Flex>
      <Box>
        <Link href="city/add">
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
              Add new City{' '}
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>+</span>
            </button>
          </div>
        </Link>

        {Citys && (
          <CompactTable
            headers={Citys.headers}
            data={Citys.data}
            onDelete={handleDelete}
            onClick={viewCityDetails}
            onUpdate={handleOnEdit}
          />
        )}
      </Box>
    </Card>
  );
};

export default Page;
