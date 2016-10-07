import {Map, List} from 'immutable';

export interface IContact {
    isActive: boolean;
    userId: string;
    name: string;
    email: string;
    avatarUrl: string;
    profileUrl?:string;
    state: number;
    status?: string;
    phone?:string;
    privacyLevel?:number;
}

export interface IMember{
    userId: string;
    name: string;
}

export interface ISelectableMember{
    selected: boolean;
    userId: string;
    name: string;
}

export interface IChatbox{
    conv_id: string;
    created_time: Date;
    last_action_time: Date;
    isActive?: boolean;
    isMinimized?: boolean;
    isHidden?:boolean;
    hasNewMessage?:boolean;
    isLoading?:boolean;
}

export interface ILastMessage{
    id: string;
    created_time: Date;
    sender_id: string;
    content: string;
}

export interface IConversation {
    id: string;
    type: number;
    title: string;
    last_message: ILastMessage,
    unread_message_count: number;
    members: IMember[];
    active_time: Date;
    memberType?: string;

    avatar?: string;
    isActive?: boolean;
    isLoadingMessages?: boolean;
    owner?: IContact;
    sender?: IContact;
    contact?: IContact;
}

export interface IContactData {
    contacts: IContact[];
    isFetching?: boolean;
    isMinimized?: boolean;
    filter?: string;
}

export interface IChatboxData{
    chatboxes: IChatbox[]
}

export interface IMessage {
    conv_id: string;
    created_time: Date;
    message_id: string;
    sender_id: string;
    content: any;
    message_type: number;
    status: string;
}

export interface IConversationData {
    conversations: IConversation[];
    isLoading?: boolean;
}

export interface IApplicationData {
    state: string;
    isLoading?: boolean;
}

export interface IMessageData {
    [conv_id: string]: Array<IMessage>
}

export interface IMemberData {
    [conv_id: string]: string[]
}

export interface IApplicationState {
    contactData: IContactData,
    conversationData: { conversations: Array<IConversation>, isFetching: boolean, filter: string },
    messageData: IMessageData,
    chatboxData: IChatboxData,
    lastAction: { type: string, data: any },
    applicationData: IApplicationData,
    userData: { user: IContact },
    groupData: {groups: any[], isLoading: boolean, filter: string},
    memberData: IMemberData
}

export const CONVERSATIONS = {
    CREATE_NEW_FAILED: 'CONVERSATIONS.CREATE_NEW_FAILED',
    INSERT_CONVERSATION: 'CONVERSATIONS.INSERT_CONVERSATION',
    LOAD_CONVERSATIONS: 'CONVERSATIONS.LOAD_CONVERSATIONS',
    CONVERSATIONS_LOADED: 'CONVERSATIONS.CONVERSATIONS_LOADED',
    LOAD_CONVERSATIONS_FAILED: 'CONVERSATIONS.LOAD_CONVERSATIONS_FAILED',
    ADD_OR_UPDATE: 'CONVERSATIONS.ADD_OR_UPDATE',
    TOGGLE_LOADING_CONVERSATIONS: 'CONVERSATIONS.TOGGLE_LOADING_CONVERSATIONS',
    SET_ACTIVE: 'CONVERSATIONS.SET_ACTIVE',
    SET_FILTER: 'CONVERSATIONS.SET_FILTER',
    MARK_AS_READ: 'CONVERSATIONS.MARK_AS_READ',
    UPDATE_UNREAD_MESSAGE_COUNT: 'CONVERSATIONS.UPDATE_UNREAD_MESSAGE_COUNT',
    UPDATE_CONVERSATION: 'CONVERSATIONS.UPDATE_CONVERSATION',
    LOADING_MESSAGES: 'CONVERSATIONS.LOADING_MESSAGES',
    ADD_OR_UPDATE_ALL: 'CONVERSATIONS.ADD_OR_UPDATE_ALL',
    UPDATE_TITLE: 'CONVERSATIONS.UPDATE_TITLE',
    ON_CHANGE: 'CONVERSATIONS.ON_CHANGE',
    ADD_MEMBERS: 'CONVERSATIONS.ADD_MEMBERS',
    CREATE_GROUP: 'CONVERSATIONS.CREATE_GROUP'
};

