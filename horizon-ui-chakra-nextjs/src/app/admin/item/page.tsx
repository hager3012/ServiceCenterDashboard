'use client';

import { useEffect, useState, useCallback } from 'react';
import { Flex, Box, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CompactTable from 'components/common/compact-table/CompactTable';
import { DeleteItem, GetByIdItem, GetItem } from 'libs/endpoints/item';

const page = () => {
  const [items, setItems] = useState<{
    headers: Array<{ title: string; field: string }>;
    data?: Array<any>;
  }>();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const router = useRouter();

  const viewItemsDetails = async (id: string) => {
    router.push(`/admin/item/${id}`);
  };

  const handleOnEdit = async (id: string) => {
    await GetByIdItem(id);
    router.push(`/admin/item/update/${id}`);
  };

  const handleDelete = async (id: string) => {
    await DeleteItem(id);
    loadData();
    router.push(`/admin/item`);
  };

  const loadData = useCallback(() => {
    GetItem().then((data: any) => {
      if (data) {
        setItems((prev) => ({
          headers: [
            { title: 'Item Name', field: 'itemName' },
            { title: 'Item Description', field: 'itemDescription' },
            { title: 'Item Stock', field: 'itemStock' },
            { title: 'Item Price', field: 'itemPrice' }
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
          Items
        </Text>
        <Menu />
      </Flex>
      <Box>
        <Link href="item/add">
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
              Add new Item{' '}
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>+</span>
            </button>
          </div>
        </Link>

        {items && (
          <CompactTable
            headers={items.headers}
            data={items.data}
            onDelete={handleDelete}
            onClick={viewItemsDetails}
            onUpdate={handleOnEdit}
          />
        )}
      </Box>
    </Card>
  );
};

export default page;
