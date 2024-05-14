'use client';
import { useEffect, useState, useCallback } from 'react';
import { Flex, Box, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CompactTable from 'components/common/compact-table/CompactTable';
import { deletePaymentPlan, getByIdPaymentPlan, getPaymentPlan } from 'libs/endpoints/payment-plan';

const Page = () => {
  const [PaymentPlans, setPaymentPlans] = useState<{
    headers: Array<{ title: string; field: string }>;
    data?: Array<any>;
  }>();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const router = useRouter();

  const viewPaymentPlanDetails = async (id: string) => {
    router.push(`/admin/payment-plan/${id}`);
  };

  const handleOnEdit = async (id: string) => {
    await getByIdPaymentPlan(id);
    router.push(`/admin/payment-plan/update/${id}`);
  };

  const handleDelete = async (id: string) => {
    await deletePaymentPlan(id);
    loadData();
    router.push(`/admin/payment-plan`);
  };

  const loadData = useCallback(() => {
    getPaymentPlan().then((data: any) => {
      if (data) {
        setPaymentPlans((prev) => ({
          headers: [
            {title: 'id', field: 'id' },
            {title: "Nama", field: "name"},
            {title: "Description", field: "description"},
            {title: "Terms", field: "terms"},
            {title: "Down Payment Percentage", field: "downPaymentPercentage"}     ,
            {title: "Installment Count", field: "installmentCount"}     ,
            {title: "Interest Rate", field: "interestRate"}         
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
          PaymentPlans
        </Text>
        <Menu />
      </Flex>
      <Box>
        <Link href="payment-plan/add">
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
              Add new PaymentPlan{' '}
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>+</span>
            </button>
          </div>
        </Link>

        {PaymentPlans && (
          <CompactTable
            headers={PaymentPlans.headers}
            data={PaymentPlans.data}
            onDelete={handleDelete}
            onClick={viewPaymentPlanDetails}
            onUpdate={handleOnEdit}
          />
        )}
      </Box>
    </Card>
  );
};

export default Page;
