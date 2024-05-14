'use client';
import { useEffect, useState, useCallback } from 'react';
import { Flex, Box, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CompactTable from 'components/common/compact-table/CompactTable';
import { deleteEvent, getByIdEvent, getEvent } from 'libs/endpoints/event';

const Page = () => {
  const [Events, setEvents] = useState<{
    headers: Array<{ title: string; field: string }>;
    data?: Array<any>;
  }>();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const router = useRouter();

  const viewEventDetails = async (id: string) => {
    router.push(`/admin/event/${id}`);
  };

  const handleOnEdit = async (id: string) => {
    await getByIdEvent(id);
    router.push(`/admin/event/update/${id}`);
  };

  const handleDelete = async (id: string) => {
    await deleteEvent(id);
    loadData();
    router.push(`/admin/event`);
  };

  const loadData = useCallback(() => {
    getEvent().then((data: any) => {
      if (data) {
        setEvents((prev) => ({
          headers: [
            { title: 'id', field: 'id' },
            {title: "Nama", field: "name"},
            {title: "Description", field: "description"},
            {title: "Date", field: "date"},
            {title: "Location", field: "location"}
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
          Events
        </Text>
        <Menu />
      </Flex>
      <Box>
        <Link href="event/add">
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
              Add new Event{' '}
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>+</span>
            </button>
          </div>
        </Link>

        {Events && (
          <CompactTable
            headers={Events.headers}
            data={Events.data}
            onDelete={handleDelete}
            onClick={viewEventDetails}
            onUpdate={handleOnEdit}
          />
        )}
      </Box>
    </Card>
  );
};

export default Page;
