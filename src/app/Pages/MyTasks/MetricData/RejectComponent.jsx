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

const RejectComponent = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [metricData, setMetricData] = useState()
    const [isLoading, setIsLoading] = useState()
    const [message, setMessage] = useState()

    const rejectMetric = (event) => {
      onClose()
      setIsLoading(true)
      const body = {
        "id": parseInt(event.target.id),
        "approval_status": "reject",
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
                // variant='solid'
                // colorScheme='teal'
          // aria-label='Done'
          variant='outline'
  colorScheme='teal'
  aria-label='Call Sage'
                fontSize='14px'
                icon={<CloseIcon />}
                className={`${Styles.reject} ${Styles.hoverEffectReject}`} id={props.id}
                onClick={onOpen}
            />
            <Modal isOpen={isOpen} onClose={onClose}  closeOnOverlayClick={false}>
                <ModalOverlay className={Styles.overLay} />
                <ModalContent className={Styles.contentZindex}>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text className={Styles.contentInfo}>
                          Are you sure you want to reject it? This action can not be reversed.
                        </Text>
                    </ModalBody>
                    <ModalFooter className={Styles.modelFooter}>
                        <Button mr={3} size="sm" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button className={Styles.confirmButton} id={props.id} size="sm" onClick={rejectMetric}>Confirm</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default RejectComponent