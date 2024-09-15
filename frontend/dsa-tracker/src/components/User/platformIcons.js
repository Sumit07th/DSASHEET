import LeetcodeIcon from '../../assets/icons/leetcode-icon.svg';
import GeeksforGeeksIcon from '../../assets/icons/geeksforgeeks-icon.svg';
import CodingNinjasIcon from '../../assets/icons/codingninjas-icon.svg';
import DefaultPlatformIcon from '../../assets/icons/link-icon.svg';

const platformIcons = {
    leetcode: LeetcodeIcon,
    geeksforgeeks: GeeksforGeeksIcon,
    codingninjas: CodingNinjasIcon,
    default: DefaultPlatformIcon
};

export const extractPlatformKey = (url) => {
    if (url.includes('leetcode.com')) return 'leetcode';
    if (url.includes('geeksforgeeks.org')) return 'geeksforgeeks';
    if (url.includes('codingninjas.com')) return 'codingninjas';
    return 'default';
};

export default platformIcons;
