import React, { useState, useEffect, useRef, useMemo } from 'react';
import Styles from './metricdata.module.css'
import API from '../../../Services/API'
import { IconButton } from '@chakra-ui/react'
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Card,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Checkbox, 
    Stack,
    Textarea,
    Text,
    Button
} from '@chakra-ui/react'
import LoaderSpinner from '../../../Components/Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';

const ApproveComponent = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [metricData, setMetricData] = useState()
    const [isLoading, setIsLoading] = useState()
    const [message, setMessage] = useState()

    const approveMetric = (event) => {
      onClose()
      setIsLoading(true)
      const body = {
        "id": parseInt(event.target.id),
        "approval_status": "approved",
      }
      API.put(`/metric-data`,body, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(response=>{
        API.get(`/my-task`, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }).then(response=>{
            props.getUpdatedPending(response.data)
            props.getMessage(true)
            setIsLoading(false)
        })
      })
    }

    return (
        <>
            {isLoading ? <LoaderSpinner /> : null}
            <IconButton
          variant='outline'
          colorScheme='teal'
          aria-label='Call Sage'      
          // variant='solid'
                // colorScheme='teal'
                // aria-label='Done'
                fontSize='14px'
                icon={<CheckIcon />}
                className={`${Styles.approve} ${Styles.hoverEffectApprove}`} id={props.id}
                onClick={onOpen}
            />
            <Modal isOpen={isOpen} onClose={onClose}  closeOnOverlayClick={false}>
                <ModalOverlay className={Styles.overLay} />
                <ModalContent className={Styles.contentZindex}>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text className={Styles.contentInfo}>
                          Are you sure you want to approve? Once approved the data would be moved to relevant section
                        </Text>
                    </ModalBody>
                    <ModalFooter className={Styles.modelFooter}>
                        <Button mr={3} size="sm" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button className={Styles.confirmButton} id={props.id}  size="sm" onClick={approveMetric}>Confirm</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ApproveComponent