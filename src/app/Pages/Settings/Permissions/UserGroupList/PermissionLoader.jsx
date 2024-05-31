import React from 'react'
import { Card, CardBody, Heading, Stack, StackDivider, Box, Text, SimpleGrid, Select, useToast, Wrap, WrapItem, Avatar } from '@chakra-ui/react'
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
const PermissionLoader = () => {
  return (
    <>
        <Stack divider={<StackDivider />} spacing='4'>
                    <Box>
                        <Heading>
                            <Skeleton height='20px' w={'520px'} />
                        </Heading>
                        <SimpleGrid columns={[1, 2, 3, 4]} spacing='20px' mt={'10px'}>
                            <Box>
                                <Card>
                                    <CardBody>
                                        <Box display={'flex'}>
                                            <SkeletonCircle size='10' float={'left'} />
                                            <SkeletonText float={'left'} width={'180px'} noOfLines={2} spacing='1' skeletonHeight='2' ml={'10px'} mt='10px' />
                                        </Box>
                                    </CardBody>
                                </Card>
                            </Box>
                            <Box>
                                <Card>
                                    <CardBody>
                                        <Box display={'flex'}>
                                            <SkeletonCircle size='10' float={'left'} />
                                            <SkeletonText float={'left'} width={'180px'} noOfLines={2} spacing='1' skeletonHeight='2' ml={'10px'} mt='10px' />
                                        </Box>
                                    </CardBody>
                                </Card>
                            </Box>
                            <Box>
                                <Card>
                                    <CardBody>
                                        <Box display={'flex'}>
                                            <SkeletonCircle size='10' float={'left'} />
                                            <SkeletonText float={'left'} width={'180px'} noOfLines={2} spacing='1' skeletonHeight='2' ml={'10px'} mt='10px' />
                                        </Box>
                                    </CardBody>
                                </Card>
                            </Box>
                            <Box>
                                <Card>
                                    <CardBody>
                                        <Box display={'flex'}>
                                            <SkeletonCircle size='10' float={'left'} />
                                            <SkeletonText float={'left'} width={'180px'} noOfLines={2} spacing='1' skeletonHeight='2' ml={'10px'} mt='10px' />
                                        </Box>
                                    </CardBody>
                                </Card>
                            </Box>
                        </SimpleGrid>
                    </Box>
                    <Box>
                        <Heading>
                            <Skeleton height='20px' w={'520px'} />
                        </Heading>
                        <SimpleGrid columns={[1, 2, 3, 4]} spacing='20px' mt={'10px'}>
                            <Box>
                                <Card>
                                    <CardBody>
                                        <Box display={'flex'}>
                                            <SkeletonCircle size='10' float={'left'} />
                                            <SkeletonText float={'left'} width={'180px'} noOfLines={2} spacing='1' skeletonHeight='2' ml={'10px'} mt='10px' />
                                        </Box>
                                    </CardBody>
                                </Card>
                            </Box>
                            <Box>
                                <Card>
                                    <CardBody>
                                        <Box display={'flex'}>
                                            <SkeletonCircle size='10' float={'left'} />
                                            <SkeletonText float={'left'} width={'180px'} noOfLines={2} spacing='1' skeletonHeight='2' ml={'10px'} mt='10px' />
                                        </Box>
                                    </CardBody>
                                </Card>
                            </Box>
                            <Box>
                                <Card>
                                    <CardBody>
                                        <Box display={'flex'}>
                                            <SkeletonCircle size='10' float={'left'} />
                                            <SkeletonText float={'left'} width={'180px'} noOfLines={2} spacing='1' skeletonHeight='2' ml={'10px'} mt='10px' />
                                        </Box>
                                    </CardBody>
                                </Card>
                            </Box>
                            <Box>
                                <Card>
                                    <CardBody>
                                        <Box display={'flex'}>
                                            <SkeletonCircle size='10' float={'left'} />
                                            <SkeletonText float={'left'} width={'180px'} noOfLines={2} spacing='1' skeletonHeight='2' ml={'10px'} mt='10px' />
                                        </Box>
                                    </CardBody>
                                </Card>
                            </Box>
                        </SimpleGrid>
                    </Box>
                    <Box>
                        <Heading>
                            <Skeleton height='20px' w={'520px'} />
                        </Heading>
                        <SimpleGrid columns={[1, 2, 3, 4]} spacing='20px' mt={'10px'}>
                            <Box>
                                <Card>
                                    <CardBody>
                                        <Box display={'flex'}>
                                            <SkeletonCircle size='10' float={'left'} />
                                            <SkeletonText float={'left'} width={'180px'} noOfLines={2} spacing='1' skeletonHeight='2' ml={'10px'} mt='10px' />
                                        </Box>
                                    </CardBody>
                                </Card>
                            </Box>
                            <Box>
                                <Card>
                                    <CardBody>
                                        <Box display={'flex'}>
                                            <SkeletonCircle size='10' float={'left'} />
                                            <SkeletonText float={'left'} width={'180px'} noOfLines={2} spacing='1' skeletonHeight='2' ml={'10px'} mt='10px' />
                                        </Box>
                                    </CardBody>
                                </Card>
                            </Box>
                            <Box>
                                <Card>
                                    <CardBody>
                                        <Box display={'flex'}>
                                            <SkeletonCircle size='10' float={'left'} />
                                            <SkeletonText float={'left'} width={'180px'} noOfLines={2} spacing='1' skeletonHeight='2' ml={'10px'} mt='10px' />
                                        </Box>
                                    </CardBody>
                                </Card>
                            </Box>
                            <Box>
                                <Card>
                                    <CardBody>
                                        <Box display={'flex'}>
                                            <SkeletonCircle size='10' float={'left'} />
                                            <SkeletonText float={'left'} width={'180px'} noOfLines={2} spacing='1' skeletonHeight='2' ml={'10px'} mt='10px' />
                                        </Box>
                                    </CardBody>
                                </Card>
                            </Box>
                        </SimpleGrid>
                    </Box>
                </Stack>
    </>
  )
}

export default PermissionLoader