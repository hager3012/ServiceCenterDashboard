'use client';
import { useEffect, useState, useCallback } from 'react';
import { Flex, Box, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CompactTable from 'components/common/compact-table/CompactTable';
import { deleteProject, getByIdProject, getProject } from 'libs/endpoints/project';

const Page = () => {
  const [Projects, setProjects] = useState<{
    headers: Array<{ title: string; field: string }>;
    data?: Array<any>;
  }>();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const router = useRouter();

  const viewProjectDetails = async (id: string) => {
    router.push(`/admin/project/${id}`);
  };

  const handleOnEdit = async (id: string) => {
    await getByIdProject(id);
    router.push(`/admin/project/update/${id}`);
  };

  const handleDelete = async (id: string) => {
    await deleteProject(id);
    loadData();
    router.push(`/admin/project`);
  };

  const loadData = useCallback(() => {
    getProject().then((data: any) => {
      if (data) {
        setProjects((prev) => ({
          headers: [
            {title: 'id', field: 'id' },
            {title: "Name", field: "name"},
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
          Projects
        </Text>
        <Menu />
      </Flex>
      <Box>
        <Link href="project/add">
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
              Add new Project{' '}
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>+</span>
            </button>
          </div>
        </Link>

        {Projects && (
          <CompactTable
            headers={Projects.headers}
            data={Projects.data}
            onDelete={handleDelete}
            onClick={viewProjectDetails}
            onUpdate={handleOnEdit}
          />
        )}
      </Box>
    </Card>
  );
};

export default Page;
