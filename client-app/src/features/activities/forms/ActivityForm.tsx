import React, {useState, FormEvent} from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from './../../../app/models/activity';
import { v4 as uuid } from 'uuid';

interface IProps {
  setEditMode: (editMode:boolean) => void;
  selectedActivity: IActivity;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
}


export const ActivityForm: React.FC<IProps> = ({setEditMode, selectedActivity, createActivity, editActivity}) => {

  const initializeForm = () => {
    if(selectedActivity) {
      return selectedActivity
    } else {
      return {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
      }
    }
  };

  const[activity, setActivity] = useState<IActivity>(initializeForm);

  const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name,value} = event.currentTarget;
    setActivity({...activity, [name]: value}); 
  }

  const handleSubmit = () => {
    if(activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      }
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input placeholder="Title"
          onChange={handleInputChange}
          name='title'
          value={activity.title}></Form.Input>
        <Form.TextArea rows={2}  onChange={handleInputChange}
          name="description"
          placeholder="Description" value={activity.description} ></Form.TextArea>
        <Form.Input  onChange={handleInputChange} name='category' placeholder="Category" value={activity.category}></Form.Input>
        <Form.Input  onChange={handleInputChange} name='date' type='datetime-local' placeholder="Date" value={activity.date}></Form.Input>
        <Form.Input  onChange={handleInputChange} name='city' placeholder="City" value={activity.city}></Form.Input>
        <Form.Input  onChange={handleInputChange} name='venue' placeholder="Venue" value={activity.venue}></Form.Input>    
        <Button floated='right' positive type='submit' content='Submit'></Button>  
        <Button onClick={() => setEditMode(false)} floated='right' type='button' content='Clear'></Button>
      </Form>
    </Segment>
  );
};
