import { GROUPS, ISelectableMember } from '../types';
import uuid from '../../common/uuid';
import store from '../store';
import * as groupTools from './group-tools';
import LotusService from '../lotus-service';

const actions = {
    loadGroups() {
        return (dispatch) => {
            groupTools.loadGroups().then((resp) => {
                dispatch(actions.loadGroupsSuccess(resp));
            }).catch((err) => {
                dispatch(actions.loadGroupsFailed(err));
            });
        };
    },
    loadGroupsSuccess(groups) {
        return { type: GROUPS.LOAD_GROUPS_SUCCESS, data: groups };
    },
    loadGroupsFailed(err) {
        return { type: GROUPS.LOAD_GROUPS_FAILED, data: err };
    },
    setFilter(text) {
        return { type: GROUPS.SET_FILTER, data: text };
    },
    createGroup(display_name, members: Array<ISelectableMember>) {
        return (dispatch) => {
            var group_id = uuid.v1(null, null, null);
            var join_time = new Date().toISOString();
            var owner = store.getState().userData.user;
            var memberList = members.map((m) => {
                return {
                    user_id: m.user_id,
                    member_type: 2
                };
            });
            memberList.unshift({user_id: owner.userId, member_type: 1});

            var data = {
                group_id: group_id,
                display_name: display_name,
                join_time: join_time,
                members: memberList
            };

            LotusService.singleton().ready().then((Andaman) => {
                Andaman.groups.create(data, (resp) => {
                    if(resp.err) {
                        dispatch(actions.createGroupFailed(resp.err));
                    }
                    else{
                        dispatch(actions.createGroupSuccess(resp.re));
                    }
                });
            });
        };
    },
    createGroupSuccess(data) {
        return { type: GROUPS.CREATE_SUCCESS, data: data };
    },
    createGroupFailed(err) {
        return { type: GROUPS.CREATE_FAILED, data: err };
    }
};

export default actions;