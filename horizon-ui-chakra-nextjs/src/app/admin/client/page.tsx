'use client';
import { useEffect, useState, useCallback } from 'react';
import { Flex, Box, useColorModeValue, Text } from '@chakra-ui/react';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CompactTable from 'components/common/compact-table/CompactTable';
import { deleteClient, getClientById, getClient } from 'libs/endpoints/client';
const page = () => {
  const [clients, setClients] = useState<{
    headers: Array<{ title: string; field: string }>;
    data?: Array<any>;
  }>();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const router = useRouter();

  const viewclientDetails = async (id: string) => {
    router.push(`/admin/client/${id}`);
  };

  const handleOnEdit = async (id: string) => {
    await getClientById(id);
    router.push(`/admin/client/update/${id}`);
  };

  const handleDelete = async (id: string) => {
    await deleteClient(id);
    loadData();
    router.push(`/admin/client`);
  };

  const loadData = useCallback(() => {
    getClient().then((data: any) => {
      if (data) {
        setClients((prev) => ({
          headers: [
            { title: 'ID', field: 'id' },
            { title: 'Email', field: 'email' },
            { title: 'Name', field: 'name' },
            { title: 'Budget', field: 'budget' },
            { title: 'Preferences', field: 'preferences' }
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
          Clients
        </Text>
        <Menu />
      </Flex>
      <Box>
        <Link href="client/add">
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
              Add new Client{' '}
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>+</span>
            </button>
          </div>
        </Link>

        {clients && (
          <CompactTable
            headers={clients.headers}
            data={clients.data}
            onDelete={handleDelete}
            onClick={viewclientDetails}
            onUpdate={handleOnEdit}
          />
        )}
      </Box>
    </Card>
  );
};

export default page;