'use client';
import { useEffect, useState, useCallback } from 'react';
import { Flex, Box, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CompactTable from 'components/common/compact-table/CompactTable';
import { deletePhase, getByIdPhase, getPhase } from 'libs/endpoints/phase';

const Page = () => {
  const [Phases, setPhases] = useState<{
    headers: Array<{ title: string; field: string }>;
    data?: Array<any>;
  }>();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const router = useRouter();

  const viewPhaseDetails = async (id: string) => {
    router.push(`/admin/phase/${id}`);
  };

  const handleOnEdit = async (id: string) => {
    await getByIdPhase(id);
    router.push(`/admin/phase/update/${id}`);
  };

  const handleDelete = async (id: string) => {
    await deletePhase(id);
    loadData();
    router.push(`/admin/phase`);
  };

  const loadData = useCallback(() => {
    getPhase().then((data: any) => {
      if (data) {
        setPhases((prev) => ({
          headers: [
            {title: 'id', field: 'id' },
            {title: "Nama", field: "name"},
            {title: "Description", field: "description"},
            {title: "Start Date", field: "startDate"},
            {title: "End Date", field: "endDate"}           
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
          Phases
        </Text>
        <Menu />
      </Flex>
      <Box>
        <Link href="phase/add">
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
              Add new Phase{' '}
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>+</span>
            </button>
          </div>
        </Link>

        {Phases && (
          <CompactTable
            headers={Phases.headers}
            data={Phases.data}
            onDelete={handleDelete}
            onClick={viewPhaseDetails}
            onUpdate={handleOnEdit}
          />
        )}
      </Box>
    </Card>
  );
};

export default Page;
