'use client';
import { useEffect, useState, useCallback } from 'react';
import { Flex, Box, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CompactTable from 'components/common/compact-table/CompactTable';
import { deleteTimeSlot, getByIdTimeSlot, getTimeSlot } from 'libs/endpoints/timeSlot';

const Page = () => {
  const [TimeSlots, setTimeSlots] = useState<{
    headers: Array<{ title: string; field: string }>;
    data?: Array<any>;
  }>();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const router = useRouter();

  const viewTimeSlotDetails = async (id: string) => {
    router.push(`/admin/timeSlot/${id}`);
  };

  const handleOnEdit = async (id: string) => {
    await getByIdTimeSlot(id);
    router.push(`/admin/timeSlot/update/${id}`);
  };

  const handleDelete = async (id: string) => {
    await deleteTimeSlot(id);
    loadData();
    router.push(`/admin/timeSlot`);
  };

  const loadData = useCallback(() => {
    getTimeSlot().then((data: any) => {
      if (data) {
        setTimeSlots((prev) => ({
          headers: [
            {title: 'id', field: 'id' },
            {title: "Start Time", field: "startTime"},
            {title: "End Time", field: "endTime"},
            {title: "Day", field: "day"}          
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
      <Flex px="25px" mb="8px" justifyContent="space-between" align="timeSlot">
        <Text
          color={textColor}
          fontSize="22px"
          mb="4px"
          fontWeight="700"
          lineHeight="100%"
        >
          TimeSlots
        </Text>
        <Menu />
      </Flex>
      <Box>
        <Link href="timeSlot/add">
          <div style={{ textAlign: 'end', margin: '1px 20px' }}>
            <button
              type="button"
              style={{
                backgroundColor: 'blue' /* Green background */,
                border: 'none',
                color: 'white',
                padding: '10px 20px' /* Some padding */,
                textAlign: 'timeSlot',
                textDecoration: 'none',
                display: 'inline-block',
                fontSize: '16px',
                margin: '4px 2px',
                cursor: 'pointer',
                borderRadius: '5px' /* Rounded corners */,
              }}
            >
              Add new TimeSlot{' '}
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>+</span>
            </button>
          </div>
        </Link>

        {TimeSlots && (
          <CompactTable
            headers={TimeSlots.headers}
            data={TimeSlots.data}
            onDelete={handleDelete}
            onClick={viewTimeSlotDetails}
            onUpdate={handleOnEdit}
          />
        )}
      </Box>
    </Card>
  );
};

export default Page;
