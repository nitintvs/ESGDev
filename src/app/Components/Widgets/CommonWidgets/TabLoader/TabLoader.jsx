import React from 'react'
import Styles from './tabloader.module.css'
import {Spinner, Box} from '@chakra-ui/react'
import { Skeleton, SkeletonCircle, SkeletonText, Stack, SimpleGrid } from '@chakra-ui/react'

const TabLoader = () => {
  return (
    <>
      <Stack>
        <Skeleton height='20px' />
      </Stack>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing='20px' mt={'10px'}>
        <Skeleton height='200px' />
        <Skeleton height='200px' />
        <Skeleton height='200px' />
        <Skeleton height='200px' />
      </SimpleGrid>
    </>
  )
}

export default TabLoader