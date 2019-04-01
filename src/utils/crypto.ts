import * as crypto from 'crypto';

/**
 * md5 加密
 * @param {string} content - 加密内容
 * @param {string} salt - 加盐ent 
 * @returns {string} - 加密后字符串
 */
function md5(content: string, salt?: string): string {
    const md5 = crypto.createHash('md5');
    let result = null;
    if(salt) {
        result = md5.update(content).digest('hex');
        const saltContent = result + salt;
        result = md5.update(saltContent).digest('hex');
    } else {
        result = md5.update(content).digest('hex');
    }
    return result;
}