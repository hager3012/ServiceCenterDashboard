'use client';
import { useEffect, useState, useCallback } from 'react';
import { Flex, Box, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CompactTable from 'components/common/compact-table/CompactTable';
import { deleteUnit, getByIdUnit, getUnit } from 'libs/endpoints/unit';

const Page = () => {
  const [Units, setUnits] = useState<{
    headers: Array<{ title: string; field: string }>;
    data?: Array<any>;
  }>();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const router = useRouter();

  const viewUnitDetails = async (id: string) => {
    router.push(`/admin/unit/${id}`);
  };

  const handleOnEdit = async (id: string) => {
    await getByIdUnit(id);
    router.push(`/admin/unit/${id}`);
  };

  const handleDelete = async (id: string) => {
    await deleteUnit(id);
    loadData();
    router.push(`/admin/unit`);
  };

  const loadData = useCallback(() => {
    getUnit().then((data: any) => {
      if (data) {
        setUnits((prev) => ({
          headers: [
            {title: 'id', field: 'id' },
            {title: "Unit Number", field: "unitNumber"},
            {title: "Floor", field: "floor"},
            {title: "Size", field: "size"},
            {title: "Bedrooms", field: "bedrooms"},
            {title: "Bathrooms", field: "bathrooms"},
            {title: "Status", field: "status"},          
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
          Units
        </Text>
        <Menu />
      </Flex>
      <Box>
        <Link href="unit/add">
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
              Add new Unit{' '}
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>+</span>
            </button>
          </div>
        </Link>

        {Units && (
          <CompactTable
            headers={Units.headers}
            data={Units.data}
            onDelete={handleDelete}
            onClick={viewUnitDetails}
            onUpdate={handleOnEdit}
          />
        )}
      </Box>
    </Card>
  );
};

export default Page;
