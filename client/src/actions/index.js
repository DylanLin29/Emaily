import axios from 'axios';
import { FETCH_USER } from './types';
export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user') // make a connection with the backend
    dispatch({ type: FETCH_USER, payload: res.data })
}