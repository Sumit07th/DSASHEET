import YoutubeIcon from '../../assets/icons/youtube-icon.svg';
import DefaultVideoIcon from '../../assets/icons/video.svg';

const videoIcons = {
    youtube: YoutubeIcon,
    default: DefaultVideoIcon
};

export const getVideoIcon = (videoLink) => {
    return videoIcons.youtube || videoIcons.default;
};

export default videoIcons;
