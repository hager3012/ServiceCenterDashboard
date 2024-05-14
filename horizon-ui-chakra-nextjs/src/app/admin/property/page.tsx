'use client';
import { useEffect, useState, useCallback } from 'react';
import { Flex, Box, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CompactTable from 'components/common/compact-table/CompactTable';
import { deleteProperty, getByIdProperty, getProperty } from 'libs/endpoints/property';

const Page = () => {
  const [Propertys, setPropertys] = useState<{
    headers: Array<{ title: string; field: string }>;
    data?: Array<any>;
  }>();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const router = useRouter();

  const viewPropertyDetails = async (id: string) => {
    router.push(`/admin/property/${id}`);
  };

  const handleOnEdit = async (id: string) => {
    await getByIdProperty(id);
    router.push(`/admin/property/update/${id}`);
  };

  const handleDelete = async (id: string) => {
    await deleteProperty(id);
    loadData();
    router.push(`/admin/property`);
  };

  const loadData = useCallback(() => {
    getProperty().then((data: any) => {
      if (data) {
        setPropertys((prev) => ({
          headers: [
            {title: 'id', field: 'id' },
            {title: "Name", field: "name"},
            {title: "Type", field: "typr"},
            {title: "Size", field: "size"},
            {title: "Price", field: "price"},
            {title: "Address", field: "address"}       
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
          Propertys
        </Text>
        <Menu />
      </Flex>
      <Box>
        <Link href="property/add">
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
              Add new Property{' '}
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>+</span>
            </button>
          </div>
        </Link>

        {Propertys && (
          <CompactTable
            headers={Propertys.headers}
            data={Propertys.data}
            onDelete={handleDelete}
            onClick={viewPropertyDetails}
            onUpdate={handleOnEdit}
          />
        )}
      </Box>
    </Card>
  );
};

export default Page;
