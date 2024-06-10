import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import {CREATE_TOPICS_REQUEST,SET_TOPICS_STATUS,createTopicsSuccess,createTopicsFailure, createTopicsExists} from '../../../action/Course/Topic/AddTopicAction'
import {WATCH_TIME_STATUS,WATCH_TIME_REQUEST,watchTimeSuccess,watchTimeFailure, watchTimeExists} from '../../actions/LearnerAction/WatchTimeAction'


const API_URL = 'http://localhost:5199/lxp/course/learner/learnerprogress';


 const watchTimeApi = ({ dispatch,getState}) => (next) =>async (action) => {
  // next(action);
   console.log("watchtimemiddleware",action.payload);

  if (action.type === WATCH_TIME_REQUEST ) {
  
  //console.log("isRequesting", getState());

  const ReducerData = getState().watchTime;
  // Check if 'topicsState' is defined and has the 'isRequesting' property
 if (!ReducerData.isRequesting) {
    dispatch({ type: WATCH_TIME_STATUS, payload: true });
    
    try {
      // console.log("post",action.payload)
      // Assuming 'action.payload' contains the data you want to senda\
      console.log("check action",action.payload);
      const response = await axios.post(API_URL,action.payload);
      console.log('API Response data:', response.data); // Log the response data
      if(response.data.statusCode==412){
        dispatch( watchTimeExists());
      }
      else{
        dispatch(watchTimeSuccess(response.data.data)); // Dispatch success action with the response data
        console.log("successfullresponse",response.data.data)
      }
     
       
    } 
    catch (error) {
      console.error('API Error:', error.message);
      dispatch(watchTimeFailure(error.message));
    } finally{
      dispatch({type:WATCH_TIME_STATUS,payload:false})
      
      }
    }
 }
  return next(action);
  
};

export default watchTimeApi;


