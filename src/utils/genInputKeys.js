import {uid} from 'react-uid';

const genInputKeys = (size) => {
    let keyArray = new Array(size);

    for(let x = 0; x < size; x++){
        keyArray[x] = uid('OGinput',x)
    }

    return keyArray;
}

export default genInputKeys;
