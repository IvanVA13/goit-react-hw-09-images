import PropTypes from 'prop-types';
import styles from './ImageGallery.module.scss';

const ImageGallery = props => {
  return <ul className={styles.ImageGallery}>{props.children}</ul>;
};

ImageGallery.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ImageGallery;
