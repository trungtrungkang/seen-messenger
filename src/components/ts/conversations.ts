import * as moment from 'moment';
import {template, Element} from '../riot-ts';
import * as utils from '../shared/utils';

import {IConversation, IApplicationState} from '../../model/types';
import store from '../../model/store';
import * as conversationTools from '../../model/conversations/conversation-tools';
import * as conversationActions from '../../model/conversations/actions';
import * as contactActions from '../../model/contacts/actions';

import {ComponentBase} from './component-base';
import * as templates from '../templates/templates';

declare var linkifyElement, emojify;
