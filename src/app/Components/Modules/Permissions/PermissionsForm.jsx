import React, { useEffect, useState } from 'react'
import Styles from './permissons.module.css'
import { useParams } from 'react-router-dom'
import Select from 'react-select';
import API from '../../../Services/API';
import { Button, FormControl, FormLabel, Checkbox, Stack,} from '@chakra-ui/react'
import LoaderSpinner from '../../Widgets/CommonWidgets/LoaderSpinner/LoaderSpinner'

const PermissionsForm = (props) => {
    const token = window.localStorage.getItem("accessToken")
    const [isLoading, setIsLoading] = useState(false)
    const [groupList, setGroupList] = useState()
    const [permissionType, setPermissionType] = useState()
    const [addAnother, setAddAnother] = useState(false)

    const [editor, setEditor] = useState([])
    const [contributor, setContributor] = useState([])
    const [viewer, setViewer] = useState([])

    const [editorIds, setEditorIds] = useState([])
    const [contributorIds, setContributorIds] = useState([])
    const [viewerIds, setViewerIds] = useState([])

    const {id} = useParams();
    
    useEffect(() => {
        API.get(`/user-permissions`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            setPermissionType(Object.keys(response.data))
        })

        API.get(`/user-group`, {
            headers: {
            'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            setGroupList(response.data)
        }).catch(error => {
            if(error.response.data.code === 'token_not_valid'){
                window.localStorage.removeItem('accessToken')
                window.localStorage.removeItem('refreshToken')
                window.localStorage.removeItem('user')
                window.location.href = '/login'
            }
        });

        API.get(`/user-permissions?module_id=${props.pillarId}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response1 => {
            setEditor(response1.data.editor)
            setContributor(response1.data.contributor)
            setViewer(response1.data.viewer)
            const getEditorIds = response1.data.editor.map(item => item.id)
            setEditorIds(getEditorIds)
            const getContributorIds = response1.data.contributor.map(item => item.id)
            setContributorIds(getContributorIds)
            const getViewerIds = response1.data.viewer.map(item => item.id)
            setViewerIds(getViewerIds)
        })

    },[])

    const saveAndAddNew = (event) =>{
        setAddAnother(event.target.checked)
    }
    const addPermission = () =>{
        setIsLoading(true)
        const body = {
            'module_id' : parseInt(id),
            'request_coming_from' : 'home',
            'editor' : editorIds,
            'contributor' : contributorIds,
            'viewer' : viewerIds,
            'is_global_view' : true,
        }
        API.post(`/user-permissions`, body, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => {
            setIsLoading(false)
            props.getUpdate(false)
        })
    }

    const handleChange = (event, actionMeta)=>{
        if(actionMeta.name === "editor"){
            const getEditorIds = event.map(item => item.id)
            setEditorIds(getEditorIds)
        }else if(actionMeta.name === "contributor"){
            const getContributorIds = event.map(item => item.id)
            setContributorIds(getContributorIds)
        }else if(actionMeta.name === "viewer"){
            const getViewerIds = event.map(item => item.id)
            setViewerIds(getViewerIds)
        }
    }
    
    const options = groupList && groupList.map(item => (
        {id: item.id, value: item.name, label: item.name}
    ))

    const contributorSelected = contributor && contributor.map(item => (
        {id: item.id, value: item.name, label: item.name}
    ))
    const viewerSelected = viewer && viewer.map(item=>(
        {id: item.id, value: item.name, label: item.name}
    ))

    const editorSelected = editor && editor.map(item=>(
        {id: item.id, value: item.name, label: item.name}
    ))

    return (
        <>
            {isLoading  ? <LoaderSpinner /> : null}
            <FormControl float={'left'} width={'100%'}>
                {
                    permissionType && permissionType.map(item => 
                        item !== 'is_global_view' ?
                            <>
                                <FormLabel className={Styles.selectFormLabel}>{item}</FormLabel>
                                <Select 
                                    defaultValue={item === "contributor" ? contributorSelected && contributorSelected : item === "viewer" ? (viewerSelected && viewerSelected) : item === "editor" ? (editorSelected && editorSelected) : null}
                                    options={options}  
                                    isMulti 
                                    isSearchable={true} 
                                    className={Styles.mbSelect}
                                    name={item}
                                    onChange={handleChange}
                                    //value={item === "contributor" ? contributorSelected : item === "viewer" ? viewerSelected : item === "editor" ? editorSelected : null}
                                />
                            </>
                        :null
                    )
                }
                
                <Stack spacing={5} direction='row' mt={'10px'}>
                    <Checkbox colorScheme='green' defaultChecked={addAnother} onChange={saveAndAddNew}>
                        Disable edit propagation
                    </Checkbox>
                </Stack>
            </FormControl>
            <FormControl float={'left'} width={'100%'}>
                <Button variant='ghost' onClick={addPermission} className={Styles.SaveButton}>Save Permissions</Button>
            </FormControl>
        </>
        
    )
}

export default PermissionsForm
