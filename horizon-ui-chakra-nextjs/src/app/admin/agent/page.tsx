'use client';
import { useEffect, useState, useCallback } from 'react';
import { Flex, Box, useColorModeValue, Text } from '@chakra-ui/react';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CompactTable from 'components/common/compact-table/CompactTable';
import { deleteAgent, getAgentById, getAgent } from 'libs/endpoints/agent';
const page = () => {
  const [agent, setAgents] = useState<{
    headers: Array<{ title: string; field: string }>;
    data?: Array<any>;
  }>();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const router = useRouter();

  const viewAgentDetails = async (id: string) => {
    router.push(`/admin/agent/${id}`);
  };

  const handleOnEdit = async (id: string) => {
    await getAgentById(id);
    router.push(`/admin/agent/update/${id}`);
  };

  const handleDelete = async (id: string) => {
    await deleteAgent(id);
    loadData();
    router.push(`/admin/agent`);
  };

  const loadData = useCallback(() => {
    getAgent().then((data: any) => {
      if (data) {
        setAgents((prev) => ({
          headers: [
            { title: 'ID', field: 'id' },
            { title: 'Email', field: 'email' },
            { title: 'Frist Name', field: 'fristName' },
            { title: 'Last Name', field: 'lastName' },
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
          Agents
        </Text>
        <Menu />
      </Flex>
      <Box>
        <Link href="agent/add">
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
              Add new Agent{' '}
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>+</span>
            </button>
          </div>
        </Link>

        {agent && (
          <CompactTable
            headers={agent.headers}
            data={agent.data}
            onDelete={handleDelete}
            onClick={viewAgentDetails}
            onUpdate={handleOnEdit}
          />
        )}
      </Box>
    </Card>
  );
};

export default page;