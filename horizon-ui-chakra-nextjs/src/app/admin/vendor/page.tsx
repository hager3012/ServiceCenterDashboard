'use client';
import { useEffect, useState, useCallback } from 'react';
import { Flex, Box, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CompactTable from 'components/common/compact-table/CompactTable';
import { deleteVendor, getByIdVendor, getVendor } from 'libs/endpoints/vendor';

const Page = () => {
  const [Vendors, setVendors] = useState<{
    headers: Array<{ title: string; field: string }>;
    data?: Array<any>;
  }>();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const router = useRouter();

  const viewVendorDetails = async (id: string) => {
    router.push(`/admin/vendor/${id}`);
  };

  const handleOnEdit = async (id: string) => {
    await getByIdVendor(id);
    router.push(`/admin/vendor/update/${id}`);
  };

  const handleDelete = async (id: string) => {
    await deleteVendor(id);
    loadData();
    router.push(`/admin/vendor`);
  };

  const loadData = useCallback(() => {
    getVendor().then((data: any) => {
      if (data) {
        setVendors((prev) => ({
            headers: [
                { title: 'ID', field: 'id' },
                { title: 'Email', field: 'vendorEmail' },
                { title: 'First Name', field: 'vendorFirstName' },
                { title: 'Last Name', field: 'vendorLastName' },
                { title: 'Phone Number', field: 'vendorPhoneNumber' },
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
          Vendors
        </Text>
        <Menu />
      </Flex>
      <Box>
        <Link href="vendor/add">
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
              Add new Vendor{' '}
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>+</span>
            </button>
          </div>
        </Link>

        {Vendors && (
          <CompactTable
            headers={Vendors.headers}
            data={Vendors.data}
            onDelete={handleDelete}
            onClick={viewVendorDetails}
            onUpdate={handleOnEdit}
          />
        )}
      </Box>
    </Card>
  );
};

export default Page;
