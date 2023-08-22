import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImage } from 'services/getImage';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    searchText: '',
    images: [],
    selectedLargeImage: null,
    alt: null,
    currentPage: 1,
    error: null,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchText, currentPage } = this.state;
    if (
      prevState.searchText !== searchText ||
      prevState.currentPage !== currentPage
    ) {
      this.addImages();
    }
  }

  handleSearch = searchText => {
    this.setState({
      searchText,
      images: [],
      currentPage: 1,
    });
  };

  addImages = async () => {
    const { searchText, currentPage } = this.state;

    try {
      this.setState({ isLoading: true });

      const dataImages = await getImage(searchText, currentPage);

      if (dataImages.hits.length === 0) {
        toast.info('Sorry image not found...');
      }

      this.setState(state => ({
        images: [...state.images, ...dataImages.hits],
        isLoading: false,
      }));
    } catch (error) {
      toast.error(`Something went wrong! Error message: ${error.message}`);
      console.log(error);
      // this.setState({ error: 'Something went wrong!' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  onCloseModal = () => {
    this.setState({
      selectedLargeImage: null,
    });
  };

  handleSelectedImg = (largeImage, alt) => {
    this.setState({
      selectedLargeImage: largeImage,
      alt,
    });
  };

  render() {
    const { images, isLoading, selectedLargeImage, alt } = this.state;

    return (
      <>
        <Searchbar handleSearch={this.handleSearch} />;
        <ToastContainer autoClose={3000} />
        {images.length > 0 && (
          <ImageGallery images={images} selectedImg={this.handleSelectedImg} />
        )}
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && <Button onClick={this.loadMore} />}
        {selectedLargeImage && (
          <Modal
            selectedLargeImage={selectedLargeImage}
            alt={alt}
            onClose={this.onCloseModal}
          />
        )}
      </>
    );
  }
}
