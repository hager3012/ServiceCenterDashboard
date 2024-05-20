'use client';

import { Flex, Box, Text, useColorModeValue } from '@chakra-ui/react';
import * as React from 'react';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CompactTable from 'components/common/compact-table/CompactTable';
import { DeleteRatingService, GetByIdRatingService, GetRatingService } from 'libs/endpoints/RatingService';



const page = () => {
  const [RatingServices, setRatingServices] = useState<{
    headers: Array<{ title: string; field: string }>;
    data?: Array<any>;
  }>();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const router = useRouter();


  const loadData = useCallback(() => {
    GetRatingService().then((data: any) => {
      if (data) {
        setRatingServices((prev) => ({
          headers: [
            { title: 'ID', field: 'id' },
            { title: 'Rating Value', field: 'ratingValue' },
            { title: 'Service Name', field: 'serviceName' },
            { title: 'Customer Name', field: 'customerName' },
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

  const handleDelete = async (id: string) => {
    await DeleteRatingService(id);
    loadData();
    router.push("/admin/ratingService");
  };
  const viewRatingServiceDetails = async (id: string) => {
    router.push(`/admin/ratingService/${id}`);
  };

  const handleOnEdit = async (id: string) => {
    await GetByIdRatingService(id)
    router.push(`/admin/ratingService/update/${id}`);
  };
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
          RatingServices
        </Text>
        <Menu />
      </Flex>
      <Box>
        <Link href="ratingService/add">
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
              Add new RatingService{' '}
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>+</span>
            </button>
          </div>
        </Link>

        {RatingServices && (
          <CompactTable
            headers={RatingServices.headers}
            data={RatingServices.data}
            onDelete={handleDelete}
            onClick={viewRatingServiceDetails}
            onUpdate={handleOnEdit}
          />
        )}
      </Box>
    </Card>
  );
}

export default page;
