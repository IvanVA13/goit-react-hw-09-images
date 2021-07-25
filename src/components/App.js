import { useState, useEffect, useCallback } from 'react';
import api from './services/api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import Loader from './Loader';
import Modal from './Modal';
import Button from './Button';

const App = () => {
  const [images, setImages] = useState([]);
  const [searchReq, setSearchReq] = useState('');
  const [page, setPage] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [targetImage, setTargetImage] = useState('');

  const getImages = useCallback(() => {
    if (!searchReq) {
      return;
    }
    setLoaded(true);
    api(searchReq, page)
      .then(pictures => setImages(prevImages => [...prevImages, ...pictures]))
      .catch(error => console.log(error))
      .finally(() => {
        setLoaded(false);
        scrollWindow();
      });
  }, [searchReq, page]);

  useEffect(() => {
    getImages();
  }, [getImages]);

  const scrollWindow = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const onSubmit = searchReq => {
    setSearchReq(searchReq);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const toggleModal = useCallback(() => {
    setModalIsOpen(prevState => !prevState);
  }, []);

  const openModal = e => {
    const targetImage = images.find(image => image.id === Number(e.target.id));
    setTargetImage(targetImage);
    toggleModal();
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery>
        <Loader loaded={loaded} />
        <ImageGalleryItem images={images} openModal={openModal} />
      </ImageGallery>
      <Button images={images} loadMore={loadMore} />
      {modalIsOpen && (
        <Modal closeModal={toggleModal}>
          <img src={targetImage.largeImageURL} alt={targetImage.tags} />
        </Modal>
      )}
    </>
  );
};

export default App;
