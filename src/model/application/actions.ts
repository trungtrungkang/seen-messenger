import { APPLICATION } from '../types';
import * as applicationTools from './application-tools';

export function active() {
    return { type: APPLICATION.ACTIVE };
}

export function inactive() {
    return { type: APPLICATION.INACTIVE };
}

export function toggleLoading(isLoading) {
    return { type: APPLICATION.TOGGLE_LOADING, data: isLoading };
}