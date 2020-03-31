import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
const host = 'http://localhost:8000/';

const post = async (path, data) => (
    await axios
    .post(`${host}${path}`, data, {
        withCredentials: true,
        xsrfCookieName: "csrftoken",
        xsrfHeaderName: "X-CSRFToken"
      })
)

const get = async (path) => (
    await axios
    .get(`${host}${path}`)
)

const signIn = async (creds) => (
    await post('rest-auth/login/', creds)
)

const signUp = async (creds) => (
    await post('rest-auth/registration/', creds)
)

const signOut = async () => (
    await get('rest-auth/logout/')
)

const loadAll = async () => (
    await get('polls/list/')
)

const loadOwn = async () => (
    await get('polls/list/user/')
)

const vote = async (question, choice) => (
    await post(`polls/${question}/vote/`, {choice_id: choice})
)

const createPoll = async (questionText) => (
    await post('polls/add/', {question_text: questionText, pub_date: "1111-11-11T11:11:11"})
)

const addChoice = async (question, choiceText) => (
    await post(`polls/add/${question}/choice/`, {choice_text: choiceText})
)

export default {signIn, signUp, signOut, loadAll, loadOwn, vote, createPoll, addChoice};