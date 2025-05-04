import * as React from 'react';

import translate from "../../utils/i18n/TranslationUtil"
import { Icon } from '@mui/material';

import 'material-icons/iconfont/material-icons.css';

export default function TestItem() {

    return (
        <div>
            {translate("Setting",null)}
            <Icon className='material-icons-outlined'>home</Icon>
        </div>
    );
}