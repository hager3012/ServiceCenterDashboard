'use client';
import { useEffect, useState, useCallback } from 'react';
import { Flex, Box, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CompactTable from 'components/common/compact-table/CompactTable';
import { deleteFloorPlan, getByIdFloorPlan, getFloorPlan } from 'libs/endpoints/floor-plan';

const Page = () => {
  const [FloorPlans, setFloorPlans] = useState<{
    headers: Array<{ title: string; field: string }>;
    data?: Array<any>;
  }>();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const router = useRouter();

  const viewFloorPlanDetails = async (id: string) => {
    router.push(`/admin/floor-plan/${id}`);
  };

  const handleOnEdit = async (id: string) => {
    await getByIdFloorPlan(id);
    router.push(`/admin/floor-plan/update/${id}`);
  };

  const handleDelete = async (id: string) => {
    await deleteFloorPlan(id);
    loadData();
    router.push(`/admin/floor-plan`);
  };

  const loadData = useCallback(() => {
    getFloorPlan().then((data: any) => {
      if (data) {
        setFloorPlans((prev) => ({
          headers: [
            {title: 'id', field: 'id' },
            {title: "Image Url", field: "imageURL"},
            {title: "Caption", field: "caption"}        
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
          FloorPlans
        </Text>
        <Menu />
      </Flex>
      <Box>
        <Link href="floor-plan/add">
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
              Add new FloorPlan{' '}
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>+</span>
            </button>
          </div>
        </Link>

        {FloorPlans && (
          <CompactTable
            headers={FloorPlans.headers}
            data={FloorPlans.data}
            onDelete={handleDelete}
            onClick={viewFloorPlanDetails}
            onUpdate={handleOnEdit}
          />
        )}
      </Box>
    </Card>
  );
};

export default Page;
