import axios from 'axios';
const BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8080/api/game';

export function newGame(size=4){
  return axios.post(`${BASE}/new?size=${size}`).then(r=>r.data);
}
export function getState(){
  return axios.get(`${BASE}/state`).then(r=>r.data);
}
export function move(dir){
  return axios.post(`${BASE}/move?dir=${dir}`).then(r=>r.data);
}
export function restart(size=4){
  return axios.post(`${BASE}/restart?size=${size}`).then(r=>r.data);
}
