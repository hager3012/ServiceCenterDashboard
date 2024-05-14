'use client';
import { useEffect, useState, useCallback } from 'react';
import { Flex, Box, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CompactTable from 'components/common/compact-table/CompactTable';
import { deleteTimeslot, getByIdTimeslot, getTimeslot } from 'libs/endpoints/timeslot';

const page = () => {
  const [Timeslots, setTimeslots] = useState<{
    headers: Array<{ title: string; field: string }>;
    data?: Array<any>;
  }>();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const router = useRouter();

  const viewTimeslotDetails = async (id: string) => {
    router.push(`/admin/timeslot/${id}`);
  };

  const handleOnEdit = async (id: string) => {
    await getByIdTimeslot(id);
    router.push(`/admin/timeslot/update/${id}`);
  };

  const handleDelete = async (id: string) => {
    await deleteTimeslot(id);
    loadData();
    router.push(`/admin/timeslot`);
  };

  const loadData = useCallback(() => {
    getTimeslot().then((data: any) => {
      if (data) {
        setTimeslots((prev) => ({
          headers: [
           
           
            { title: 'id', field: 'id' },
            {title: "Start Time", field: "startTime"},
            {title: "End Time ", field: "endTime"},
            {title:"Day",field:"day"}
            
            
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
          Timeslots
        </Text>
        <Menu />
      </Flex>
      <Box>
        <Link href="timeslot/add">
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
              Add new Timeslot{' '}
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>+</span>
            </button>
          </div>
        </Link>

        {Timeslots && (
          <CompactTable
            headers={Timeslots.headers}
            data={Timeslots.data}
            onDelete={handleDelete}
            onClick={viewTimeslotDetails}
            onUpdate={handleOnEdit}
          />
        )}
      </Box>
    </Card>
  );
};

export default page;
