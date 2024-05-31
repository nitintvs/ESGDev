import React, { useState, useEffect, useRef, useMemo } from 'react';
import $ from 'jquery'
import API from '../../../Services/API';
import Styles from './team.module.css'
import { Heading, Card, CardBody, Box, Image, Text, Input, Textarea, Button, SimpleGrid, Stack, CardFooter} from '@chakra-ui/react'
import Face10 from '../../../../assets/images/faces/face10.jpg'
import TeamList from './TeamList/TeamList';
import AddNewMember from './AddNewMember/AddNewMember';


const Team = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const [isLoading, setIsLoading]  = useState(false)
    const [viewArticle, setViewArticle] = useState()
    const [pillarTeam, setPillarTeam] = useState()

    const getUpdatedTeam = (team) =>{
        props.getUpdatedTeam(team)
    }

    const teamLeads = props.team && props.team.filter(lead => lead.role === 'lead');
    const teamMembers = props.team && props.team.filter(lead => lead.role !== 'lead' && lead.action_office_user !== true);
    const actionOfficeUsers = props.team && props.team.filter(member => member.action_office_user);



    return (
        <>
            <Heading className={Styles.customHeadingH3}>
                {props.title} Leadership Team
            </Heading>
            {/* {teamLeads && teamLeads.length < 1 ? <Box className={'successInfoNew'}> There are no team lead(s) assigned yet. </Box> : null} */}
            <SimpleGrid columns={[1, 2, 3, 4]} spacing='20px' mt={'10px'}>
                {
                    teamLeads && teamLeads.map((member) => 
                        <>
                            <TeamList
                                id={member.id}
                                name={member.member_name}
                                jobTitle={member.job_title}
                                image={member.image}
                                editable={props.editable}
                                getUpdatedTeam={getUpdatedTeam}
                                pillarId={props.pillarId && props.pillarId}
                            />
                        </>
                    )
                }
                {
                    props.editable ? 
                        <AddNewMember 
                            getUpdatedTeam={getUpdatedTeam} 
                            pillarId={props.pillarId && props.pillarId} 
                            actions={props.actions && props.actions} 
                            teamType={'lead'}
                            team={props.team && props.team}
                        /> 
                    : null
                }
            </SimpleGrid>
            
            <Heading className={Styles.customHeadingH3}> Team Members </Heading>
            {teamMembers && teamMembers.length < 1 ? <Box className={'successInfoNew'}> There are no team member(s) assigned yet. </Box> : null}
            <SimpleGrid columns={[1, 2, 3, 4]} spacing='20px' mt={'10px'}>
                {
                    teamMembers && teamMembers.map((member) => 
                        <>
                            <TeamList
                                id={member.id}
                                name={member.member_name}
                                jobTitle={member.job_title}
                                image={member.image}
                                editable={props.editable}
                                team={props.team && props.team}
                                pillarId={props.pillarId && props.pillarId}
                                getUpdatedTeam={getUpdatedTeam}
                            />
                        </>
                    )
                }
                {
                    props.editable ? 
                        <AddNewMember 
                            getUpdatedTeam={getUpdatedTeam} 
                            pillarId={props.pillarId && props.pillarId} 
                            actions={props.actions && props.actions}
                            teamType={'member'} 
                        /> 
                    : null
                }
            </SimpleGrid>
            {
                actionOfficeUsers && actionOfficeUsers.length > 0 ? 
                    <>
                        <Heading className={Styles.customHeadingH3}> Action Office </Heading>
                        <SimpleGrid columns={[1, 2, 3, 4]} spacing='20px' mt={'10px'}>
                            {
                                actionOfficeUsers && actionOfficeUsers.map((member) => 
                                    <>
                                        <TeamList
                                            id={member.id}
                                            name={member.member_name}
                                            jobTitle={member.job_title}
                                            image={member.image}
                                            editable={props.editable}
                                            team={props.team && props.team}
                                            pillarId={props.pillarId && props.pillarId}
                                            getUpdatedTeam={getUpdatedTeam}
                                        />
                                    </>
                                )
                            }
                            {
                                props.editable ? 
                                    <AddNewMember 
                                        getUpdatedTeam={getUpdatedTeam} 
                                        pillarId={props.pillarId && props.pillarId} 
                                        actions={props.actions && props.actions}
                                        teamType={'actionoffice'} 
                                    /> 
                                : null
                            }
                        </SimpleGrid>
                    </> 
                : null
            }
        </>
    )
}

export default Team











