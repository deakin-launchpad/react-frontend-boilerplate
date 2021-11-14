
import PropsTypes from 'prop-types';

export const EnhancedIcon = (props) => {
  /**
   * This component uses icons from https://iconify.design/
   * 
   * Example Code: <EnhancedIcon icon={'{$iconFramework}:{$icon}'} />
   * $iconFramework: 'mdi'
   * $icon:'home'
   */
  return <span className='iconify' style={{ fontSize: 'calc(16px + 6 * ((100vw - 320px) / 680))' }} data-icon={props.icon} />;
};
EnhancedIcon.propTypes = {
  icon: PropsTypes.string
};
