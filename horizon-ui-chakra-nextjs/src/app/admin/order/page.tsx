'use client';

import { useEffect, useState, useCallback } from 'react';
import { Flex, Box, Text, useColorModeValue, Button } from '@chakra-ui/react';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CompactTable from 'components/common/compact-table/CompactTable';
import { GetByIdOrder, GetOrder } from 'libs/endpoints/order';

const Page = () => {
  const [orders, setOrders] = useState<{
    headers: Array<{ title: string; field: string }>;
    data?: Array<any>;
  }>();
  const [status, setStatus] = useState<string>("Pending");
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const router = useRouter();

  const viewOrderDetails = async (id: string) => {
    router.push(`/admin/order/${id}`);
  };

  const handleOnEdit = async (id: string) => {
    await GetByIdOrder(id);
    router.push(`/admin/order/update/${id}`);
  };

  const handleDelete = async (id: string) => {
  };

  const loadData = useCallback(() => {
    GetOrder(status).then((data: any) => {
      if (data) {
        setOrders((prev) => ({
          headers: [
            { title: 'Order From', field: 'from' },
            { title: 'Order Status', field: 'orderStatus' },
            { title: 'Order Date', field: 'orderDate' },
            { title: 'Order Arrival Date', field: 'orderArrivalDate' }
          ],
          data: data,
        }));
      } else {
        console.log('data not found');
      }
    });
  }, [status]);

  const changeStatus = (status: string) => {
    setStatus(status);
    loadData();
  }

  useEffect(() => {
    loadData();
  }, [loadData]);
  
  return (
    <Box>
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
          Orders
        </Text>
        <Menu />
      </Flex>
      <Box>
        <Link href="order/add">
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
              Add new Order{' '}
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>+</span>
            </button>
          </div>
        </Link>
              <Button onClick={() => changeStatus("Pending")}>
                Pending
              </Button>
              <Button onClick={() => changeStatus("Cancelled")}>
                Cancelled
              </Button>
              <Button onClick={() => changeStatus("Approved")}>
                Approved
              </Button>
        {orders && (
          <CompactTable
            headers={orders.headers}
            data={orders.data}
            onDelete={handleDelete}
            onClick={viewOrderDetails}
            onUpdate={handleOnEdit}
          />
        )}
      </Box>
    </Card>
    </Box>
  );
};

export default Page;