export const MEMBERS ={
    MEMBERS_LOADED: 'MEMBERS.MEMBERS_LOADED',
    ADD_MEMBERS: 'MEMBERS.ADD_MEMBERS',
    CLOSE_FORM: 'MEMBERS.CLOSE_FORM'
};

export const CONTACTS = {
    LOAD_CONTACTS: 'CONTACTS.LOAD_CONTACTS',
    CONTACTS_LOADED: 'CONTACTS.CONTACTS_LOADED',
    FETCHING_CONTACTS: 'CONTACTS.FETCHING_CONTACTS',
    TOGGLE_WINDOW: 'CONTACTS.TOGGLE_WINDOW',
    SET_FILTER: 'CONTACTS.SET_FILTER',
    SET_ACTIVE: 'CONTACTS.SET_ACTIVE',
    PARTNER_ADDED: 'CONTACTS.PARTNER_ADDED',
    PARTNER_REMOVED: 'CONTACTS.PARTNER_REMOVED',
    PARTNER_UPDATED: 'CONTACTS.PARTNER_UPDATED',
    ADD_CONTACT: 'CONTACTS.ADD_CONTACT',
    SELECT_CONTACT: 'CONTACTS.SELECT_CONTACT'
};

export const APPLICATION = {
    INACTIVE: 'APPLICATION.INACTIVE',
    ACTIVE: 'APPLICATION.ACTIVE',
    TOGGLE_LOADING: 'APPLICATION.TOGGLE_LOADING',
    TOGGLE_CHAT_ROOM: 'APPLICATION.TOGGLE_CHAT_ROOM'
};

export const CHATBOXES = {
    ADD_CHATBOX: 'CHATBOXES.ADD_CHATBOX',
    ADD_ALL: 'CHATBOXES.ADD_ALL',
    RELOAD_OLD_STATE: 'CHATBOXES.RELOAD_OLD_STATE',
    REMOVE_CHATBOX: 'CHATBOXES.REMOVE_CHATBOX',
    REMOVE_ALL: 'CHATBOXES.REMOVE_ALL',
    SET_ACTIVE: 'CHATBOXES.SET_ACTIVE',
    HIDE_CHATBOX: 'CHATBOXES.HIDE_CHATBOX',
    SHOW_CHATBOX: 'CHATBOXES.SHOW_CHATBOX',
    TOGGLE_WINDOW: 'CHATBOXES.TOGGLE_WINDOW',
    TOGGLE_LOADING: 'CHATBOXES.TOGGLE_LOADING',
    UPDATE: 'CHATBOXES.UPDATE',
    MINIMIZE: 'CHATBOXES.MINIMIZE',
    MINIMIZE_MANY: 'CHATBOXES.MINIMIZE_MANY',
    MINIMIZE_ALL: 'CHATBOXES.MINIMIZE_ALL',
    SET_ACTIVE_AND_MOVE_TO_TOP: 'CHATBOXES.SET_ACTIVE_AND_MOVE_TO_TOP',
    MARK_AS_READ: 'CHATBOXES.MARK_AS_READ',
    ON_CHANGE: 'CHATBOXES.ON_CHANGE'
};

