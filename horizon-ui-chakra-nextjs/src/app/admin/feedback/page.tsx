'use client';
import { useEffect, useState, useCallback } from 'react';
import { Flex, Box, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CompactTable from 'components/common/compact-table/CompactTable';
import { deleteFeedback, getByIdFeedback, getFeedback } from 'libs/endpoints/feedback';

const Page = () => {
  const [Feedbacks, setFeedbacks] = useState<{
    headers: Array<{ title: string; field: string }>;
    data?: Array<any>;
  }>();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const router = useRouter();

  const viewFeedbackDetails = async (id: string) => {
    router.push(`/admin/feedback/${id}`);
  };

  const handleOnEdit = async (id: string) => {
    await getByIdFeedback(id);
    router.push(`/admin/feedback/update/${id}`);
  };

  const handleDelete = async (id: string) => {
    await deleteFeedback(id);
    loadData();
    router.push(`/admin/feedback`);
  };

  const loadData = useCallback(() => {
    getFeedback().then((data: any) => {
      if (data) {
        setFeedbacks((prev) => ({
          headers: [
            {title: 'id', field: 'id' },
            {title: "Date", field: "feedbackDate"},
            {title: "Description", field: "feedbackDescription"},
            {title: "Category", field: "feedbackCategory"}          
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
      <Flex px="25px" mb="8px" justifyContent="space-between" align="feedback">
        <Text
          color={textColor}
          fontSize="22px"
          mb="4px"
          fontWeight="700"
          lineHeight="100%"
        >
          Feedbacks
        </Text>
        <Menu />
      </Flex>
      <Box>
        <Link href="feedback/add">
          <div style={{ textAlign: 'end', margin: '1px 20px' }}>
            <button
              type="button"
              style={{
                backgroundColor: 'blue' /* Green background */,
                border: 'none',
                color: 'white',
                padding: '10px 20px' /* Some padding */,
                textAlign: 'feedback',
                textDecoration: 'none',
                display: 'inline-block',
                fontSize: '16px',
                margin: '4px 2px',
                cursor: 'pointer',
                borderRadius: '5px' /* Rounded corners */,
              }}
            >
              Add new Feedback{' '}
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>+</span>
            </button>
          </div>
        </Link>

        {Feedbacks && (
          <CompactTable
            headers={Feedbacks.headers}
            data={Feedbacks.data}
            onDelete={handleDelete}
            onClick={viewFeedbackDetails}
            onUpdate={handleOnEdit}
          />
        )}
      </Box>
    </Card>
  );
};

export default Page;
