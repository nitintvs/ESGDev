import React from 'react'
import Styles from './sideBarMenu.module.css'
import { Link, useLocation } from 'react-router-dom';
import {
    Box,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Text,
    Heading
  } from '@chakra-ui/react'

const SideBarMenu = (props) => {
    return (
        <>
            <Accordion allowMultiple>
                <AccordionItem className={Styles.accordionItem}>
                    <Heading as={'h3'} className={Styles.sectionTitle}>
                        <AccordionButton className={Styles.sectionButton}>
                            <Box as="span" flex='1' textAlign='left'>
                                {props.name}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </Heading>
                    <AccordionPanel pb={4}>
                        <li className="nav-item"> <Link className={'nav-link' } to="/general-pages/blank-page"><>{props.subName}</></Link></li>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </>
    )
}

export default SideBarMenu