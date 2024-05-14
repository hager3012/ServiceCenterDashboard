'use client';
import { useEffect, useState, useCallback } from 'react';
import { Flex, Box, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CompactTable from 'components/common/compact-table/CompactTable';
import { deleteProjectCategory, getByIdProjectCategory, getProjectCategory } from 'libs/endpoints/project-category';

const Page = () => {
  const [ProjectCategorys, setProjectCategorys] = useState<{
    headers: Array<{ title: string; field: string }>;
    data?: Array<any>;
  }>();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const router = useRouter();

  const viewProjectCategoryDetails = async (id: string) => {
    router.push(`/admin/project-category/${id}`);
  };

  const handleOnEdit = async (id: string) => {
    await getByIdProjectCategory(id);
    router.push(`/admin/project-category/update/${id}`);
  };

  const handleDelete = async (id: string) => {
    await deleteProjectCategory(id);
    loadData();
    router.push(`/admin/project-category`);
  };

  const loadData = useCallback(() => {
    getProjectCategory().then((data: any) => {
      if (data) {
        setProjectCategorys((prev) => ({
          headers: [
            { title: 'id', field: 'id' },
            {title: "Nama", field: "name"}          
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
          Project Categories
        </Text>
        <Menu />
      </Flex>
      <Box>
        <Link href="project-category/add">
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
              Add new Project Category{' '}
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>+</span>
            </button>
          </div>
        </Link>

        {ProjectCategorys && (
          <CompactTable
            headers={ProjectCategorys.headers}
            data={ProjectCategorys.data}
            onDelete={handleDelete}
            onClick={viewProjectCategoryDetails}
            onUpdate={handleOnEdit}
          />
        )}
      </Box>
    </Card>
  );
};

export default Page;
