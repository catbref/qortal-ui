// Node Config Actions here...
import { LOAD_NODE_CONFIG, SET_NODE, ADD_NODE } from '../app-action-types.js'
import { UI_VERSION } from '../version.js'

const nodeConfigUrl = '/getConfig'

const checkNodes = JSON.parse(localStorage.getItem('myQortalNodes'));

export const doLoadNodeConfig = () => {

    return (dispatch, getState) => {
        fetch(nodeConfigUrl)
            .then(res => {
                return res.json()
            })
            .then(data => {
                const nodeConfig = {
                    node: 0,
                    knownNodes: [{}],
                    version: ''
                }
                nodeConfig.node = data.config.user.node

                if (checkNodes === null || checkNodes.length === 0) {
                    var saveNode = [];
                    saveNode.push(obj1,obj2,obj3,obj4,obj5,obj6);
                    localStorage.setItem('myQortalNodes', JSON.stringify(saveNode));
                    nodeConfig.knownNodes = JSON.parse(localStorage.getItem('myQortalNodes'));
                } else{
                    nodeConfig.knownNodes = JSON.parse(localStorage.getItem('myQortalNodes'));
                }

                nodeConfig.version = UI_VERSION;
                return dispatch(loadNodeConfig(nodeConfig))
            })
            .catch(err => {
                console.error(err)
            })
    }
}

const loadNodeConfig = (payload) => {
    return {
        type: LOAD_NODE_CONFIG,
        payload
    }
}

export const doSetNode = (nodeIndex) => {
    return (dispatch, getState) => {
        return dispatch(setNode(nodeIndex))
    }
}

const setNode = (payload) => {
    return {
        type: SET_NODE,
        payload
    }
}

export const doAddNode = (nodeObject) => {
    return (dispatch, getState) => {
        return dispatch(addNode(nodeObject))
    }
}

const addNode = (payload) => {
    return {
        type: ADD_NODE,
        payload
    }
}

const obj1 = {
    protocol: 'http',
    domain: '127.0.0.1',
    port: 12391,
    enableManagement: true
}

const obj2 = {
    protocol: 'http',
    domain: 'node1.qortal.org',
    port: 12391,
    enableManagement: false
}

const obj3 = {
    protocol: 'http',
    domain: 'node2.qortal.org',
    port: 12391,
    enableManagement: false
}

const obj4 = {
    protocol: 'http',
    domain: '127.0.0.1',
    port: 62391,
    enableManagement: false
}

const obj5 = {
    protocol: 'http',
    domain: 'node1.qortal.org',
    port: 62391,
    enableManagement: false
}

const obj6 = {
    protocol: 'http',
    domain: 'node2.qortal.org',
    port: 62391,
    enableManagement: false
}
