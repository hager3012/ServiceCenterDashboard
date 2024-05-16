'use client';

import { useEffect, useState, useCallback } from 'react';
import { Flex, Box, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CompactTable from 'components/common/compact-table/CompactTable';
import { deleteSchedule, getByIdSchedule, getSchedule } from 'libs/endpoints/schedule';

const page = () => {
  const [Schedules, setSchedules] = useState<{
    headers: Array<{ title: string; field: string }>;
    data?: Array<any>;
  }>();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const router = useRouter();

  const viewSchedulesDetails = async (id: string) => {
    router.push(`/admin/schedule/${id}`);
  };

  const handleOnEdit = async (id: string) => {
    await getByIdSchedule(id);
    router.push(`/admin/schedule/update/${id}`);
  };

  const handleDelete = async (id: string) => {
    await deleteSchedule(id);
    loadData();
    router.push(`/admin/schedule`);
  };

  const loadData = useCallback(() => {
    getSchedule().then((data: any) => {
      if (data) {
        setSchedules((prev) => ({
          headers: [
            { title: ' Id', field: 'id' },
            { title: 'Emplyee Name', field: 'employeeName' },
            { title: 'Start Time', field: 'startTime' },
            { title: 'End Time', field: 'endTime' },
            { title: 'Day', field: 'day' },
         
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
          Schedules
        </Text>
        <Menu />
      </Flex>
      <Box>
        <Link href="schedule/add">
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
              Add new Schedule {' '}
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>+</span>
            </button>
          </div>
        </Link>

        {Schedules && (
          <CompactTable
            headers={Schedules.headers}
            data={Schedules.data}
            onDelete={handleDelete}
            onClick={viewSchedulesDetails}
            onUpdate={handleOnEdit}
          />
        )}
      </Box>
    </Card>
  );
};

export default page;