export const MESSAGES = {
    START_SEND_MESSAGE: 'MESSAGES.START_SEND_MESSAGE',
    SEND_MESSAGE_SUCCESS: 'MESSAGES.SEND_MESSAGE_SUCCESS',
    SEND_MESSAGE_FAILED: 'MESSAGES.SEND_MESSAGE_FAILED',
    INSERT_MESSAGE: 'MESSAGES.INSERT_MESSAGE',
    LOAD_MORE_MESSAGES_SUCCESS: 'MESSAGES.LOAD_MORE_MESSAGES_SUCCESS',
    LOAD_MORE_MESSAGES_FAILED: 'MESSAGES.LOAD_MORE_MESSAGES_FAILED',
    START_UPLOADING_FILE: 'MESSAGES.START_UPLOADING_FILE',
    UPLOAD_FILE_PROGRESS: 'MESSAGES.UPLOAD_FILE_PROGRESS',
    UPLOAD_SUCCESS: 'MESSAGES.UPLOAD_SUCCESS',
    UPLOAD_FAILED: 'MESSAGES.UPLOAD_FAILED'
};

export const COMMONS = {
    TOGGLE_LOADING: 'COMMONS.TOGGLE_LOADING'
};

export const USERS = {
    LOGIN: 'USERS.LOGIN',
    LOGIN_SUCCESS: 'USERS.LOGIN_SUCCESS',
    LOGIN_FAILED: 'USERS.LOGIN_FAILED',
    SIGNUP_SUCCESS: 'USERS.LOGIN_SUCCESS',
    SIGNUP_FAILED: 'USERS.LOGIN_FAILED',
    LOGOUT: 'USERS.LOGOUT',
    SSO_LOGIN_SUCCESS: 'USERS.SSO_LOGIN_SUCCESS',
    SSO_LOGIN_FAILED: 'USERS.SSO_LOGIN_FAILED',
    UPDATE_PROFILE: 'USERS.UPDATE_PROFILE',
    ADD_FRIEND: 'USERS.ADD_FRIEND'
};

export const GROUPS = {
    CREATE_SUCCESS: 'GROUPS.CREATE_SUCCESS',
    CREATE_FAILED: 'GROUPS.CREATE_FAILED',
    LEAVE: 'GROUPS.LEAVE',
    DELETE: 'GROUPS.DELETE',
    ADD_MEMBERS: 'GROUPS.ADD_MEMBERS',
    REMOVE_MEMBERS: 'GROUPS.REMOVE_MEMBERS',
    LOAD_GROUPS_SUCCESS: 'GROUPS.LOAD_GROUPS_SUCCESS',
    LOAD_GROUPS_FAILED: 'GROUPS.LOAD_GROUPS_FAILED',
    SET_FILTER: 'GROUPS.SET_FILTER'
};

export const FILE_TYPES = {
    PDF: ['pdf'],
    DOC: ['doc', 'docx', 'dot', 'rtf'],
    TEXT: ['txt'],
    EXCEL: ['xls', 'xlsx'],
    ZIP: ['zip', 'rar', 'tar', '7z'],
    AUDIO: ['mp3', 'mid', 'wav'],
    VIDEO: ['mp4', 'mp2', 'mov', 'avi', 'movie', 'mpeg'],
    IMAGE: ['bmp', 'gif', 'jpeg', 'jpg', 'svg', 'tif', 'tiff', 'ico', 'png'],
    typeOf(ext: string, type: string) {
        var key = type.toUpperCase();
        ext = (ext || '').toLowerCase();
        
        var types = this[key] as Array<string>;
        return (types) ? types.indexOf(ext) != -1 : false;
    }
};

export const MESSAGE_TYPE = {
    TEXT: 0,
    FILE: 1,
    PHOTO_FILE: 2,
    AUDIO_FILE: 3,
    VIDEO_FILE: 4
};

export const CONVERSATION_TYPE = {
    ONE: 0,
    GROUP: 1
}

export const CONVERSATION_ACTIONS = {
    ADD_MEMBERS: 'CONVERSATION_ACTIONS.ADD_MEMBERS',
    UPDATE_TITLE: 'CONVERSATION_ACTIONS.UPDATE_TITLE'
}

export const MEMBER_TYPE = {
    OWNER: 'OWNER',
    MEMBER: 'MEMBER'
}