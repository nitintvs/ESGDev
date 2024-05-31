import React, { useState, useEffect, useRef, useMemo } from 'react';
import Styles from './team.module.css'
import $ from 'jquery'
import API from '../../../../../../Services/API';
import { Link, useParams } from 'react-router-dom'
import {Card, SimpleGrid, CardHeader, CardBody, Heading, Stack, StackDivider, Text, Box, Input, Textarea, Button, Image} from '@chakra-ui/react'
import JoditEditor from 'jodit-react';
import parse from 'html-react-parser';
import LoaderSpinner from '../../../../../Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner';
import TeamList from './TeamList/TeamList';
import AddNewMember from './AddNewMember/AddNewMember';

const Team = (props) => {
  const token = window.localStorage.getItem("accessToken")
  const [isLoading, setIsLoading]  = useState(true)
  const [editable, setEditable] = useState();
  const [team, setTeam] = useState();
  const [length, setLength] = useState();
  const {actionid} = useParams();
  
  useEffect(() => {
    setIsLoading(true)
    API.get(`/pillar-team?action_id=${props.actionId}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then((response) => {
      setTeam(response.data)
      setLength(response.data.length)

      setIsLoading(false)
    })
  },[props.actionId])

  const getUpdatedTeam = (team) =>{
    setTeam(team)
  }

  return (
    <>
      { 
        isLoading ? <LoaderSpinner />: null
      }
      {
        length === 0 ? <Box className={Styles.info}> There are no team member(s) assigned to this action yet. </Box> : null
      }

      <Card>
        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                ELT Sponsors
              </Heading>
              <SimpleGrid columns={[1, 2, 3,]} spacing='20px' mt={'10px'}>
                {
                  team && team.map((member) => 
                    member.position === 'elt_sponsor' ?
                    <>
                      {
                        <TeamList
                          id={member.id}
                          name={member.member_name}
                          jobTitle={member.job_title}
                          image={member.image}
                          editable={props.editable}
                        />
                      }
                    </> : null
                  )
                }
                {
                  props.editable ? 
                      <AddNewMember 
                          getUpdatedTeam={getUpdatedTeam} 
                          pillarId={props.actionId && props.actionId} 
                          actions={props.actions && props.actions} 
                          teamType={'eltsponsor'}
                          team={props.team && props.team}
                      /> 
                  : null
                }
              </SimpleGrid>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Leader
              </Heading>
              <SimpleGrid columns={[1, 2, 3,]} spacing='20px' mt={'10px'}>
                {
                  team && team.map((member) => 
                    member.role === 'lead' ?
                    <>
                      {
                        <TeamList
                          id={member.id}
                          name={member.member_name}
                          jobTitle={member.job_title}
                          image={member.image}
                          editable={props.editable}
                        />
                      }
                    </> : null
                  )
                }
                {
                  props.editable ? 
                      <AddNewMember 
                          getUpdatedTeam={getUpdatedTeam} 
                          pillarId={props.actionId && props.actionId} 
                          actions={props.actions && props.actions} 
                          teamType={'lead'}
                          team={props.team && props.team}
                      /> 
                  : null
                }
              </SimpleGrid>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Members
              </Heading>
              <SimpleGrid columns={[1, 2, 3,]} spacing='20px' mt={'10px'}>
                {
                  team && team.map((member) => 
                    ((member.role !== 'lead') && (member.position !== 'elt_sponsor')) ?
                    <>
                      {
                        <TeamList
                          id={member.id}
                          name={member.member_name}
                          jobTitle={member.job_title}
                          image={member.image}
                          editable={props.editable}
                        />
                      }
                    </> : null
                  )
                }
                {
                    props.editable ? 
                        <AddNewMember 
                            getUpdatedTeam={getUpdatedTeam} 
                            pillarId={props.actionId && props.actionId} 
                            teamType={'member'}
                            team={props.team && props.team}
                        /> 
                    : null
                }
              </SimpleGrid>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </>
  )
}

export default Team