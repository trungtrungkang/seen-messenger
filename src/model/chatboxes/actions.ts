import { CHATBOXES } from '../types';
import * as conversationActions from '../conversations/actions';
import bus from '../shared/bus';

export function add(chatbox) {
    return (dispatch) => {
        dispatch({ type: CHATBOXES.ADD_CHATBOX, data: chatbox });
        bus.chatboxes.emit(CHATBOXES.ADD_CHATBOX, chatbox);
        bus.chatboxes.emit(CHATBOXES.ON_CHANGE);
    };
}

export function addAll(chatboxes: any[]) {
    return (dispatch) => {
        dispatch({ type: CHATBOXES.ADD_ALL, data: chatboxes});
        bus.chatboxes.emit(CHATBOXES.ADD_ALL, chatboxes);
        bus.chatboxes.emit(CHATBOXES.ON_CHANGE);
    };
}

export function remove(id) {
    return (dispatch) => {
        dispatch({ type: CHATBOXES.REMOVE_CHATBOX, data: id });
        bus.chatboxes.emit(CHATBOXES.REMOVE_CHATBOX, id);
        bus.chatboxes.emit(CHATBOXES.ON_CHANGE);
    };
}

export function setActive(id) {
    return (dispatch) => {
        dispatch({ type: CHATBOXES.SET_ACTIVE, data: id });
        bus.chatboxes.emit(CHATBOXES.SET_ACTIVE, id);
        bus.chatboxes.emit(CHATBOXES.ON_CHANGE);
    };
}

export function removeAll(){
    return (dispatch) => {
        dispatch({type: CHATBOXES.REMOVE_ALL});
        bus.chatboxes.emit(CHATBOXES.REMOVE_ALL);
        bus.chatboxes.emit(CHATBOXES.ON_CHANGE);
    };
}

export function setActiveAndMoveToTop(id){
    return (dispatch) => {
        dispatch({type: CHATBOXES.SET_ACTIVE_AND_MOVE_TO_TOP, data: id});
        bus.chatboxes.emit(CHATBOXES.SET_ACTIVE_AND_MOVE_TO_TOP, id);
        bus.chatboxes.emit(CHATBOXES.ON_CHANGE);
    };
}

export function toggleWindow(id) {
    return (dispatch) => {
        dispatch({type: CHATBOXES.TOGGLE_WINDOW, data: id});
        bus.chatboxes.emit(CHATBOXES.TOGGLE_WINDOW, id);
        bus.chatboxes.emit(CHATBOXES.ON_CHANGE);
    };
}

export function update(id, data) {
    return (dispatch) => {
        dispatch({ type: CHATBOXES.UPDATE, data: { id: id, data: data } });

        bus.chatboxes.emit(CHATBOXES.UPDATE, id, data);
        bus.chatboxes.emit(CHATBOXES.ON_CHANGE);
    };
}

export function markAsRead(id){
    return (dispatch) => {
        dispatch({type: CHATBOXES.MARK_AS_READ, data: id});
        bus.chatboxes.emit(CHATBOXES.MARK_AS_READ, id);
        bus.chatboxes.emit(CHATBOXES.ON_CHANGE);
    };
}

export function minimize(id){
    return (dispatch) => {
        dispatch({type: CHATBOXES.MINIMIZE, data: id});
        bus.chatboxes.emit(CHATBOXES.MINIMIZE, id);
        bus.chatboxes.emit(CHATBOXES.ON_CHANGE);
    };
}