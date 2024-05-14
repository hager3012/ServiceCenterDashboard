'use client';
import { useEffect, useState, useCallback } from 'react';
import { Flex, Box, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CompactTable from 'components/common/compact-table/CompactTable';
import { deleteDeveloper, getByIdDeveloper, getDeveloper } from 'libs/endpoints/developer';

const Page = () => {
  const [Developers, setDevelopers] = useState<{
    headers: Array<{ title: string; field: string }>;
    data?: Array<any>;
  }>();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const router = useRouter();

  const viewDeveloperDetails = async (id: string) => {
    router.push(`/admin/developer/${id}`);
  };

  const handleOnEdit = async (id: string) => {
    await getByIdDeveloper(id);
    router.push(`/admin/developer/update/${id}`);
  };

  const handleDelete = async (id: string) => {
    await deleteDeveloper(id);
    loadData();
    router.push(`/admin/developer`);
  };

  const loadData = useCallback(() => {
    getDeveloper().then((data: any) => {
      if (data) {
        setDevelopers((prev) => ({
          headers: [
            { title: 'id', field: 'id' },
            {title: "Nama", field: "name"},
            {title: "Description", field: "description"},
            {title: "Logo Url", field: "logoUrl"}            
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
          Developers
        </Text>
        <Menu />
      </Flex>
      <Box>
        <Link href="developer/add">
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
              Add new Developer{' '}
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>+</span>
            </button>
          </div>
        </Link>

        {Developers && (
          <CompactTable
            headers={Developers.headers}
            data={Developers.data}
            onDelete={handleDelete}
            onClick={viewDeveloperDetails}
            onUpdate={handleOnEdit}
          />
        )}
      </Box>
    </Card>
  );
};

export default Page;
