import React from 'react'
import { Grid } from 'semantic-ui-react'
import { IActivity } from './../../../app/models/activity';
import { ActivityList } from './ActivityList';
import { ActivityDetails } from '../details/ActivityDetails';
import { ActivityForm } from '../forms/ActivityForm';

interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void;
    selectedActivity: IActivity;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
    deleteActivity: (id: string) => void;
}

export const ActivityDashboard: React.FC<IProps> = ({
    activities, 
    selectActivity, 
    selectedActivity,
    editMode,
    setEditMode,
    setSelectedActivity,
    createActivity,
    editActivity,
    deleteActivity
    }) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList 
                activities={activities} 
                selectActivity={selectActivity}
                deleteActivity={deleteActivity}
                ></ActivityList>             
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && 
                    !editMode &&
                <ActivityDetails 
                    selectedActivity = {selectedActivity}
                    setEditMode={setEditMode}
                    setSelectedActivity={setSelectedActivity}></ActivityDetails>}
                {editMode && 
                <ActivityForm 
                    key={selectedActivity && selectedActivity.id || 0}
                setEditMode={setEditMode} selectedActivity = {selectedActivity!}
                createActivity={createActivity} editActivity={editActivity}></ActivityForm>}               
            </Grid.Column>
        </Grid>
    );
};