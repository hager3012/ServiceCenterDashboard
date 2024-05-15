'use client';
import { useEffect, useState, useCallback } from 'react';
import { Flex, Box, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CompactTable from 'components/common/compact-table/CompactTable';
import { deleteProduct, getByIdProduct, getProduct } from 'libs/endpoints/product';

const Page = () => {
  const [Products, setProducts] = useState<{
    headers: Array<{ title: string; field: string }>;
    data?: Array<any>;
  }>();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const router = useRouter();

  const viewProductDetails = async (id: string) => {
    router.push(`/admin/product/${id}`);
  };

  const handleOnEdit = async (id: string) => {
    await getByIdProduct(id);
    router.push(`/admin/product/update/${id}`);
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    loadData();
    router.push(`/admin/product`);
  };

  const loadData = useCallback(() => {
    getProduct().then((data: any) => {
      if (data) {
        setProducts((prev) => ({
          headers: [
            {title: 'id', field: 'id' },
            {title: "Nama", field: "productName"},
            {title: "Description", field: "productDescription"},
            {title: "Price", field: "productPrice"},  
            {title: "Category", field: "categoryName"},  
            {title: "Brand", field: "productBrandName"}      
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
          Products
        </Text>
        <Menu />
      </Flex>
      <Box>
        <Link href="product/add">
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
              Add new Product{' '}
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>+</span>
            </button>
          </div>
        </Link>

        {Products && (
          <CompactTable
            headers={Products.headers}
            data={Products.data}
            onDelete={handleDelete}
            onClick={viewProductDetails}
            onUpdate={handleOnEdit}
          />
        )}
      </Box>
    </Card>
  );
};

export default Page;
