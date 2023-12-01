import { v4 as uuidv4 } from 'uuid'

export const getUuid = () => {
    let uuid_Token = localStorage.getItem('UUID_TOKEN')
        //先看本地是否有uuid
    if (!uuid_Token) {
        uuid_Token = uuidv4();
        localStorage.setItem('UUID_TOKEN', uuid_Token);
    }
    return uuid_Token;
}