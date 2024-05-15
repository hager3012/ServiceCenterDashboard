'use client';

import { Flex, Box, Text, useColorModeValue } from '@chakra-ui/react';
import * as React from 'react';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CompactTable from 'components/common/compact-table/CompactTable';
import { DeleteComplaint, GetByIdComplaint, GetComplaint } from 'libs/endpoints/complaint';



const page = () => {
  const [Complaints, setComplaints] = useState<{
    headers: Array<{ title: string; field: string }>;
    data?: Array<any>;
  }>();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const router = useRouter();


  const loadData = useCallback(() => {
    GetComplaint().then((data: any) => {
      if (data) {
        setComplaints((prev) => ({
          headers: [
            { title: 'ID', field: 'id' },
            { title: 'Date', field: 'complaintDate' },
            { title: 'Description', field: 'complaintDescription' },
            { title: 'Category', field: 'complaintCategory' },
            { title: 'Status', field: 'complaintStatus' },
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
    await DeleteComplaint(id);
    loadData();
    router.push("/admin/complaint");
  };
  const viewComplaintDetails = async (id: string) => {
    router.push(`/admin/complaint/${id}`);
  };

  const handleOnEdit = async (id: string) => {
    await GetByIdComplaint(id)
    router.push(`/admin/complaint/update/${id}`);
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
          Complaints
        </Text>
        <Menu />
      </Flex>
      <Box>
        <Link href="complaint/add">
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
              Add new Complaint{' '}
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>+</span>
            </button>
          </div>
        </Link>

        {Complaints && (
          <CompactTable
            headers={Complaints.headers}
            data={Complaints.data}
            onDelete={handleDelete}
            onClick={viewComplaintDetails}
            onUpdate={handleOnEdit}
          />
        )}
      </Box>
    </Card>
  );
}

export default page;
